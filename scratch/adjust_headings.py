import os
import re

def process_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace text-2xl md:text-3xl with text-xl sm:text-2xl md:text-3xl
        new_content, count = re.subn(r'\btext-2xl md:text-3xl\b', 'text-xl sm:text-2xl md:text-3xl', content)
        
        if count > 0:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file_path}: {count} occurrences")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def search_and_replace(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx'):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    print("Starting automated heading text adjustment...")
    search_and_replace("d:/Users/Sankalp.Bendale/Desktop/Sumway/app")
    search_and_replace("d:/Users/Sankalp.Bendale/Desktop/Sumway/components")
    print("Done!")
