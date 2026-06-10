import os
import sys

# On Windows, register CWD as DLL directory so OpenCV can load openh264 DLL
if sys.platform == 'win32':
    try:
        os.add_dll_directory(os.getcwd())
        print(f"Added DLL directory: {os.getcwd()}")
    except Exception as e:
        print(f"Error adding DLL directory: {e}")

import cv2
import numpy as np

codecs = ['avc1', 'X264', 'H264', 'mp4v', 'XVID']
frame = np.zeros((480, 640, 3), dtype=np.uint8)

for codec in codecs:
    try:
        fourcc = cv2.VideoWriter_fourcc(*codec)
        out_path = f"scratch/test_{codec}.mp4"
        out = cv2.VideoWriter(out_path, fourcc, 30.0, (640, 480))
        if out.isOpened():
            for _ in range(30):
                out.write(frame)
            out.release()
            print(f"Codec {codec}: SUCCESS. File size: {os.path.getsize(out_path)} bytes")
            if os.path.exists(out_path):
                os.remove(out_path)
        else:
            print(f"Codec {codec}: FAILED to open VideoWriter")
    except Exception as e:
        print(f"Codec {codec}: ERROR: {e}")
