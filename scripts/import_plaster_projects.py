from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json

SOURCE = Path(r"C:\Users\Shahrokh\Desktop\GACH")
OUTPUT = Path("assets/images/store/plaster/projects")
SHEETS = Path("tmp/plaster-contact-sheets")
OUTPUT.mkdir(parents=True, exist_ok=True)
SHEETS.mkdir(parents=True, exist_ok=True)

# (source subfolder, filename prefix, wanted count, output folder)
specs = [
    (".", "IMG_20251105", 5, "01-farhadi"),
    (".", "IMG_20251111", 5, "02-ahmadi"),
    (".", "IMG_20260307", 2, "03-karimi"),
    (".", "IMG_20260531", 5, "04-rostami"),
    (".", "IMG_20260608", 5, "05-moradi"),
    ("گچبری جدید", "IMG_20240727", 4, "06-hosseini"),
    ("گچبری جدید", "IMG_20241103", 4, "07-jafari"),
    ("گچبری جدید", "IMG_20241106", 5, "08-rahimi"),
    ("گچبری جدید", "IMG_20241125", 5, "09-akbari"),
    ("گچبری جدید", "IMG_20241211", 5, "10-sadeghi"),
    ("گچبری جدید", "IMG_20241216_104", 4, "11-naderi"),
    ("گچبری جدید", "IMG_20250131", 5, "12-tavakoli"),
    ("گچبری جدید", "IMG_20250202", 5, "13-yousefi"),
    ("گچبری جدید", "IMG_20250217", 4, "14-rezaei"),
    ("گچبری جدید", "IMG_20250303", 4, "15-ansari"),
    ("گچبری جدید", "IMG-20250413-WA", 5, "16-sharifi"),
    ("گچبری خارجی", "IMG-20210327-WA", 5, "17-soleimani"),
    ("گچبری خارجی", "IMG-20221115-WA", 5, "18-mousavi"),
    ("گچبری خارجی", "IMG-20230726-WA", 4, "19-ebrahimi"),
]

manifest, all_outputs = [], []
for subfolder, prefix, wanted, folder in specs:
    directory = SOURCE if subfolder == "." else SOURCE / subfolder
    candidates = sorted(
        p for p in directory.iterdir()
        if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"} and p.name.startswith(prefix)
    )
    if len(candidates) > wanted:
        positions = [round(i * (len(candidates) - 1) / (wanted - 1)) for i in range(wanted)] if wanted > 1 else [0]
        candidates = [candidates[i] for i in positions]
    project_dir = OUTPUT / folder
    project_dir.mkdir(parents=True, exist_ok=True)
    for old_file in project_dir.glob("*.webp"):
        old_file.unlink()
    outputs = []
    for index, source in enumerate(candidates, 1):
        out = project_dir / f"image-{index:02d}.webp"
        with Image.open(source) as img:
            img = ImageOps.exif_transpose(img).convert("RGB")
            img.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            img.save(out, "WEBP", quality=82, method=6)
        outputs.append(out.name)
        all_outputs.append((folder, out))
    manifest.append({"folder": folder, "source": f"{subfolder}/{prefix}", "images": outputs})

(OUTPUT.parent / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
font = ImageFont.load_default(size=15)
for sheet_index in range((len(all_outputs) + 19) // 20):
    batch = all_outputs[sheet_index * 20:(sheet_index + 1) * 20]
    canvas = Image.new("RGB", (1000, 720), "#171717")
    draw = ImageDraw.Draw(canvas)
    for i, (folder, path) in enumerate(batch):
        x, y = (i % 5) * 200, (i // 5) * 180
        with Image.open(path) as img:
            thumb = ImageOps.fit(img.convert("RGB"), (200, 150), method=Image.Resampling.LANCZOS)
        canvas.paste(thumb, (x, y))
        draw.text((x + 6, y + 154), f"{folder[:2]} / {path.stem}", fill="white", font=font)
    canvas.save(SHEETS / f"sheet-{sheet_index + 1:02d}.jpg", quality=88)

print(f"Imported {len(all_outputs)} images in {len(manifest)} projects")
