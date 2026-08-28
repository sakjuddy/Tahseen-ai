import math
from PIL import Image, ImageDraw, ImageFont

# Load the new high-res authentic emblem
emblem = Image.open('C:/Users/sakju/tahseen-ai/public/emblem-new.png').convert('RGBA')

# Target height for emblem in master logo
target_emblem_h = 104
aspect = emblem.width / emblem.height
target_emblem_w = int(target_emblem_h * aspect)
emblem_resized = emblem.resize((target_emblem_w, target_emblem_h), Image.Resampling.LANCZOS)

# Create canvas
canvas_h = 108
canvas_w = 480
logo = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))

# 1. Paste emblem on left
emblem_x = 4
emblem_y = (canvas_h - target_emblem_h) // 2
logo.paste(emblem_resized, (emblem_x, emblem_y), emblem_resized)

# 2. Draw vertical divider |
draw = ImageDraw.Draw(logo)
divider_x = emblem_x + target_emblem_w + 14
divider_y_start = 14
divider_y_end = canvas_h - 14

for y in range(divider_y_start, divider_y_end):
    # Soft vertical line
    alpha = int(180 * math.sin((y - divider_y_start) / (divider_y_end - divider_y_start) * math.pi))
    logo.putpixel((divider_x, y), (255, 255, 255, alpha))
    logo.putpixel((divider_x + 1, y), (0, 229, 190, alpha // 2))

# 3. Draw Wordmark TAHSEEN <AI> & Tagline ENHANCE YOUR WORK
# Let's render the geometric glyphs for TAHSEEN, <, AI, >, and ENHANCE YOUR WORK
start_text_x = divider_x + 16
text_y = 20

# We use clean geometric rendering matching the official brand book:
# Glyphs: T, A, H, S (straight/upright), E, E, N, < (teal), A, I, > (teal)

def draw_t(draw, x, y, h, w, color):
    lw = 2.4
    # Top bar
    draw.rectangle([x, y, x + w, y + lw], fill=color)
    # Stem
    draw.rectangle([x + (w - lw) / 2, y, x + (w + lw) / 2, y + h], fill=color)
    return w

def draw_a(draw, x, y, h, w, color):
    lw = 2.4
    # Inverted V (stylized apex)
    draw.line([(x, y + h), (x + w / 2, y)], fill=color, width=int(round(lw)))
    draw.line([(x + w / 2, y), (x + w, y + h)], fill=color, width=int(round(lw)))
    return w

def draw_h(draw, x, y, h, w, color):
    lw = 2.4
    draw.rectangle([x, y, x + lw, y + h], fill=color)
    draw.rectangle([x + w - lw, y, x + w, y + h], fill=color)
    draw.rectangle([x, y + (h - lw) / 2, x + w, y + (h + lw) / 2], fill=color)
    return w

def draw_s(draw, x, y, h, w, color):
    # Straight, upright modern non-italic S
    lw = 2.4
    draw.rectangle([x, y, x + w, y + lw], fill=color)
    draw.rectangle([x, y, x + lw, y + h / 2], fill=color)
    draw.rectangle([x, y + (h - lw) / 2, x + w, y + (h + lw) / 2], fill=color)
    draw.rectangle([x + w - lw, y + h / 2, x + w, y + h], fill=color)
    draw.rectangle([x, y + h - lw, x + w, y + h], fill=color)
    return w

def draw_e(draw, x, y, h, w, color):
    lw = 2.4
    draw.rectangle([x, y, x + lw, y + h], fill=color)
    draw.rectangle([x, y, x + w, y + lw], fill=color)
    draw.rectangle([x, y + (h - lw) / 2, x + w * 0.85, y + (h + lw) / 2], fill=color)
    draw.rectangle([x, y + h - lw, x + w, y + h], fill=color)
    return w

def draw_n(draw, x, y, h, w, color):
    lw = 2.4
    draw.rectangle([x, y, x + lw, y + h], fill=color)
    draw.rectangle([x + w - lw, y, x + w, y + h], fill=color)
    draw.line([(x + lw / 2, y), (x + w - lw / 2, y + h)], fill=color, width=int(round(lw)))
    return w

def draw_chevron_left(draw, x, y, h, w, color):
    lw = 2.4
    draw.line([(x + w, y), (x, y + h / 2)], fill=color, width=int(round(lw)))
    draw.line([(x, y + h / 2), (x + w, y + h)], fill=color, width=int(round(lw)))
    return w

def draw_chevron_right(draw, x, y, h, w, color):
    lw = 2.4
    draw.line([(x, y), (x + w, y + h / 2)], fill=color, width=int(round(lw)))
    draw.line([(x + w, y + h / 2), (x, y + h)], fill=color, width=int(round(lw)))
    return w

def draw_i(draw, x, y, h, w, color):
    lw = 2.4
    draw.rectangle([x + (w - lw) / 2, y, x + (w + lw) / 2, y + h], fill=color)
    return w

# 4. Render Letterforms on 4x supersampled canvas for ultra-smooth anti-aliasing
scale = 4
hires_w = canvas_w * scale
hires_h = canvas_h * scale
hires = Image.new('RGBA', (hires_w, hires_h), (0, 0, 0, 0))

# Paste scaled emblem
emblem_hi = emblem.resize((target_emblem_w * scale, target_emblem_h * scale), Image.Resampling.LANCZOS)
hires.paste(emblem_hi, (emblem_x * scale, emblem_y * scale), emblem_hi)

hdraw = ImageDraw.Draw(hires)

# Divider
hx = divider_x * scale
hy1 = divider_y_start * scale
hy2 = divider_y_end * scale
for y in range(hy1, hy2):
    t = (y - hy1) / (hy2 - hy1)
    alpha = int(220 * math.sin(t * math.pi))
    for xoff in range(int(scale * 1.5)):
        hires.putpixel((hx + xoff, y), (255, 255, 255, alpha))

# Render Wordmark
letter_h = 25 * scale
letter_w = 16 * scale
letter_spacing = 7 * scale
curr_x = start_text_x * scale
curr_y = 22 * scale

white = (255, 255, 255, 255)
teal = (0, 229, 190, 255)

# T A H S E E N
curr_x += draw_t(hdraw, curr_x, curr_y, letter_h, letter_w, white) + letter_spacing
curr_x += draw_a(hdraw, curr_x, curr_y, letter_h, letter_w, white) + letter_spacing
curr_x += draw_h(hdraw, curr_x, curr_y, letter_h, letter_w, white) + letter_spacing
curr_x += draw_s(hdraw, curr_x, curr_y, letter_h, letter_w, white) + letter_spacing
curr_x += draw_e(hdraw, curr_x, curr_y, letter_h, letter_w, white) + letter_spacing
curr_x += draw_e(hdraw, curr_x, curr_y, letter_h, letter_w, white) + letter_spacing
curr_x += draw_n(hdraw, curr_x, curr_y, letter_h, letter_w, white) + letter_spacing * 2

# < A I >
chevron_w = 9 * scale
curr_x += draw_chevron_left(hdraw, curr_x, curr_y, letter_h, chevron_w, teal) + 4 * scale
curr_x += draw_a(hdraw, curr_x, curr_y, letter_h, letter_w * 0.9, white) + 4 * scale
curr_x += draw_i(hdraw, curr_x, curr_y, letter_h, letter_w * 0.4, white) + 4 * scale
curr_x += draw_chevron_right(hdraw, curr_x, curr_y, letter_h, chevron_w, teal)

# Slogan: E N H A N C E   Y O U R   W O R K
slogan_y = curr_y + letter_h + 10 * scale
slogan_h = 10 * scale
slogan_w = 7 * scale
slogan_space = 4.5 * scale
sx = start_text_x * scale

slogan_text = "ENHANCE YOUR WORK"
for char in slogan_text:
    if char == ' ':
        sx += 10 * scale
    elif char == 'E':
        sx += draw_e(hdraw, sx, slogan_y, slogan_h, slogan_w, (220, 235, 245, 240)) + slogan_space
    elif char == 'N':
        sx += draw_n(hdraw, sx, slogan_y, slogan_h, slogan_w, (220, 235, 245, 240)) + slogan_space
    elif char == 'H':
        sx += draw_h(hdraw, sx, slogan_y, slogan_h, slogan_w, (220, 235, 245, 240)) + slogan_space
    elif char == 'A':
        sx += draw_a(hdraw, sx, slogan_y, slogan_h, slogan_w, (220, 235, 245, 240)) + slogan_space
    elif char == 'C':
        # C
        lw = 2.4 * (slogan_h / letter_h)
        hdraw.rectangle([sx, slogan_y, sx + slogan_w, slogan_y + lw], fill=(220, 235, 245, 240))
        hdraw.rectangle([sx, slogan_y, sx + lw, slogan_y + slogan_h], fill=(220, 235, 245, 240))
        hdraw.rectangle([sx, slogan_y + slogan_h - lw, sx + slogan_w, slogan_y + slogan_h], fill=(220, 235, 245, 240))
        sx += slogan_w + slogan_space
    elif char == 'Y':
        lw = 2.4 * (slogan_h / letter_h)
        hdraw.line([(sx, slogan_y), (sx + slogan_w / 2, slogan_y + slogan_h / 2)], fill=(220, 235, 245, 240), width=int(round(lw)))
        hdraw.line([(sx + slogan_w, slogan_y), (sx + slogan_w / 2, slogan_y + slogan_h / 2)], fill=(220, 235, 245, 240), width=int(round(lw)))
        hdraw.line([(sx + slogan_w / 2, slogan_y + slogan_h / 2), (sx + slogan_w / 2, slogan_y + slogan_h)], fill=(220, 235, 245, 240), width=int(round(lw)))
        sx += slogan_w + slogan_space
    elif char == 'O':
        lw = 2.4 * (slogan_h / letter_h)
        hdraw.rectangle([sx, slogan_y, sx + slogan_w, slogan_y + slogan_h], outline=(220, 235, 245, 240), width=int(round(lw)))
        sx += slogan_w + slogan_space
    elif char == 'U':
        lw = 2.4 * (slogan_h / letter_h)
        hdraw.rectangle([sx, slogan_y, sx + lw, slogan_y + slogan_h], fill=(220, 235, 245, 240))
        hdraw.rectangle([sx + slogan_w - lw, slogan_y, sx + slogan_w, slogan_y + slogan_h], fill=(220, 235, 245, 240))
        hdraw.rectangle([sx, slogan_y + slogan_h - lw, sx + slogan_w, slogan_y + slogan_h], fill=(220, 235, 245, 240))
        sx += slogan_w + slogan_space
    elif char == 'R':
        lw = 2.4 * (slogan_h / letter_h)
        hdraw.rectangle([sx, slogan_y, sx + lw, slogan_y + slogan_h], fill=(220, 235, 245, 240))
        hdraw.rectangle([sx, slogan_y, sx + slogan_w, slogan_y + lw], fill=(220, 235, 245, 240))
        hdraw.rectangle([sx + slogan_w - lw, slogan_y, sx + slogan_w, slogan_y + slogan_h / 2], fill=(220, 235, 245, 240))
        hdraw.rectangle([sx, slogan_y + (slogan_h - lw) / 2, sx + slogan_w, slogan_y + (slogan_h + lw) / 2], fill=(220, 235, 245, 240))
        hdraw.line([(sx + lw, slogan_y + slogan_h / 2), (sx + slogan_w, slogan_y + slogan_h)], fill=(220, 235, 245, 240), width=int(round(lw)))
        sx += slogan_w + slogan_space
    elif char == 'W':
        lw = 2.4 * (slogan_h / letter_h)
        hdraw.line([(sx, slogan_y), (sx + slogan_w * 0.25, slogan_y + slogan_h)], fill=(220, 235, 245, 240), width=int(round(lw)))
        hdraw.line([(sx + slogan_w * 0.25, slogan_y + slogan_h), (sx + slogan_w * 0.5, slogan_y + slogan_h * 0.3)], fill=(220, 235, 245, 240), width=int(round(lw)))
        hdraw.line([(sx + slogan_w * 0.5, slogan_y + slogan_h * 0.3), (sx + slogan_w * 0.75, slogan_y + slogan_h)], fill=(220, 235, 245, 240), width=int(round(lw)))
        hdraw.line([(sx + slogan_w * 0.75, slogan_y + slogan_h), (sx + slogan_w, slogan_y)], fill=(220, 235, 245, 240), width=int(round(lw)))
        sx += slogan_w + slogan_space
    elif char == 'K':
        lw = 2.4 * (slogan_h / letter_h)
        hdraw.rectangle([sx, slogan_y, sx + lw, slogan_y + slogan_h], fill=(220, 235, 245, 240))
        hdraw.line([(sx + slogan_w, slogan_y), (sx + lw, slogan_y + slogan_h / 2)], fill=(220, 235, 245, 240), width=int(round(lw)))
        hdraw.line([(sx + lw, slogan_y + slogan_h / 2), (sx + slogan_w, slogan_y + slogan_h)], fill=(220, 235, 245, 240), width=int(round(lw)))
        sx += slogan_w + slogan_space

# Find bounding box and crop with padding
bbox = hires.getbbox()
hires_cropped = hires.crop((0, 0, bbox[2] + 20 * scale, hires_h))

# Downsample with Lanczos for smooth anti-aliased output
final_logo = hires_cropped.resize((hires_cropped.width // scale, hires_cropped.height // scale), Image.Resampling.LANCZOS)
final_logo.save('C:/Users/sakju/tahseen-ai/public/tahseen-logo.png')
final_logo.save('C:/Users/sakju/tahseen-ai/public/logo.png')

# Also create square favicon / app icon from the new emblem
icon_img = emblem.resize((192, 192), Image.Resampling.LANCZOS)
icon_img.save('C:/Users/sakju/tahseen-ai/public/icon.png')
icon_img.save('C:/Users/sakju/tahseen-ai/src/app/icon.png')

print(f"New Master Logo generated successfully! Size: {final_logo.size}")
