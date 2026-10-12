$source = Join-Path $PSScriptRoot '..\assets\images\kitchen-projects\incoming'
$target = Join-Path $PSScriptRoot '..\assets\images\kitchen-projects\projects'

$projects = [ordered]@{
  '01-farhadi-valiasr'       = @('IMG_3309.JPG','IMG_3310.JPG','IMG_3311.JPG')
  '02-ahmadi-ferdos'         = @('IMG_3312.JPG','IMG_3319.PNG','IMG_3320.PNG','IMG_3321.PNG')
  '03-rostami-parvaz'        = @('IMG_3313.JPG','IMG_3314.PNG','IMG_3322.JPG','IMG_3323.JPG','IMG_3324.JPG')
  '04-karimi-golshahr'       = @('IMG_3315.PNG','IMG_3318.PNG')
  '05-moradi-abresan'        = @('IMG_3316.PNG','IMG_3324.JPG')
  '06-jafari-pastor'         = @('IMG_3325.JPG','IMG_3326.JPG','IMG_3327.JPG','IMG_4693.JPG','IMG_4694.JPG','IMG_4695.JPG','IMG_4696.JPG')
  '07-hosseini-lalezar'      = @('IMG_3328.JPG','IMG_3329.JPG','IMG_4690.JPG','IMG_4691.JPG','IMG_4692.JPG')
  '08-sadeghi-roshdie'       = @('IMG_3330.JPG')
  '09-rahimi-valiasr'        = @('IMG_3331.JPG','IMG_3332.JPG')
  '10-akbari-ferdos'         = @('IMG_3335.JPG','IMG_3337.PNG','IMG_4697.JPG','IMG_4704.JPG','IMG_4705.JPG')
  '11-mahmoudi-parvaz'       = @('IMG_3343.PNG','IMG_3348.PNG','IMG_4706.JPG','IMG_4709.JPG')
  '12-naderi-golshahr'       = @('IMG_3344.PNG','IMG_3345.PNG','IMG_4707.JPG','IMG_4708.JPG')
  '13-tavakoli-abresan'      = @('IMG_3386.JPG','IMG_3387.JPG','IMG_3388.PNG')
  '14-yousefi-pastor'        = @('IMG_3389.JPG','IMG_3390.JPG','IMG_3391.JPG','IMG_3392.JPG','IMG_3393.JPG','IMG_3395.JPG','IMG_3396.JPG','IMG_3397.JPG')
  '15-rezaei-lalezar'        = @('IMG_5240.JPG','IMG_5241.JPG','IMG_5242.JPG','IMG_5243.JPG','IMG_5244.JPG','IMG_5245.JPG','IMG_5246.JPG','IMG_5247.JPG','IMG_5248.JPG')
  '16-gharavi-roshdie'       = @('IMG_5390.JPG','IMG_5391.JPG','IMG_5392.JPG','IMG_5393.JPG','IMG_5394.JPG','IMG_5395.JPG','IMG_5396.JPG')
  '17-ansari-valiasr'        = @('IMG_5403.JPG','IMG_5404.JPG','IMG_5405.JPG','IMG_5406.JPG','IMG_5407.JPG','IMG_5408.JPG','IMG_5409.JPG','IMG_5410.JPG')
  '18-sharifi-ferdos'        = @('IMG_5426.JPG','IMG_5427.JPG','IMG_5428.JPG','IMG_5429.JPG','IMG_5430.JPG')
  '19-soleimani-parvaz'      = @('IMG_5433.JPG','IMG_5434.JPG','IMG_5435.JPG','IMG_5436.JPG','IMG_5437.JPG','IMG_5438.JPG','IMG_5439.JPG')
  '20-mousavi-golshahr'      = @('IMG_5440.JPG','IMG_5441.JPG','IMG_5442.JPG','IMG_5443.JPG','IMG_5444.JPG','IMG_5445.JPG','IMG_5446.JPG')
  '21-ebrahimi-abresan'      = @('IMG_5453.JPG','IMG_5454.JPG','IMG_5455.JPG','IMG_5457.JPG','IMG_5458.JPG','IMG_5459.JPG','IMG_5460.JPG','IMG_5461.JPG')
  '22-fathi-pastor'          = @('IMG_5464.JPG','IMG_5465.JPG','IMG_5466.JPG','IMG_5467.JPG','IMG_5468.JPG','IMG_5469.JPG')
  '23-ghasemi-lalezar'       = @('IMG_5470.JPG','IMG_5471.JPG','IMG_5472.JPG','IMG_5473.JPG','IMG_5474.JPG','IMG_5475.JPG')
  '24-bahrami-roshdie'       = @('IMG_5533.JPG','IMG_5534.JPG','IMG_5535.JPG')
  '25-davoudi-valiasr'       = @('IMG_5545.JPG','IMG_5546.JPG','IMG_5547.JPG','IMG_5548.JPG')
  '26-kazemi-ferdos'         = @('IMG_5549.JPG','IMG_5550.JPG','IMG_5551.JPG','IMG_5552.JPG','IMG_5553.JPG','IMG_5554.JPG')
  '27-amini-parvaz'          = @('IMG_5555.JPG','IMG_5556.JPG','IMG_5557.JPG','IMG_5558.JPG','IMG_5559.JPG','IMG_5560.JPG','IMG_5561.JPG','IMG_5562.JPG','IMG_5563.JPG','IMG_5564.JPG','IMG_5565.JPG','IMG_5566.JPG','IMG_5568.JPG','IMG_5569.JPG','IMG_5570.JPG')
  '28-maleki-golshahr'       = @('IMG_5571.JPG','IMG_5572.JPG','IMG_5573.JPG','IMG_5574.JPG','IMG_5575.JPG','IMG_5576.JPG','IMG_5577.JPG','IMG_5578.JPG','IMG_5579.JPG','IMG_5580.JPG','IMG_5581.JPG','IMG_5582.JPG','IMG_5583.JPG')
  '29-nasiri-abresan'        = @('IMG_5584.JPG','IMG_5585.JPG','IMG_5586.JPG','IMG_5587.JPG','IMG_5588.JPG','IMG_5589.JPG','IMG_5590.JPG','IMG_5591.JPG','IMG_5592.JPG','IMG_5593.JPG','IMG_5594.JPG','IMG_5595.JPG','IMG_5596.JPG','IMG_5597.JPG','IMG_5598.JPG','IMG_5599.JPG','IMG_5600.JPG','IMG_5601.JPG','IMG_5602.JPG','IMG_5603.JPG')
  '30-abbasi-pastor'         = @('IMG_5604.JPG','IMG_5605.JPG','IMG_5606.JPG','IMG_5607.JPG')
  '31-safari-lalezar'        = @('IMG_5608.JPG','IMG_5609.JPG','IMG_5610.JPG','IMG_5611.JPG','IMG_5612.JPG','IMG_5613.JPG','IMG_5614.JPG','IMG_5615.JPG')
  '32-hasani-roshdie'        = @('IMG_5616.JPG','IMG_5617.JPG','IMG_5618.JPG','IMG_5619.JPG','IMG_5620.JPG','IMG_5621.JPG','IMG_5622.JPG')
  '33-mehrabi-valiasr'       = @('IMG_5623.JPG','IMG_5624.JPG','IMG_5625.JPG','IMG_5626.JPG','IMG_5627.JPG','IMG_5628.JPG','IMG_5629.JPG','IMG_5630.JPG','IMG_5631.JPG','IMG_5632.JPG','IMG_5633.JPG','IMG_5634.JPG','IMG_5635.JPG','IMG_5636.JPG','IMG_5637.JPG')
  '34-azizi-ferdos'          = @('IMG_5638.JPG','IMG_5639.JPG')
  '35-alavi-parvaz'          = @('IMG_5678.JPG','IMG_5679.JPG','IMG_5680.JPG','IMG_5681.JPG','IMG_5682.JPG','IMG_5683.JPG','IMG_5684.JPG','IMG_5685.JPG','IMG_5686.JPG','IMG_5687.JPG','IMG_5688.JPG','IMG_5689.JPG','IMG_5690.JPG')
}

New-Item -ItemType Directory -Force -Path $target | Out-Null
foreach ($project in $projects.GetEnumerator()) {
  $folder = Join-Path $target $project.Key
  New-Item -ItemType Directory -Force -Path $folder | Out-Null
  foreach ($name in $project.Value) {
    $file = Join-Path $source $name
    if (Test-Path -LiteralPath $file) { Copy-Item -LiteralPath $file -Destination $folder -Force }
  }
}

Write-Output ("Created {0} grouped project folders." -f $projects.Count)
