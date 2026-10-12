$root = Join-Path $PSScriptRoot '..\assets\images\store\plaster\projects'
$root = [System.IO.Path]::GetFullPath($root)
$destination = Join-Path $root '20-products-workshop'
$sources = @('04-rostami','05-moradi','06-hosseini','07-jafari','14-rezaei','18-mousavi')

New-Item -ItemType Directory -Force -Path $destination | Out-Null
Get-ChildItem -LiteralPath $destination -Filter '*.webp' -File | Remove-Item -Force
$counter = 1
foreach ($name in $sources) {
  $source = Join-Path $root $name
  if (-not ([System.IO.Path]::GetFullPath($source).StartsWith($root))) { throw "Unsafe source path" }
  foreach ($image in Get-ChildItem -LiteralPath $source -Filter '*.webp' -File | Sort-Object Name) {
    $target = Join-Path $destination ('image-{0:D2}.webp' -f $counter)
    Copy-Item -LiteralPath $image.FullName -Destination $target -Force
    $counter++
  }
}

if ((Get-ChildItem -LiteralPath $destination -Filter '*.webp' -File).Count -ne 27) {
  throw "Consolidation verification failed"
}

foreach ($name in $sources) {
  $source = Join-Path $root $name
  if ([System.IO.Path]::GetFullPath($source).StartsWith($root) -and (Test-Path -LiteralPath $source)) {
    Remove-Item -LiteralPath $source -Recurse -Force
  }
}
Write-Output 'Consolidated 27 workshop and product images into one folder.'
