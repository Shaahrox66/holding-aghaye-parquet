from pathlib import Path
import json, shutil

root=Path('tmp/tarahi-review'); records=json.loads((root/'records.json').read_text(encoding='utf-8'))
target=Path('assets/images/design-studio/projects')
groups={'11-safid-e-marmar':range(1,8),'12-garm-e-choob':range(8,13)}
for folder,indices in groups.items():
    out=target/folder; out.mkdir(parents=True,exist_ok=True)
    for old in out.glob('image-*.webp'): old.unlink()
    for number,index in enumerate(indices,1):
        shutil.copy2(root/'images'/records[index-1]['review'],out/f'image-{number:02d}.webp')
print({folder:len(list(indices)) for folder,indices in groups.items()})
