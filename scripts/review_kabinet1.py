from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import hashlib, json, re

SOURCE = Path(r"C:\Users\Shahrokh\Desktop\kabinet\1")
ROOT = Path("tmp/kabinet1-review")
REVIEW, SHEETS = ROOT / "images", ROOT / "sheets"
REVIEW.mkdir(parents=True, exist_ok=True); SHEETS.mkdir(parents=True, exist_ok=True)
for folder in (REVIEW, SHEETS):
    for old in folder.iterdir(): old.unlink()
seen, records = set(), []
for source in sorted(SOURCE.iterdir()):
    if source.suffix.lower() not in {'.jpg','.jpeg','.png','.webp'}: continue
    try:
        with Image.open(source) as opened:
            img = ImageOps.exif_transpose(opened).convert('RGB')
            signature = hashlib.sha256(ImageOps.fit(img,(48,48),method=Image.Resampling.LANCZOS).convert('L').tobytes()).hexdigest()
            if signature in seen: continue
            seen.add(signature)
            match=re.match(r'photo_(\d+)_.*_(\d{2})-(\d{2})-(\d{2})',source.stem)
            label=f"p{int(match.group(1)):02d}-{match.group(2)}{match.group(3)}{match.group(4)}" if match else source.stem[:20]
            out=REVIEW/f"{len(records)+1:03d}-{label}.webp"
            img.thumbnail((900,900),Image.Resampling.BILINEAR); img.save(out,'WEBP',quality=76,method=1)
            records.append({'source':str(source),'review':out.name,'label':label})
    except OSError: pass
(ROOT/'records.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
font=ImageFont.load_default(size=14)
for si in range((len(records)+19)//20):
    batch=records[si*20:(si+1)*20]; canvas=Image.new('RGB',(1000,800),'#151515'); draw=ImageDraw.Draw(canvas)
    for i,record in enumerate(batch):
        x,y=(i%4)*250,(i//4)*160
        with Image.open(REVIEW/record['review']) as img: thumb=ImageOps.fit(img.convert('RGB'),(250,130),method=Image.Resampling.LANCZOS)
        canvas.paste(thumb,(x,y)); draw.text((x+5,y+134),record['review'][:22],fill='white',font=font)
    canvas.save(SHEETS/f"sheet-{si+1:02d}.jpg",quality=90)
print(f"Prepared {len(records)} unique images in {(len(records)+19)//20} sheets")
