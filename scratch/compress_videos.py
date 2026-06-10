import subprocess
import os

ffmpeg_exe = r"C:\Users\Sankalp.Bendale\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\LocalCache\local-packages\Python311\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"

videos = [
    {"input": "public/videos/slide1_opt.mp4", "output": "public/videos/slide1.mp4"},
    {"input": "public/videos/slide2_opt.mp4", "output": "public/videos/slide2.mp4"},
    {"input": "public/videos/slide3_opt.mp4", "output": "public/videos/slide3.mp4"},
]

print(f"Using FFmpeg: {ffmpeg_exe}")

for video in videos:
    inp = video["input"]
    out = video["output"]
    
    if not os.path.exists(inp):
        print(f"Input file not found: {inp}")
        continue
        
    print(f"Compressing {inp} to {out}...")
    
    # Run FFmpeg command
    cmd = [
        ffmpeg_exe,
        "-i", inp,
        "-c:v", "libx264",
        "-crf", "24",
        "-preset", "slow",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-y",
        out
    ]
    
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        print(f"Success! Output size: {os.path.getsize(out)} bytes (Original: {os.path.getsize(inp)} bytes)")
        
        # Optionally, remove the intermediate _opt file to clean up space
        os.remove(inp)
        print(f"Removed intermediate file: {inp}")
    except subprocess.CalledProcessError as e:
        print(f"Error compressing {inp}:")
        print(e.stderr)
