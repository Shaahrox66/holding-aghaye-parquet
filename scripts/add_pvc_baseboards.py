from pathlib import Path
import json,shutil
root=Path('tmp/gharniz-review');records=json.loads((root/'records.json').read_text(encoding='utf-8'));target=Path('assets/images/store/baseboard/pvc')
groups={'01-sadeh-modern':[2,3,4,8,9,10,11,12,18,44,45,46,47,48],'02-classic-zarrin':[7,15,16,17,20,22,28,29,30,31,32,33,39,49,50,51,52,53,54,55],'03-takht-texture':[5,6,13,26,34,35,36,37,38,40,41,42,43,56,57,58],'04-line-barik':[1,59]}
for folder,indices in groups.items():
 out=target/folder;out.mkdir(parents=True,exist_ok=True)
 for old in out.glob('image-*.webp'):old.unlink()
 for number,index in enumerate(indices,1):shutil.copy2(root/'images'/records[index-1]['review'],out/f'image-{number:02d}.webp')
print({k:len(v) for k,v in groups.items()});print(f'Added {sum(map(len,groups.values()))}; rejected 7 Isatis images')
