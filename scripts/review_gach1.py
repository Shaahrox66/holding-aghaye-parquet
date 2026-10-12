from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import hashlib, json, re

SOURCE = Path(r"C:\Users\Shahrokh\Desktop\GACH\1")
REVIEW = Path("tmp/gach1-review/images")
SHEETS = Path("tmp/gach1-review/sheets")
REVIEW.mkdir(parents=True, exist_ok=True)
SHEETS.mkdir(parents=True, exist_ok=True)
for old in REVIEW.glob("*.webp"): old.unlink()
for old in SHEETS.glob("*.jpg"): old.unlink()

seen, records = set(), []
files = sorted(p for p in SOURCE.iterdir() if p.suffix.lower() in {'.jpg','.jpeg','.png','.webp'})
for source in files:
    try:
        with Image.open(source) as img:
            img = ImageOps.exif_transpose(img).convert('RGB')
            sig_img = ImageOps.fit(img, (48,48), method=Image.Resampling.LANCZOS).convert('L')
            sig = hashlib.sha256(sig_img.tobytes()).hexdigest()
            if sig in seen: continue
            seen.add(sig)
            match = re.match(r'photo_(\d+)_.*_(\d{2})-(\d{2})-(\d{2})', source.stem)
            label = f"p{int(match.group(1)):02d}-{match.group(2)}{match.group(3)}" if match else source.stem[:18]
            out = REVIEW / f"{len(records)+1:03d}-{label}.webp"
            img.thumbnail((1200,1200), Image.Resampling.LANCZOS)
            img.save(out,'WEBP',quality=80,method=4)
            records.append({'source':source.name,'review':out.name,'label':label})
    except OSError: pass

(REVIEW.parent/'records.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
font=ImageFont.load_default(size=14)
for si in range((len(records)+29)//30):
    batch=records[si*30:(si+1)*30]
    canvas=Image.new('RGB',(1000,900),'#151515');draw=ImageDraw.Draw(canvas)
    for i,record in enumerate(batch):
        x,y=(i%5)*200,(i//5)*150
        with Image.open(REVIEW/record['review']) as img:
            thumb=ImageOps.fit(img.convert('RGB'),(200,122),method=Image.Resampling.LANCZOS)
        canvas.paste(thumb,(x,y));draw.text((x+5,y+126),record['review'][:18],fill='white',font=font)
    canvas.save(SHEETS/f"sheet-{si+1:02d}.jpg",quality=88)
print(f"Prepared {len(records)} unique images in {(len(records)+29)//30} sheets")
