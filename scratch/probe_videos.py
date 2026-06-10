import cv2
import os

videos = ["public/videos/slide1.mp4", "public/videos/slide2.mp4", "public/videos/slide3.mp4"]
for v in videos:
    if os.path.exists(v):
        cap = cv2.VideoCapture(v)
        if cap.isOpened():
            w = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
            h = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
            fps = cap.get(cv2.CAP_PROP_FPS)
            frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
            print(f"{v}: {w}x{h}, {fps} fps, {frames} frames, duration: {frames/fps:.2f}s")
            cap.release()
        else:
            print(f"Could not open {v}")
    else:
        print(f"{v} does not exist")
