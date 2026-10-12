from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import hashlib, json

SOURCE = Path(r"C:\Users\Shahrokh\Desktop\kabinet\New folder\2")
OUTPUT = Path("assets/images/design-studio/incoming")
SHEETS = Path("tmp/design-contact-sheets")
OUTPUT.mkdir(parents=True, exist_ok=True)
SHEETS.mkdir(parents=True, exist_ok=True)

for old in OUTPUT.glob("*.webp"):
    old.unlink()

seen, manifest, outputs = set(), [], []
files = sorted(
    (p for p in SOURCE.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}),
    key=lambda p: int(p.stem) if p.stem.isdigit() else p.stem,
)

for source in files:
    try:
        with Image.open(source) as img:
            img = ImageOps.exif_transpose(img).convert("RGB")
            signature_img = ImageOps.fit(img, (32, 32), method=Image.Resampling.LANCZOS).convert("L")
            signature = hashlib.sha256(signature_img.tobytes()).hexdigest()
            if signature in seen:
                continue
            seen.add(signature)
            img.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            out = OUTPUT / f"design-{source.stem}.webp"
            img.save(out, "WEBP", quality=84, method=6)
            manifest.append({"source": source.name, "output": out.name})
            outputs.append(out)
    except OSError:
        continue

(OUTPUT.parent / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
font = ImageFont.load_default(size=15)
for sheet_index in range((len(outputs) + 29) // 30):
    batch = outputs[sheet_index * 30:(sheet_index + 1) * 30]
    canvas = Image.new("RGB", (1000, 6 * 160), "#151515")
    draw = ImageDraw.Draw(canvas)
    for i, path in enumerate(batch):
        x, y = (i % 5) * 200, (i // 5) * 160
        with Image.open(path) as img:
            thumb = ImageOps.fit(img.convert("RGB"), (200, 132), method=Image.Resampling.LANCZOS)
        canvas.paste(thumb, (x, y))
        draw.text((x + 7, y + 136), path.stem.replace('design-', ''), fill="white", font=font)
    canvas.save(SHEETS / f"sheet-{sheet_index + 1:02d}.jpg", quality=88)
print(f"Imported {len(outputs)} unique design images from {len(files)} source files")
