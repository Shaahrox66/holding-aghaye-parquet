$root = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\assets\images\store\plaster\projects'))
$renames = [ordered]@{
  '01-farhadi'='01-sepidar'; '02-ahmadi'='02-taj-sefid'; '03-karimi'='03-khat-aram';
  '08-rahimi'='08-zarrin-ghab'; '09-akbari'='09-naghshe-aftab'; '10-sadeghi'='10-hendese-sefid';
  '11-naderi'='11-golbarg'; '12-tavakoli'='12-ritme-amoodi'; '13-yousefi'='13-sotoune-roshan';
  '15-ansari'='15-shokouh'; '16-sharifi'='16-hashie-noor'; '17-soleimani'='17-marja-classic';
  '19-ebrahimi'='19-talare-roshan'
}
foreach ($item in $renames.GetEnumerator()) {
  $source = Join-Path $root $item.Key
  $destination = Join-Path $root $item.Value
  if (-not ([System.IO.Path]::GetFullPath($source).StartsWith($root))) { throw 'Unsafe path' }
  if ((Test-Path -LiteralPath $source) -and -not (Test-Path -LiteralPath $destination)) {
    Move-Item -LiteralPath $source -Destination $destination
  }
}
Write-Output 'Renamed plaster project folders without family names.'
