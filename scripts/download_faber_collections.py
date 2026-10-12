from pathlib import Path
from PIL import Image,ImageOps
from io import BytesIO
import re,time,urllib.request
from concurrent.futures import ThreadPoolExecutor

BASE='http://faber.co.ir'
COLLECTIONS={
 'larix':('/product-category/larix-fa/l-panels/','لاریکس'),
 'renovo':('/product-category/renovo-fa/r-panels/','رنوو'),
 'dito':('/product-category/dito-fa/d-panels/','دیتو'),
}
TARGET=Path('assets/images/store/mdf/faber')
HEADERS={'User-Agent':'Mozilla/5.0'}

def fetch(url,tries=3):
 for attempt in range(tries):
  try:
   req=urllib.request.Request(url,headers=HEADERS)
   with urllib.request.urlopen(req,timeout=35) as response:return response.read()
  except Exception:
   if attempt==tries-1:raise
   time.sleep(2+attempt*2)

for slug,(category,label) in COLLECTIONS.items():
 products=[];seen=set()
 for page in range(1,8):
  url=BASE+category if page==1 else BASE+category+f'page/{page}/'
  try: html=fetch(url).decode('utf-8','ignore')
  except Exception as exc:
   print(label,'page',page,'failed',type(exc).__name__);break
  tags=re.findall(r'<img\b[^>]*class="[^"]*woocommerce_thumbnail[^"]*"[^>]*>',html,re.I)
  current=[]
  for tag in tags:
   src=re.search(r'data-src="([^"]+)"',tag);alt=re.search(r'alt="([^"]*)"',tag)
   if not src:continue
   code=(alt.group(1).strip() if alt else '').replace(label,'').strip() or Path(src.group(1)).stem
   image_url=re.sub(r'-300x300(?=\.[a-zA-Z]+$)','',src.group(1)).replace('https://','http://')
   key=(code,image_url)
   if key not in seen:seen.add(key);current.append(key)
  if not current:break
  products.extend(current);print(label,'page',page,len(current))
 out=TARGET/slug;out.mkdir(parents=True,exist_ok=True)
 for old in out.glob('panel-*.webp'):old.unlink()
 saved=[]
 def download_product(item):
  code,url=item
  try:data=fetch(url)
  except Exception:
   try:data=fetch(re.sub(r'(?=\.[a-zA-Z]+$)','-300x300',url))
   except Exception:return None
  try:
   with Image.open(BytesIO(data)) as opened:
    img=ImageOps.exif_transpose(opened).convert('RGB');img.thumbnail((1200,1200),Image.Resampling.LANCZOS)
    return code,url,img.copy()
  except OSError:return None
 with ThreadPoolExecutor(max_workers=8) as pool: downloaded=list(pool.map(download_product,products))
 for result in downloaded:
  if not result:continue
  code,url,img=result;name=f'panel-{len(saved)+1:02d}.webp';img.save(out/name,'WEBP',quality=86,method=4);saved.append({'file':name,'code':code,'source':url})
 (out/'catalog.json').write_text(__import__('json').dumps(saved,ensure_ascii=False,indent=2),encoding='utf-8')
 print(label,'saved',len(saved))
