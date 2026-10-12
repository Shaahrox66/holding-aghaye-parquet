from pathlib import Path
import json, shutil

root=Path('tmp/edari-review'); records=json.loads((root/'records.json').read_text(encoding='utf-8'))
target=Path('assets/images/full-projects/office')
groups={
    '01-modiriyat-khakestari':[28,29,1,2,3,4,5,6,7,8,9,10],
    '02-daftar-baz-choob':[12,13,14,15,16,17,18,19,20,21],
    '03-edari-sabz':[11,22,23,24,25,26,27],
}
for folder,indices in groups.items():
    out=target/folder; out.mkdir(parents=True,exist_ok=True)
    for old in out.glob('image-*.webp'): old.unlink()
    for number,index in enumerate(indices,1): shutil.copy2(root/'images'/records[index-1]['review'],out/f'image-{number:02d}.webp')
print({folder:len(indices) for folder,indices in groups.items()})
