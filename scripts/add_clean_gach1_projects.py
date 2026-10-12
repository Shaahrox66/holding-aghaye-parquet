from pathlib import Path
import json, re, shutil

REVIEW = Path("tmp/gach1-review")
SOURCE = REVIEW / "images"
TARGET = Path("assets/images/store/plaster/projects")
records = json.loads((REVIEW / "records.json").read_text(encoding="utf-8"))

# Manually rejected after visual review: people, writing, logos, watermarks,
# social-media marks, branded/labelled screens, or promotional overlays.
rejected = {
    13, 85, 102, 108, 120, 132, 150, 170, 190, 217, 227, 231, 236,
    257, 259, 267, 280, 294, 296, 313, 315, 317, 319, 348,
}

groups = {
    "2313": "21-khat-e-sefid",
    "2314": "22-ghab-e-khamoosh",
    "2317": "23-noor-e-divar",
    "2319": "24-naghshe-aram",
    "2320": "25-zarrin-saye",
    "2321": "26-tagh-e-noor",
    "2323": "27-sepid-e-sadeh",
    "2325": "28-naghshe-zarrin",
    "2326": "29-hashie-sepid",
}

for folder in groups.values():
    destination = TARGET / folder
    destination.mkdir(parents=True, exist_ok=True)
    for old in destination.glob("*.webp"):
        old.unlink()

counts = {key: 0 for key in groups}
for record in records:
    review_name = record["review"]
    index = int(review_name.split("-", 1)[0])
    if index in rejected:
        continue
    match = re.search(r"-(\d{4})\.webp$", review_name)
    if not match or match.group(1) not in groups:
        continue
    key = match.group(1)
    counts[key] += 1
    destination = TARGET / groups[key] / f"image-{counts[key]:02d}.webp"
    shutil.copy2(SOURCE / review_name, destination)

print(json.dumps({groups[key]: count for key, count in counts.items()}, ensure_ascii=False))
print(f"Added {sum(counts.values())} clean images; rejected {len(rejected)} reviewed images")
