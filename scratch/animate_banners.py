import cv2
import numpy as np
from PIL import Image
import os

def animate_image(image_path, output_video_path, duration_sec=5, fps=30):
    # Load image using PIL to avoid color format mismatches
    pil_img = Image.open(image_path)
    width, height = pil_img.size
    
    # We want a 1920x1080 video output
    target_w, target_h = 1920, 1080
    
    # Setup OpenCV video writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (target_w, target_h))
    
    total_frames = duration_sec * fps
    
    for i in range(total_frames):
        # Apply Ken Burns effect: Zoom from 1.0 to 1.05 and pan slightly
        progress = i / total_frames
        zoom = 1.0 + (0.05 * progress)
        pan_x = progress * 20
        pan_y = progress * 15
        
        # Calculate crop coordinates based on zoom factor
        crop_w = int(width / zoom)
        crop_h = int(height / zoom)
        
        x0 = int((width - crop_w) / 2 + (pan_x - 10))
        y0 = int((height - crop_h) / 2 + (pan_y - 7.5))
        
        # Crop boundaries check
        x0 = max(0, min(width - crop_w, x0))
        y0 = max(0, min(height - crop_h, y0))
        
        cropped = pil_img.crop((x0, y0, x0 + crop_w, y0 + crop_h))
        resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Convert PIL Image back to OpenCV BGR format
        frame = cv2.cvtColor(np.array(resized), cv2.COLOR_RGB2BGR)
        out.write(frame)
        
    out.release()
    print(f"Generated video: {output_video_path}")

# Paths to slide images and outputs
os.makedirs("public/videos", exist_ok=True)
animate_image("public/images/slide1.png", "public/videos/slide1.mp4")
animate_image("public/images/slide2.png", "public/videos/slide2.mp4")
animate_image("public/images/slide3.png", "public/videos/slide3.mp4")
print("All videos generated successfully!")
