import os
import subprocess
import shutil

ffmpeg_exe = r"C:\Users\Sankalp.Bendale\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\LocalCache\local-packages\Python311\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"
video_dir = "public/videos"

desktop_videos = ["slide1_desktop.mp4", "slide2_desktop.mp4", "slide3_desktop.mp4"]
mobile_videos = ["slide1_mobile.mp4", "slide2_mobile.mp4", "slide3_mobile.mp4"]

print(f"Using FFmpeg: {ffmpeg_exe}")

def compress_video(input_path, output_mp4, output_webm, is_desktop=True):
    temp_orig = input_path + ".temp"
    shutil.copy2(input_path, temp_orig)
    
    scale_filter = "scale=1280:768" if is_desktop else "scale=640:384"
    
    # 1. Compress to MP4 H.264
    print(f"Compressing {input_path} to MP4 ({scale_filter})...")
    cmd_mp4 = [
        ffmpeg_exe,
        "-i", temp_orig,
        "-c:v", "libx264",
        "-crf", "26",
        "-preset", "slow",
        "-pix_fmt", "yuv420p",
        "-vf", scale_filter,
        "-an", # Remove audio track for smaller size (no audio needed for background video)
        "-movflags", "+faststart",
        "-y",
        output_mp4
    ]
    subprocess.run(cmd_mp4, check=True)
    print(f"Created MP4: {output_mp4} ({os.path.getsize(output_mp4)} bytes)")
    
    # 2. Compress to WebM VP9
    print(f"Compressing {input_path} to WebM ({scale_filter})...")
    cmd_webm = [
        ffmpeg_exe,
        "-i", temp_orig,
        "-c:v", "libvpx-vp9",
        "-crf", "32",
        "-b:v", "0",
        "-vf", scale_filter,
        "-an", # Remove audio track
        "-y",
        output_webm
    ]
    subprocess.run(cmd_webm, check=True)
    print(f"Created WebM: {output_webm} ({os.path.getsize(output_webm)} bytes)")
    
    os.remove(temp_orig)
    print(f"Cleaned up temporary source copy.")

# Process Desktops
for v in desktop_videos:
    path = os.path.join(video_dir, v)
    if os.path.exists(path):
        out_mp4 = path
        out_webm = path.replace(".mp4", ".webm")
        compress_video(path, out_mp4, out_webm, is_desktop=True)

# Process Mobiles
for v in mobile_videos:
    path = os.path.join(video_dir, v)
    if os.path.exists(path):
        out_mp4 = path
        out_webm = path.replace(".mp4", ".webm")
        compress_video(path, out_mp4, out_webm, is_desktop=False)

print("All video compressions finished successfully!")
