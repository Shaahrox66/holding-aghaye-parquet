from pathlib import Path
import json,shutil
root=Path('tmp/nur-line-review');records=json.loads((root/'records.json').read_text(encoding='utf-8'));out=Path('assets/images/store/lighting/line/01-line-nouri')
out.mkdir(parents=True,exist_ok=True)
for old in out.glob('image-*.webp'):old.unlink()
for number,record in enumerate(records,1):shutil.copy2(root/'images'/record['review'],out/f'image-{number:02d}.webp')
print(f'Added {len(records)} images to one line-lighting collection')
