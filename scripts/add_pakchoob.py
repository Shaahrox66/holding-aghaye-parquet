from pathlib import Path
import json,shutil
root=Path('tmp/pakchoob-review');records=json.loads((root/'records.json').read_text(encoding='utf-8'));target=Path('assets/images/store/mdf/pakchoob')
wood=[5,21,26,29,30,31,32,34,45,46,50,65];colors=[36,37,38,39,40,41,42];decor=[35,43,47,48,49];used=set(wood+colors+decor);neutral=[i for i in range(1,66) if i not in used]
groups={'01-neutral-gloss':neutral,'02-wood-texture':wood,'03-bold-colors':colors,'04-decorative':decor}
for folder,indices in groups.items():
 out=target/folder;out.mkdir(parents=True,exist_ok=True)
 for old in out.glob('image-*.webp'):old.unlink()
 for number,index in enumerate(indices,1):shutil.copy2(root/'images'/records[index-1]['review'],out/f'image-{number:02d}.webp')
print({k:len(v) for k,v in groups.items()});print(f'Added {sum(map(len,groups.values()))} images')
