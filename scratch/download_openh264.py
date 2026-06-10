import urllib.request
import bz2
import os

url = "https://ciscobinary.openh264.org/openh264-1.8.0-win64.dll.bz2"
dest_bz2 = "scratch/openh264-1.8.0-win64.dll.bz2"
dest_dll = "openh264-1.8.0-win64.dll"

print(f"Downloading from {url}...")
try:
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    )
    with urllib.request.urlopen(req) as response, open(dest_bz2, 'wb') as out_file:
        out_file.write(response.read())
        
    print("Download completed. Decompressing...")
    
    with bz2.BZ2File(dest_bz2, 'rb') as source, open(dest_dll, 'wb') as dest:
        dest.write(source.read())
        
    print(f"Successfully created {dest_dll}!")
    
    # Clean up the .bz2 file
    if os.path.exists(dest_bz2):
        os.remove(dest_bz2)
        
except Exception as e:
    print(f"Error occurred: {e}")
