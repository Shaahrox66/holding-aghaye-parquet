param(
  [string]$Source = "D:\c new 2026\TARAHI"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$outRoot = Join-Path $root "assets\images\design-2026"
$jsPath = Join-Path $root "assets\js\design-auto-projects.js"
$htmlPath = Join-Path $root "pages\design.html"

if (-not (Test-Path -LiteralPath $Source)) { throw "Source folder was not found: $Source" }
New-Item -ItemType Directory -Force -Path $outRoot, (Split-Path $jsPath) | Out-Null

$extensions = @(".jpg", ".jpeg", ".png", ".webp")
$files = Get-ChildItem -LiteralPath $Source -Recurse -File | Where-Object {
  $extensions -contains $_.Extension.ToLowerInvariant()
} | Sort-Object FullName

$seen = @{}
$unique = foreach ($file in $files) {
  $hash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
  if (-not $seen.ContainsKey($hash)) {
    $seen[$hash] = $true
    $file
  }
}

$sourceFull = [IO.Path]::GetFullPath($Source).TrimEnd('\')
$folderGroups = @{}
$rootFiles = New-Object System.Collections.Generic.List[object]

foreach ($file in $unique) {
  $relative = [IO.Path]::GetRelativePath($sourceFull, $file.FullName)
  $parts = $relative -split '[\\/]'
  if ($parts.Count -gt 1) {
    $key = $parts[0]
    if (-not $folderGroups.ContainsKey($key)) { $folderGroups[$key] = New-Object System.Collections.Generic.List[object] }
    $folderGroups[$key].Add($file)
  } else {
    $rootFiles.Add($file)
  }
}

$groups = New-Object System.Collections.Generic.List[object]
foreach ($key in ($folderGroups.Keys | Sort-Object)) {
  $groups.Add([pscustomobject]@{ RawName = $key; Files = @($folderGroups[$key]) })
}

if ($rootFiles.Count -gt 0) {
  $ordered = @($rootFiles | Sort-Object LastWriteTime, Name)
  $batch = New-Object System.Collections.Generic.List[object]
  $batchNumber = 1
  $previous = $null
  foreach ($file in $ordered) {
    $newBatch = $batch.Count -ge 10
    if ($previous -and (($file.LastWriteTime - $previous.LastWriteTime).TotalHours -gt 8)) { $newBatch = $true }
    if ($newBatch -and $batch.Count) {
      $groups.Add([pscustomobject]@{ RawName = "طرح $batchNumber"; Files = @($batch) })
      $batch = New-Object System.Collections.Generic.List[object]
      $batchNumber++
    }
    $batch.Add($file)
    $previous = $file
  }
  if ($batch.Count) { $groups.Add([pscustomobject]@{ RawName = "طرح $batchNumber"; Files = @($batch) }) }
}

function Get-Category([string]$text) {
  $value = $text.ToLowerInvariant()
  if ($value -match 'kitchen|cabinet|kabinet|آشپز|کابینت') { return 'آشپزخانه' }
  if ($value -match 'wardrobe|closet|کمد|کلوزت') { return 'کمد و کلوزت' }
  if ($value -match 'bed|room|اتاق|خواب') { return 'اتاق خواب' }
  if ($value -match 'office|اداری|دفتر') { return 'فضای اداری' }
  if ($value -match 'tv|تلویزیون') { return 'تی وی وال' }
  if ($value -match 'facade|نما') { return 'نما' }
  return 'طراحی داخلی'
}

Remove-Item -LiteralPath $outRoot -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $outRoot | Out-Null
$projects = New-Object System.Collections.Generic.List[object]
$index = 1

foreach ($group in $groups) {
  if (-not $group.Files.Count) { continue }
  $slug = ('project-{0:d2}' -f $index)
  $destination = Join-Path $outRoot $slug
  New-Item -ItemType Directory -Force -Path $destination | Out-Null
  $images = New-Object System.Collections.Generic.List[string]
  $photoIndex = 1
  foreach ($file in $group.Files) {
    $name = ('{0:d2}{1}' -f $photoIndex, $file.Extension.ToLowerInvariant())
    Copy-Item -LiteralPath $file.FullName -Destination (Join-Path $destination $name) -Force
    $images.Add("../assets/images/design-2026/$slug/$name")
    $photoIndex++
  }
  $raw = ([string]$group.RawName).Trim()
  $name = if ($raw -match '^(IMG|DSC|طرح\s*\d+$)' -or $raw.Length -gt 22) { "طرح $index" } else { $raw }
  $projects.Add([ordered]@{
    name = $name
    category = Get-Category $raw
    images = @($images)
  })
  $index++
}

$json = $projects | ConvertTo-Json -Depth 6 -Compress
$script = @'
(() => {
  const projects = __PROJECTS_JSON__;
  if (!projects.length) return;
  const style = document.createElement('style');
  style.textContent = `
    #design-imported-projects{direction:rtl;padding:28px 4vw 36px;background:#f7f7f5;color:#181818}
    #design-imported-projects h2{margin:0 0 18px;font-size:24px;letter-spacing:0}
    .design-import-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
    .design-import-card{border:0;background:#fff;padding:0;text-align:right;cursor:pointer;overflow:hidden;border-radius:4px;box-shadow:0 1px 7px #00000018}
    .design-import-card img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;transition:transform .25s}
    .design-import-card:hover img{transform:scale(1.04)}
    .design-import-card span{display:block;padding:10px 11px 2px;font-weight:700}
    .design-import-card small{display:block;padding:0 11px 11px;color:#666}
    .design-viewer{position:fixed;inset:0;z-index:99999;background:#111e;display:none;align-items:center;justify-content:center;padding:54px 5vw 24px}
    .design-viewer.open{display:flex}.design-viewer img{max-width:88vw;max-height:78vh;object-fit:contain}
    .design-viewer button{position:absolute;border:0;background:#fff;color:#111;width:42px;height:42px;font-size:25px;cursor:pointer;border-radius:50%}
    .design-viewer-close{top:10px;right:14px}.design-viewer-next{right:18px}.design-viewer-prev{left:18px}
    .design-viewer-title{position:absolute;top:16px;color:#fff;font-size:16px}
    @media(max-width:600px){.design-import-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.design-import-card span{font-size:14px}}
  `;
  document.head.appendChild(style);
  const section = document.createElement('section');
  section.id = 'design-imported-projects';
  section.innerHTML = '<h2>پروژه‌های جدید</h2><div class="design-import-grid"></div>';
  const grid = section.querySelector('.design-import-grid');
  projects.forEach((project, projectIndex) => {
    const card = document.createElement('button');
    card.className = 'design-import-card';
    card.innerHTML = `<img loading="lazy" src="${project.images[0]}" alt="${project.name}"><span>${project.name}</span><small>${project.category} · ${project.images.length} عکس</small>`;
    card.addEventListener('click', () => openViewer(projectIndex, 0));
    grid.appendChild(card);
  });
  const main = document.querySelector('main');
  if (main) main.prepend(section); else document.body.prepend(section);

  const viewer = document.createElement('div');
  viewer.className = 'design-viewer';
  viewer.innerHTML = '<div class="design-viewer-title"></div><button class="design-viewer-close" aria-label="بستن">×</button><button class="design-viewer-next" aria-label="بعدی">›</button><img alt=""><button class="design-viewer-prev" aria-label="قبلی">‹</button>';
  document.body.appendChild(viewer);
  let activeProject = 0, activeImage = 0;
  const render = () => {
    const project = projects[activeProject];
    viewer.querySelector('img').src = project.images[activeImage];
    viewer.querySelector('.design-viewer-title').textContent = `${project.name} · ${activeImage + 1}/${project.images.length}`;
  };
  function openViewer(projectIndex, imageIndex){ activeProject=projectIndex;activeImage=imageIndex;render();viewer.classList.add('open');document.body.style.overflow='hidden'; }
  const close = () => {viewer.classList.remove('open');document.body.style.overflow='';};
  const move = step => {const images=projects[activeProject].images;activeImage=(activeImage+step+images.length)%images.length;render();};
  viewer.querySelector('.design-viewer-close').onclick=close;
  viewer.querySelector('.design-viewer-next').onclick=()=>move(1);
  viewer.querySelector('.design-viewer-prev').onclick=()=>move(-1);
  viewer.addEventListener('click', event => {if(event.target===viewer) close();});
  document.addEventListener('keydown', event => {if(!viewer.classList.contains('open'))return;if(event.key==='Escape')close();if(event.key==='ArrowRight')move(1);if(event.key==='ArrowLeft')move(-1);});
})();
'@
$script = $script.Replace('__PROJECTS_JSON__', $json)
Set-Content -LiteralPath $jsPath -Value $script -Encoding utf8

$html = Get-Content -LiteralPath $htmlPath -Raw -Encoding utf8
$tag = '<script src="../assets/js/design-auto-projects.js"></script>'
if ($html -notmatch 'design-auto-projects\.js') {
  $html = $html -replace '</body>', "  $tag`r`n</body>"
  Set-Content -LiteralPath $htmlPath -Value $html -Encoding utf8
}

Write-Output ("Imported {0} projects and {1} unique images." -f $projects.Count, $unique.Count)
