from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
import hashlib,json,re
source=Path(r'C:\Users\Shahrokh\Desktop\MDF\PAKCHOOB');root=Path('tmp/pakchoob-review');images,sheets=root/'images',root/'sheets'
images.mkdir(parents=True,exist_ok=True);sheets.mkdir(parents=True,exist_ok=True)
for folder in (images,sheets):
 for old in folder.iterdir():old.unlink()
seen=set();records=[]
for file in sorted(source.iterdir()):
 if file.suffix.lower() not in {'.jpg','.jpeg','.png','.webp'}:continue
 with Image.open(file) as opened:
  img=ImageOps.exif_transpose(opened).convert('RGB');digest=hashlib.sha256(img.tobytes()).hexdigest()
  if digest in seen:continue
  seen.add(digest);m=re.match(r'photo_(\d+)_',file.name);label=f'p{int(m.group(1)):02d}';out=images/f'{len(records)+1:03d}-{label}.webp'
  img.thumbnail((1000,1000),Image.Resampling.BILINEAR);img.save(out,'WEBP',quality=80,method=1);records.append({'source':str(file),'review':out.name,'label':label})
(root/'records.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8');font=ImageFont.load_default(size=14)
for page in range((len(records)+19)//20):
 batch=records[page*20:(page+1)*20];canvas=Image.new('RGB',(1000,800),'#151515');draw=ImageDraw.Draw(canvas)
 for i,record in enumerate(batch):
  x,y=(i%4)*250,(i//4)*160
  with Image.open(images/record['review']) as img:thumb=ImageOps.fit(img.convert('RGB'),(250,130),method=Image.Resampling.LANCZOS)
  canvas.paste(thumb,(x,y));draw.text((x+5,y+134),record['review'],fill='white',font=font)
 canvas.save(sheets/f'sheet-{page+1:02d}.jpg',quality=91)
print(f'Prepared {len(records)} unique images')
