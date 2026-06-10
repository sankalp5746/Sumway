import os
import sys

# Register CWD for DLL searches on Windows so OpenH264 can load
if sys.platform == 'win32':
    try:
        os.add_dll_directory(os.getcwd())
        print(f"Registered DLL directory: {os.getcwd()}")
    except Exception as e:
        print(f"Error registering DLL directory: {e}")

import cv2
import numpy as np

def optimize_video(input_path, output_path):
    print(f"\nOptimizing: {input_path} -> {output_path}")
    cap = cv2.VideoCapture(input_path)
    if not cap.isOpened():
        print(f"Error: Could not open {input_path}")
        return False
        
    orig_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    orig_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    orig_fps = cap.get(cv2.CAP_PROP_FPS)
    orig_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Original: {orig_w}x{orig_h}, {orig_fps} fps, {orig_frames} frames")
    
    # Target resolution: 1920x1080 (Standard 1080p)
    target_w = 1920
    target_h = 1080
    target_fps = 60.0 # Double the framerate for smooth motion
    
    # Sharpening kernel
    sharpen_kernel = np.array([
        [0, -0.4, 0],
        [-0.4, 2.6, -0.4],
        [0, -0.4, 0]
    ])
    
    # Setup H.264 VideoWriter
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    out = cv2.VideoWriter(output_path, fourcc, target_fps, (target_w, target_h))
    
    if not out.isOpened():
        print("Error: Could not open output VideoWriter with 'avc1'")
        cap.release()
        return False
        
    frames = []
    
    # Read and preprocess all frames
    for i in range(orig_frames):
        ret, frame = cap.read()
        if not ret:
            break
            
        # Resize to 1080p using high quality Lanczos interpolation
        resized = cv2.resize(frame, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4)
        
        # Apply sharpening filter
        sharpened = cv2.filter2D(resized, -1, sharpen_kernel)
        
        # Blend sharpened and resized to prevent over-sharpening artifacts
        blended = cv2.addWeighted(resized, 0.7, sharpened, 0.3, 0)
        frames.append(blended)
        
    cap.release()
    
    if not frames:
        print("Error: No frames read from source")
        out.release()
        return False
        
    # Write frames with temporal interpolation (blend adjacent frames for 60fps smoothness)
    num_frames = len(frames)
    print(f"Writing {num_frames * 2 - 1} frames at {target_fps} fps...")
    
    for i in range(num_frames):
        # Write current frame
        out.write(frames[i])
        
        # Write blended intermediate frame if not the last frame
        if i < num_frames - 1:
            # Simple linear blend between frame i and frame i+1
            intermediate = cv2.addWeighted(frames[i], 0.5, frames[i+1], 0.5, 0)
            out.write(intermediate)
            
    out.release()
    print(f"Completed! Optimized file size: {os.path.getsize(output_path)} bytes")
    return True

# Test on slide1 first
os.makedirs("public/videos", exist_ok=True)
optimize_video("public/videos/slide1.mp4", "public/videos/slide1_opt.mp4")
optimize_video("public/videos/slide2.mp4", "public/videos/slide2_opt.mp4")
optimize_video("public/videos/slide3.mp4", "public/videos/slide3_opt.mp4")
