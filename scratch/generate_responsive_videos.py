import subprocess
import os

ffmpeg_exe = r"C:\Users\Sankalp.Bendale\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\LocalCache\local-packages\Python311\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"

video_files = ["slide1", "slide2", "slide3"]

print(f"Using FFmpeg: {ffmpeg_exe}")

for v in video_files:
    src = f"public/videos/{v}.mp4"
    desktop_out = f"public/videos/{v}_desktop.mp4"
    mobile_out = f"public/videos/{v}_mobile.mp4"
    
    if not os.path.exists(src):
        print(f"Source file not found: {src}")
        continue

    # 1. Generate Desktop Version (Native 3136x1880, visually lossless copy, add faststart metadata)
    print(f"\n--- Processing Desktop: {src} -> {desktop_out} ---")
    cmd_desktop = [
        ffmpeg_exe,
        "-i", src,
        "-c", "copy",
        "-movflags", "+faststart",
        "-y",
        desktop_out
    ]
    try:
        subprocess.run(cmd_desktop, check=True)
        print(f"Desktop success! Size: {os.path.getsize(desktop_out)} bytes (Original: {os.path.getsize(src)} bytes)")
    except Exception as e:
        print(f"Error creating desktop version: {e}")

    # 2. Generate Mobile Version (Downscaled to 1280x768, compressed with libx264, add faststart)
    print(f"--- Processing Mobile: {src} -> {mobile_out} ---")
    cmd_mobile = [
        ffmpeg_exe,
        "-i", src,
        "-c:v", "libx264",
        "-crf", "22",
        "-preset", "slow",
        "-vf", "scale=1280:768",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-y",
        mobile_out
    ]
    try:
        subprocess.run(cmd_mobile, check=True)
        print(f"Mobile success! Size: {os.path.getsize(mobile_out)} bytes")
    except Exception as e:
        print(f"Error creating mobile version: {e}")

print("\nResponsive video generation complete!")
