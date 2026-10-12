param(
  [string]$Source = 'C:\Users\Shahrokh\Desktop\TARAHI',
  [string]$Workspace = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$imageExtensions = @('.jpg', '.jpeg', '.png', '.webp', '.avif')
$destination = Join-Path $Workspace 'assets\images\design-studio'
$dataFile = Join-Path $Workspace 'js\design-studio-data.js'

if (-not (Test-Path -LiteralPath $Source)) { throw "Source folder not found: $Source" }
New-Item -ItemType Directory -Force -Path $destination | Out-Null
Get-ChildItem -LiteralPath $destination -Directory -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force

function Get-Category([string]$name) {
  $value = $name.ToLowerInvariant()
  if ($value -match 'kitchen|cabinet|آشپز|کابینت') { return 'آشپزخانه و کابینت' }
  if ($value -match 'wardrobe|closet|کمد|کلوزت|رختکن') { return 'کمد و کلوزت' }
  if ($value -match 'bed|room|خواب|اتاق') { return 'فضای خواب' }
  if ($value -match 'office|اداری|میز|study') { return 'فضای کار' }
  if ($value -match 'facade|نما|معمار|architecture') { return 'طراحی معماری' }
  return 'طراحی داخلی'
}

function Get-Summary([string]$category) {
  switch ($category) {
    'آشپزخانه و کابینت' { return 'طراحی و اجرای فضای آشپزخانه با تمرکز بر نظم بصری، دسترسی مناسب و انتخاب هماهنگ متریال.' }
    'کمد و کلوزت' { return 'طراحی کمد سفارشی با تقسیم‌بندی کاربردی، جزئیات اجرایی دقیق و استفاده بهینه از فضا.' }
    'فضای خواب' { return 'طراحی یکپارچه فضای خواب، کمد و مبلمان ثابت با زبان بصری آرام و کاربرد روزمره.' }
    'فضای کار' { return 'ترکیب فضای کار، ذخیره‌سازی و نورپردازی برای رسیدن به محیطی منظم و متمرکز.' }
    'طراحی معماری' { return 'مطالعه فرم، تناسبات و جزئیات معماری برای ساخت فضایی منسجم و ماندگار.' }
    default { return 'طراحی داخلی سفارشی با توجه به نیاز کارفرما، تناسبات فضا و هماهنگی رنگ و متریال.' }
  }
}

$files = Get-ChildItem -LiteralPath $Source -File -Recurse | Where-Object { $imageExtensions -contains $_.Extension.ToLowerInvariant() }
if (-not $files) { throw 'No supported images were found.' }

$seenHashes = @{}
$uniqueFiles = foreach ($file in $files) {
  $hash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
  if (-not $seenHashes.ContainsKey($hash)) {
    $seenHashes[$hash] = $true
    $relativeParent = [IO.Path]::GetRelativePath($Source, $file.DirectoryName)
    if ($relativeParent -eq '.') { $relativeParent = 'پروژه‌های طراحی' }
    [PSCustomObject]@{ File = $file; Group = $relativeParent }
  }
}

$projects = @()
$projectIndex = 0
foreach ($group in ($uniqueFiles | Group-Object Group | Sort-Object Name)) {
  $projectIndex++
  $slug = 'project-{0:d3}' -f $projectIndex
  $projectFolder = Join-Path $destination $slug
  New-Item -ItemType Directory -Force -Path $projectFolder | Out-Null
  $imagePaths = @()
  $imageIndex = 0
  foreach ($entry in ($group.Group | Sort-Object { $_.File.Name })) {
    $imageIndex++
    $extension = $entry.File.Extension.ToLowerInvariant()
    if ($extension -eq '.jpeg') { $extension = '.jpg' }
    $targetName = 'image-{0:d3}{1}' -f $imageIndex, $extension
    Copy-Item -LiteralPath $entry.File.FullName -Destination (Join-Path $projectFolder $targetName) -Force
    $imagePaths += "../assets/images/design-studio/$slug/$targetName"
  }
  $title = ($group.Name -replace '[\\/]+', ' - ' -replace '[_-]+', ' ').Trim()
  if ([string]::IsNullOrWhiteSpace($title) -or $title -eq 'پروژه‌های طراحی') { $title = 'پروژه طراحی {0:d2}' -f $projectIndex }
  $category = Get-Category $group.Name
  $projects += [ordered]@{
    id = $slug
    title = $title
    category = $category
    summary = Get-Summary $category
    cover = $imagePaths[0]
    images = $imagePaths
  }
}

$json = $projects | ConvertTo-Json -Depth 6 -Compress
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[IO.File]::WriteAllText($dataFile, "window.DESIGN_STUDIO_PROJECTS = $json;", $utf8NoBom)

$manifest = [ordered]@{
  importedAt = (Get-Date).ToString('s')
  source = $Source
  projectCount = $projects.Count
  uniqueImageCount = $uniqueFiles.Count
  duplicateCount = $files.Count - $uniqueFiles.Count
}
[IO.File]::WriteAllText((Join-Path $destination 'import-manifest.json'), ($manifest | ConvertTo-Json), $utf8NoBom)
