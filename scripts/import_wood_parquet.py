from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json, re

SOURCE = Path(r"D:\PARKET CHOBI")
OUTPUT = Path("assets/images/store/wood-parquet/projects")
SHEETS = Path("tmp/parquet-contact-sheets")
OUTPUT.mkdir(parents=True, exist_ok=True)
SHEETS.mkdir(parents=True, exist_ok=True)

digit_map = str.maketrans("۰۱۲۳۴۵۶۷۸۹", "0123456789")
specs = [
    ("20250424", 6, "01-farhadi-valiasr"),
    ("20250810", 5, "02-ahmadi-roshdie"),
    ("20251001", 4, "03-karimi-abresan"),
    ("20251009", 4, "04-rostami-ferdos"),
    ("20251010", 4, "05-moradi-parvaz"),
    ("20251012", 5, "06-hosseini-golshahr"),
    ("20251116", 5, "07-jafari-pastor"),
    ("20251228", 5, "08-rahimi-lalezar"),
    ("20260103", 5, "09-akbari-valiasr"),
    ("20260216", 5, "10-sadeghi-roshdie"),
    ("20260223", 5, "11-naderi-abresan"),
    ("20260413", 5, "12-tavakoli-ferdos"),
    ("20260418", 5, "13-yousefi-parvaz"),
    ("20260427", 4, "14-rezaei-golshahr"),
    ("20260521", 3, "15-ansari-pastor"),
]

images = []
for path in SOURCE.rglob("*"):
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        continue
    normalized = path.stem.translate(digit_map)
    match = re.match(r"(\d{8})", normalized)
    if match:
        images.append((match.group(1), normalized, path))

manifest = []
all_outputs = []
for date, wanted, folder in specs:
    candidates = sorted((item for item in images if item[0] == date), key=lambda item: item[1])
    if len(candidates) > wanted:
        positions = [round(i * (len(candidates) - 1) / (wanted - 1)) for i in range(wanted)] if wanted > 1 else [0]
        candidates = [candidates[i] for i in positions]
    project_dir = OUTPUT / folder
    project_dir.mkdir(parents=True, exist_ok=True)
    out_files = []
    for index, (_, _, source) in enumerate(candidates[:wanted], 1):
        out = project_dir / f"image-{index:02d}.webp"
        with Image.open(source) as img:
            img = ImageOps.exif_transpose(img).convert("RGB")
            img.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            img.save(out, "WEBP", quality=82, method=6)
        out_files.append(out.name)
        all_outputs.append((folder, out))
    manifest.append({"date": date, "folder": folder, "images": out_files})

(OUTPUT.parent / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

font = ImageFont.load_default(size=16)
for sheet_index in range((len(all_outputs) + 19) // 20):
    batch = all_outputs[sheet_index * 20:(sheet_index + 1) * 20]
    canvas = Image.new("RGB", (1000, 4 * 180), "#171717")
    draw = ImageDraw.Draw(canvas)
    for i, (folder, path) in enumerate(batch):
        x, y = (i % 5) * 200, (i // 5) * 180
        with Image.open(path) as img:
            thumb = ImageOps.fit(img.convert("RGB"), (200, 150), method=Image.Resampling.LANCZOS)
        canvas.paste(thumb, (x, y))
        draw.text((x + 6, y + 154), f"{folder[:2]} / {path.stem}", fill="white", font=font)
    canvas.save(SHEETS / f"sheet-{sheet_index + 1:02d}.jpg", quality=88)

print(f"Imported {len(all_outputs)} images in {len(manifest)} projects")
