from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math, os

w, h = 1800, 1300
img = Image.new('RGBA', (w, h), (0, 0, 0, 0))

cx, cy = w // 2, h // 2 + 40

# Fonts
try:
    font_mono_bold = ImageFont.truetype('arialbd.ttf', 15)
    font_mono_sm = ImageFont.truetype('arial.ttf', 12)
    font_bold = ImageFont.truetype('arialbd.ttf', 18)
    font_sm = ImageFont.truetype('arial.ttf', 13)
    font_xs = ImageFont.truetype('arial.ttf', 10)
    font_lg_bold = ImageFont.truetype('arialbd.ttf', 22)
except:
    font_mono_bold = ImageFont.load_default()
    font_mono_sm = ImageFont.load_default()
    font_bold = ImageFont.load_default()
    font_sm = ImageFont.load_default()
    font_xs = ImageFont.load_default()
    font_lg_bold = ImageFont.load_default()

# 1. Multi-layered Ambient Atmospheric Glow
glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
gdraw = ImageDraw.Draw(glow)
for r in range(580, 0, -18):
    alpha = int(40 * (1 - r / 580))
    gdraw.ellipse([cx - r, cy - int(r * 0.72), cx + r, cy + int(r * 0.72)], fill=(0, 229, 190, alpha))
for r in range(350, 0, -12):
    alpha = int(60 * (1 - r / 350))
    gdraw.ellipse([cx - r, cy - int(r * 0.6), cx + r, cy + int(r * 0.6)], fill=(6, 182, 212, alpha))
for r in range(180, 0, -8):
    alpha = int(95 * (1 - r / 180))
    gdraw.ellipse([cx - r, cy - int(r * 0.5), cx + r, cy + int(r * 0.5)], fill=(0, 245, 212, alpha))
glow = glow.filter(ImageFilter.GaussianBlur(40))
img = Image.alpha_composite(img, glow)

# 2. Isometric Math Projection
iso_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
idraw = ImageDraw.Draw(iso_layer)

def iso(x, y, z):
    ix = cx + (x - y) * math.cos(math.radians(30)) * 2.5
    iy = cy + (x + y) * math.sin(math.radians(30)) * 1.25 - z * 2.1
    return (ix, iy)

# 3. Ground Perspective Cyber-Grid Plane
grid_size = 9
spacing = 38
z_floor = -70

for i in range(-grid_size, grid_size + 1):
    p1 = iso(i * spacing, -grid_size * spacing, z_floor)
    p2 = iso(i * spacing, grid_size * spacing, z_floor)
    fade = 1.0 - abs(i) / (grid_size + 1)
    col = (0, 229, 190, int(50 * fade)) if i % 2 == 0 else (255, 255, 255, int(22 * fade))
    idraw.line([p1, p2], fill=col, width=1)
    
    p3 = iso(-grid_size * spacing, i * spacing, z_floor)
    p4 = iso(grid_size * spacing, i * spacing, z_floor)
    idraw.line([p3, p4], fill=col, width=1)

# Concentric Orbit Floor Rings with Data Packets
for rad in [140, 220, 310]:
    pts = []
    for deg in range(0, 360, 4):
        rad_ang = math.radians(deg)
        pts.append(iso(math.cos(rad_ang) * rad, math.sin(rad_ang) * rad, z_floor))
    for idx in range(len(pts)):
        pA = pts[idx]
        pB = pts[(idx + 1) % len(pts)]
        idraw.line([pA, pB], fill=(0, 229, 190, 60 if rad==220 else 30), width=1)

# 4. Central 3D Holographic AI Split Torus Core
core_radius = 120
core_z = 35
core_pts = []
for i in range(28):
    a = (i / 28) * math.pi * 2
    x = math.cos(a) * core_radius
    y = math.sin(a) * core_radius
    z = core_z + math.sin(a * 3) * 38
    core_pts.append(iso(x, y, z))

# Connecting laser pillars to floor
for i in range(0, 28, 4):
    p_top = core_pts[i]
    p_bot = iso(math.cos(i/28*math.pi*2)*core_radius, math.sin(i/28*math.pi*2)*core_radius, z_floor)
    idraw.line([p_top, p_bot], fill=(0, 229, 190, 80), width=2)
    idraw.ellipse([p_bot[0]-4, p_bot[1]-4, p_bot[0]+4, p_bot[1]+4], fill=(0, 245, 212, 200))

# Interconnected Core Rings
for i in range(len(core_pts)):
    p1 = core_pts[i]
    p2 = core_pts[(i + 1) % len(core_pts)]
    idraw.line([p1, p2], fill=(0, 229, 190, 255), width=5)
    # Triangulation beams
    p_diag = core_pts[(i + 7) % len(core_pts)]
    idraw.line([p1, p_diag], fill=(56, 189, 248, 90), width=1)

# Radiant Central Intelligence Core
c_center = iso(0, 0, core_z)
for r in range(70, 0, -4):
    alpha = int(240 * (1 - r / 70))
    idraw.ellipse([c_center[0] - r * 1.3, c_center[1] - r * 0.75, c_center[0] + r * 1.3, c_center[1] + r * 0.75], fill=(0, 245, 212, alpha))
idraw.ellipse([c_center[0] - 16, c_center[1] - 10, c_center[0] + 16, c_center[1] + 10], fill=(255, 255, 255, 255))

# Core Vertex Lights
for pt in core_pts:
    idraw.ellipse([pt[0] - 5, pt[1] - 5, pt[0] + 5, pt[1] + 5], fill=(255, 255, 255, 255))
    idraw.ellipse([pt[0] - 10, pt[1] - 10, pt[0] + 10, pt[1] + 10], outline=(0, 229, 190, 230), width=2)

# 5. Elaborate Floating 3D Cards with Real Text, Sparklines & Badges
cards = [
    {
        'pos': (-180, -160, 130),
        'w': 280, 'h': 105,
        'title': 'TAHSEEN AGENTIC COPILOT',
        'badge': 'LIVE • 24/7',
        'badge_col': (0, 229, 190),
        'desc': 'Autonomous WhatsApp & Web Lead Qualifier',
        'metrics': [('Lead Ingest', '0.12s', 95), ('CRM Sync', '100%', 100), ('Calendar', 'Active', 90)],
        'sparkline': [15, 25, 20, 38, 30, 48, 42, 60]
    },
    {
        'pos': (160, -150, 150),
        'w': 280, 'h': 105,
        'title': 'ENTERPRISE ERP PIPELINE',
        'badge': 'ZATCA & SAP',
        'badge_col': (56, 189, 248),
        'desc': 'Automated OCR Invoice & DB Sync Pipeline',
        'metrics': [('OCR Parse', '99.9%', 100), ('Validation', 'Passed', 98), ('Writeback', 'Committed', 100)],
        'sparkline': [20, 30, 28, 45, 40, 55, 62, 70]
    },
    {
        'pos': (-150, 160, 95),
        'w': 270, 'h': 100,
        'title': 'REAL-TIME TELEMETRY',
        'badge': 'LATENCY: <0.4s',
        'badge_col': (168, 85, 247),
        'desc': 'Live Stream Engine & Anomaly Detection',
        'metrics': [('Uptime', '99.98%', 100), ('Throughput', '3.4k/s', 88)],
        'sparkline': [10, 18, 32, 28, 44, 52, 65, 80]
    },
    {
        'pos': (180, 130, 115),
        'w': 270, 'h': 100,
        'title': 'DECISION INTELLIGENCE',
        'badge': 'HIGH ASSURANCE',
        'badge_col': (0, 245, 212),
        'desc': 'Predictive Operational Workflows',
        'metrics': [('Confidence', '99.4%', 99), ('Audit Log', 'Immutable', 100)],
        'sparkline': [22, 28, 35, 42, 50, 60, 68, 85]
    }
]

for c in cards:
    p_center = iso(*c['pos'])
    cw, ch = c['w'], c['h']
    x0, y0 = p_center[0] - cw // 2, p_center[1] - ch // 2
    x1, y1 = x0 + cw, y0 + ch
    color = c['badge_col']
    
    # Glowing data laser beam from core to card
    idraw.line([c_center, p_center], fill=color + (110,), width=2)
    # Data pulse packets along beam
    for frac in [0.35, 0.7]:
        bx = int(c_center[0] + (p_center[0] - c_center[0]) * frac)
        by = int(c_center[1] + (p_center[1] - c_center[1]) * frac)
        idraw.ellipse([bx - 4, by - 4, bx + 4, by + 4], fill=(255, 255, 255, 240))
        idraw.ellipse([bx - 7, by - 7, bx + 7, by + 7], outline=color + (200,), width=1)
    
    # Card shadow & body
    idraw.rounded_rectangle([x0 + 6, y0 + 6, x1 + 6, y1 + 6], radius=10, fill=(0, 0, 0, 140))
    idraw.rounded_rectangle([x0, y0, x1, y1], radius=10, fill=(7, 16, 28, 245), outline=color + (190,), width=1)
    
    # Left vertical accent line
    idraw.line([x0 + 12, y0 + 14, x0 + 12, y0 + ch - 14], fill=color + (255,), width=3)
    
    # Title & Badge
    idraw.text((x0 + 22, y0 + 12), c['title'], fill=(255, 255, 255, 255), font=font_mono_bold)
    # Badge Pill
    badge_w = idraw.textlength(c['badge'], font=font_xs) + 12
    idraw.rounded_rectangle([x1 - badge_w - 12, y0 + 11, x1 - 12, y0 + 25], radius=4, fill=color + (40,), outline=color + (140,), width=1)
    idraw.text((x1 - badge_w - 6, y0 + 13), c['badge'], fill=color + (255,), font=font_xs)
    
    # Description text
    idraw.text((x0 + 22, y0 + 32), c['desc'], fill=(148, 163, 184, 220), font=font_sm)
    
    # Metric Bars
    bx = x0 + 22
    by = y0 + 56
    for label, val_str, pct in c['metrics']:
        idraw.text((bx, by), f'{label}: {val_str}', fill=(203, 213, 225, 240), font=font_xs)
        idraw.rounded_rectangle([bx, by + 13, bx + 65, by + 18], radius=2, fill=(255, 255, 255, 25))
        idraw.rounded_rectangle([bx, by + 13, bx + int(65 * (pct / 100)), by + 18], radius=2, fill=color + (255,))
        bx += 76
    
    # Mini Sparkline chart in bottom right
    sp_x = x1 - 70
    sp_y = y0 + 72
    sp_pts = []
    for s_idx, s_val in enumerate(c['sparkline']):
        sx = sp_x + s_idx * 7
        sy = sp_y + 18 - int(s_val * 0.28)
        sp_pts.append((sx, sy))
    for s_idx in range(len(sp_pts) - 1):
        idraw.line([sp_pts[s_idx], sp_pts[s_idx + 1]], fill=color + (220,), width=2)
    idraw.ellipse([sp_pts[-1][0]-2, sp_pts[-1][1]-2, sp_pts[-1][0]+2, sp_pts[-1][1]+2], fill=(255, 255, 255, 255))

img = Image.alpha_composite(img, iso_layer)
img.save('C:/Users/sakju/tahseen-ai/public/cta-ai-solution.png', 'PNG')
print('Successfully generated ultra-detailed cta-ai-solution.png!')
