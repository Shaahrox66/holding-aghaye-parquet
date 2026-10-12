from pathlib import Path
import re
for name in ('renovo','dito','larix'):
    file=Path(f'tmp/faber-{name}.html')
    if not file.exists(): continue
    text=file.read_text(encoding='utf-8',errors='ignore')
    print('\n###',name,'size',len(text))
    tags=re.findall(r'<img\b[^>]+>',text,re.I)
    for tag in tags:
        if 'product' in tag.lower() or 'uploads' in tag.lower(): print(tag[:900])
    print('img tags',len(tags))
