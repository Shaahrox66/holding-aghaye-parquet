from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
import hashlib,json,re
source=Path(r'C:\Users\Shahrokh\Desktop\NUR\LINE');root=Path('tmp/nur-line-review');images=root/'images';sheets=root/'sheets'
images.mkdir(parents=True,exist_ok=True);sheets.mkdir(parents=True,exist_ok=True)
for folder in (images,sheets):
 for old in folder.iterdir():old.unlink()
seen=set();records=[]
for file in sorted(source.iterdir()):
 if file.suffix.lower() not in {'.jpg','.jpeg','.png','.webp'}:continue
 with Image.open(file) as opened:
  img=ImageOps.exif_transpose(opened).convert('RGB');digest=hashlib.sha256(img.tobytes()).hexdigest()
  if digest in seen:continue
  seen.add(digest);m=re.match(r'photo_(\d+)_',file.name);label=f'p{int(m.group(1)):02d}';out=images/f'{len(records)+1:02d}-{label}.webp'
  img.thumbnail((1100,1100),Image.Resampling.BILINEAR);img.save(out,'WEBP',quality=82,method=1);records.append({'source':str(file),'review':out.name,'label':label})
(root/'records.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8');canvas=Image.new('RGB',(1000,800),'#151515');draw=ImageDraw.Draw(canvas);font=ImageFont.load_default(size=14)
for i,record in enumerate(records):
 x,y=(i%4)*250,(i//4)*160
 with Image.open(images/record['review']) as img:thumb=ImageOps.fit(img.convert('RGB'),(250,130),method=Image.Resampling.LANCZOS)
 canvas.paste(thumb,(x,y));draw.text((x+5,y+134),record['review'],fill='white',font=font)
canvas.save(sheets/'sheet-01.jpg',quality=91);print(f'Prepared {len(records)} unique images')
