$source = Join-Path $PSScriptRoot '..\assets\images\design-studio\incoming'
$target = Join-Path $PSScriptRoot '..\assets\images\design-studio\projects'
$groups = [ordered]@{
  '01-sabz-e-aram'     = @('489','490','491','492')
  '02-khat-e-garm'     = @('540','542','546','548')
  '03-ghab-e-siah'     = @('1742','1743','1744','1745','1746','1747','1748','1750','1752','1753','1755','1757','1759','1760','1763','1765','1767','1770','1774','1775','1778','1781')
  '04-lajvardi'        = @('1806','1807','1808','1809','1813','1814','1815')
  '05-khamoosh-e-tala' = @('1819','1820')
  '06-konj-e-kar'      = @('1823')
  '07-ayeeneh-e-narm'  = @('1829','1835','1836')
  '08-khaneh-e-sepid'  = @('1943','1944','1945','1946','1947','1948','1949','1950','1951','1952','1953','1954','1955','1956','1958','1959','1960','1961')
  '09-noor-e-boronz'   = @('2051','2052','2053','2054','2055','2056','2057','2058')
  '10-sabz-e-mah'      = @('2062','2071','2072')
}
New-Item -ItemType Directory -Force -Path $target | Out-Null
foreach ($group in $groups.GetEnumerator()) {
  $folder = Join-Path $target $group.Key
  New-Item -ItemType Directory -Force -Path $folder | Out-Null
  Get-ChildItem -LiteralPath $folder -Filter '*.webp' -File | Remove-Item -Force
  $counter = 1
  foreach ($id in $group.Value) {
    $file = Join-Path $source ("design-$id.webp")
    if (Test-Path -LiteralPath $file) {
      Copy-Item -LiteralPath $file -Destination (Join-Path $folder ('image-{0:D2}.webp' -f $counter)) -Force
      $counter++
    }
  }
}
Write-Output ("Created {0} design projects with {1} images." -f $groups.Count, (Get-ChildItem -LiteralPath $target -Recurse -Filter '*.webp' -File).Count)
