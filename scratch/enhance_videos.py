import cv2
import numpy as np
import os

def enhance_video(input_path, output_path):
    cap = cv2.VideoCapture(input_path)
    if not cap.isOpened():
        print(f"Error opening video: {input_path}")
        return
        
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Using mp4v codec for standard compatibility
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    
    # Sharpness kernel: subtle enhancement
    sharpen_kernel = np.array([
        [0, -0.5, 0],
        [-0.5, 3, -0.5],
        [0, -0.5, 0]
    ])
    
    # Adaptive histogram equalization for contrast enhancement
    clahe = cv2.createCLAHE(clipLimit=1.8, tileGridSize=(8, 8))
    
    print(f"Processing {input_path} ({total_frames} frames)...")
    for i in range(total_frames):
        ret, frame = cap.read()
        if not ret:
            break
            
        # Convert to LAB space to enhance luminance channel separately
        lab = cv2.cvtColor(frame, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        cl = clahe.apply(l)
        limg = cv2.merge((cl, a, b))
        enhanced = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
        
        # Apply sharpening filter
        sharpened = cv2.filter2D(enhanced, -1, sharpen_kernel)
        
        # Blend sharpened and original to keep output clean and avoid noise
        final_frame = cv2.addWeighted(enhanced, 0.75, sharpened, 0.25, 0)
        
        out.write(final_frame)
        
    cap.release()
    out.release()
    print(f"Finished: {output_path}")

os.makedirs("public/videos", exist_ok=True)

# Process the three video files from the root directory
slides_data = [
    {
        "src": "Slide_1__EMPOWERING_ENTERPRISES_WITH_DIGITAL_WORKFORCE____Prompt_____Ultra-modern_futuristic_corpora_seed2618346190.mp4",
        "dest": "public/videos/slide1.mp4"
    },
    {
        "src": "Slide_2__CONNECT_WITH_ELITE_PROFESSIONAL_TALENT____Prompt_____Premium_futuristic_recruitment_and_tal_seed2371719416.mp4",
        "dest": "public/videos/slide2.mp4"
    },
    {
        "src": "Slide_3__24_7_365_VIRTUAL_OPERATIONS_CENTERS____Prompt_____Futuristic_virtual_operations_center,_abs_seed2868290931.mp4",
        "dest": "public/videos/slide3.mp4"
    }
]

for slide in slides_data:
    if os.path.exists(slide["src"]):
        enhance_video(slide["src"], slide["dest"])
    else:
        print(f"Source file not found: {slide['src']}")

print("All slide videos successfully enhanced and copied!")
