from PIL import Image, ImageDraw

def make_circular(image_path):
    # Open the image
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    
    # Crop to a square first if it's not square
    size = min(width, height)
    left = (width - size) // 2
    top = (height - size) // 2
    right = left + size
    bottom = top + size
    img_cropped = img.crop((left, top, right, bottom))
    
    # Create a circular mask
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    # Apply the mask to cropped image
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img_cropped, (0, 0), mask=mask)
    
    # Save back to the file
    output.save(image_path, 'PNG')
    print(f"Successfully converted {image_path} to circular image of size {size}x{size}")

if __name__ == "__main__":
    make_circular("d:/Users/Sankalp.Bendale/Desktop/Sumway/app/icon.png")
