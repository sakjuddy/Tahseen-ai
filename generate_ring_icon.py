from PIL import Image, ImageDraw, ImageFilter
import math

size = 512
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
cx, cy = size // 2, size // 2

# 1. Subtle ambient transparent glow behind ring
glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
for r in range(180, 0, -6):
    alpha = int(35 * (1 - r / 180))
    gdraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(0, 229, 190, alpha))
for r in range(110, 0, -4):
    alpha = int(55 * (1 - r / 110))
    gdraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(0, 245, 212, alpha))
glow = glow.filter(ImageFilter.GaussianBlur(18))
img = Image.alpha_composite(img, glow)

# 2. Render 3D Split-Torus Ribbon Ring
ring_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
rdraw = ImageDraw.Draw(ring_layer)

r_outer = 175
thickness = 46
r_inner = r_outer - thickness

# Draw 3D multi-layered shaded ribbon loop
# We render overlapping parametric arcs to create the 3D ribbon split effect
num_steps = 720
for i in range(num_steps):
    theta = (i / num_steps) * 2 * math.pi
    
    # 3D tilt transformation
    # X/Y with slight Z depth curvature
    tilt_x = math.cos(theta)
    tilt_y = math.sin(theta) * 0.88 - math.cos(theta) * 0.15
    depth = math.sin(theta + math.pi / 4)
    
    # Parametric center of tube
    r_mid = (r_outer + r_inner) / 2 + math.sin(theta * 2) * 6
    tube_cx = cx + tilt_x * r_mid
    tube_cy = cy + tilt_y * r_mid
    
    # Dynamic tube radius
    tube_rad = (thickness / 2) + depth * 3.5
    
    # Gradient coloring based on angle and depth
    # Top-right is illuminated (vibrant #00F5D4 / #26FFDF), bottom-left is deeper teal (#009E83 / #00D2B4)
    light_factor = 0.5 + 0.5 * math.cos(theta - math.pi * 0.25)
    specular = max(0.0, math.cos(theta - math.pi * 0.3)) ** 8
    
    # Base colors
    red = int(0 + 40 * specular)
    green = int(180 + 75 * light_factor)
    blue = int(160 + 60 * light_factor + 35 * specular)
    alpha = 255
    
    # Draw tube slice
    rdraw.ellipse(
        [tube_cx - tube_rad, tube_cy - tube_rad, tube_cx + tube_rad, tube_cy + tube_rad],
        fill=(min(255, red), min(255, green), min(255, blue), alpha)
    )

# 3. Inner cutout to ensure crisp transparent hole in the middle
hole_mask = Image.new('L', (size, size), 255)
hdraw = ImageDraw.Draw(hole_mask)
# Elliptical center hole
hole_r = r_inner - 10
hdraw.ellipse([cx - hole_r, cy - int(hole_r * 0.88), cx + hole_r, cy + int(hole_r * 0.88)], fill=0)
hole_mask = hole_mask.filter(ImageFilter.GaussianBlur(2))

# Split-gap ribbon cut at 45 degrees
split_mask = Image.new('L', (size, size), 255)
sdraw = ImageDraw.Draw(split_mask)
# Cutout notch
cut_x = cx + math.cos(math.radians(40)) * r_outer
cut_y = cy + math.sin(math.radians(40)) * r_outer * 0.88
sdraw.polygon([
    (cut_x - 14, cut_y - 25),
    (cut_x + 22, cut_y - 8),
    (cut_x + 12, cut_y + 22),
    (cut_x - 24, cut_y + 6)
], fill=0)
split_mask = split_mask.filter(ImageFilter.GaussianBlur(1.5))

# 4. Highlight reflection arc on top-left ribbon
hl_layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
hldraw = ImageDraw.Draw(hl_layer)
for deg in range(120, 220, 1):
    rad = math.radians(deg)
    hx = cx + math.cos(rad) * (r_outer - 8)
    hy = cy + math.sin(rad) * (r_outer - 8) * 0.88
    hldraw.ellipse([hx - 4, hy - 4, hx + 4, hy + 4], fill=(255, 255, 255, 180))
hl_layer = hl_layer.filter(ImageFilter.GaussianBlur(3))

# Composite layers
ring_layer.putalpha(Image.composite(ring_layer.getchannel('A'), Image.new('L', (size, size), 0), hole_mask))
ring_layer = Image.alpha_composite(ring_layer, hl_layer)
img = Image.alpha_composite(img, ring_layer)

# Save to destination paths
img.save('C:/Users/sakju/tahseen-ai/public/icon.png', 'PNG')
img.save('C:/Users/sakju/tahseen-ai/src/app/icon.png', 'PNG')
img.save('C:/Users/sakju/tahseen-ai/public/favicon.png', 'PNG')

# Create 32x32 and 48x48 favicons
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
img.save('C:/Users/sakju/tahseen-ai/public/favicon.ico', format='ICO', sizes=ico_sizes)

print('Successfully generated ring-only tab logo with transparent background!')
