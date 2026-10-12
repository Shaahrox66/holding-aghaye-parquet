from pathlib import Path
import json, shutil

review=Path('tmp/kabinet1-review')
records=json.loads((review/'records.json').read_text(encoding='utf-8'))
target=Path('assets/images/kitchen-projects/projects')
groups={
'36-samadi-valiasr':[64,65,66,67,68,69,70,71],
'37-heydari-ferdos':[22,23,45,46,59,60,61,72,73,74,76],
'38-shamsi-parvaz':[36,38,40],
'39-radman-golshahr':[42,47,49],
'40-khosravi-abresan':[56,57,58],
'41-pakdel-pastor':[75,77,79,81,83],
'42-ariani-lalezar':[1,3,21,44],
'43-mirzaei-roshdie':[26,28,30,32,34],
'44-zamani-valiasr':[51,52,53,54,55],
'45-niknam-ferdos':[62,63],
'46-salimi-parvaz':[17,19,24],
'47-boroumand-golshahr':[2,4,6,8,10,12,14,16,18,20,25,27,29,31,33,35,37,39,41,43,48,50],
'48-dadgar-abresan':[5,7,9],
'49-mehrdad-pastor':[11,13,15],
'50-shahbazi-lalezar':[78,80,82,84],
}
for folder,indices in groups.items():
    out=target/folder; out.mkdir(parents=True,exist_ok=True)
    for old in out.glob('new-*.webp'): old.unlink()
    for number,index in enumerate(indices,1):
        shutil.copy2(review/'images'/records[index-1]['review'],out/f'new-{number:02d}.webp')
print({folder:len(indices) for folder,indices in groups.items()})
print(f'Added {sum(map(len,groups.values()))} images in {len(groups)} projects')
