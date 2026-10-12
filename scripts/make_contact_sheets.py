from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

SOURCE = Path("assets/images/kitchen-projects/incoming")
OUTPUT = Path("tmp/contact-sheets")
OUTPUT.mkdir(parents=True, exist_ok=True)

files = sorted(
    (p for p in SOURCE.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}),
    key=lambda p: int("".join(filter(str.isdigit, p.stem)) or 0),
)

thumb_w, thumb_h = 180, 180
label_h = 26
cols, rows = 5, 6
per_sheet = cols * rows
font = ImageFont.load_default(size=16)

for sheet_index in range((len(files) + per_sheet - 1) // per_sheet):
    batch = files[sheet_index * per_sheet:(sheet_index + 1) * per_sheet]
    canvas = Image.new("RGB", (cols * thumb_w, rows * (thumb_h + label_h)), "#171717")
    draw = ImageDraw.Draw(canvas)
    for i, path in enumerate(batch):
        x = (i % cols) * thumb_w
        y = (i // cols) * (thumb_h + label_h)
        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            thumb = ImageOps.fit(image, (thumb_w, thumb_h), method=Image.Resampling.LANCZOS)
        canvas.paste(thumb, (x, y))
        draw.rectangle((x, y + thumb_h, x + thumb_w, y + thumb_h + label_h), fill="#111111")
        draw.text((x + 7, y + thumb_h + 4), path.name, fill="white", font=font)
    out = OUTPUT / f"sheet-{sheet_index + 1:02d}.jpg"
    canvas.save(out, quality=88, optimize=True)
    print(out)
