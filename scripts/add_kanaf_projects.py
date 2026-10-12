from pathlib import Path
import json,shutil
root=Path('tmp/kanaf-review');records=json.loads((root/'records.json').read_text(encoding='utf-8'));target=Path('assets/images/renovation/kanaf')
groups={'01-zirsazi':[2,4,6,8,10,12,14,57,59,61],'02-noor-khatti':[1,3,15,16,19,20,21,22,23,24,25,26,27,28,31,32,33,38,41,43,44,45,46,49,50,54,56,58,60],'03-noor-makhfi':[5,7,9,11,13,17,18,29,30,34,35,36,37,39,40,47,48,52],'04-decorative':[42,51,53,55]}
for folder,indices in groups.items():
 out=target/folder;out.mkdir(parents=True,exist_ok=True)
 for old in out.glob('image-*.webp'):old.unlink()
 for number,index in enumerate(indices,1):shutil.copy2(root/'images'/records[index-1]['review'],out/f'image-{number:02d}.webp')
print({k:len(v) for k,v in groups.items()});print(f'Added {sum(map(len,groups.values()))} images')
