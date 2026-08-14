$source = "c:\Users\venka\Projects\WhiteLabelMovingFleet"
$base = "c:\Users\venka\Projects\WhiteLabelMovingFleet\output"

$variants = @("throne", "franchise", "heritage", "hybrid")
$port = 5200

foreach ($v in $variants) {
  $target = "$base\mock-$v"
  
  # Copy config files
  Copy-Item "$source\src\config\brand.$v.ts" "$target\src\config\brand.ts" -Force
  Copy-Item "$source\src\config\variants.$v.json" "$target\src\config\variants.json" -Force
  Copy-Item "$source\src\data\mockData.barbershop.ts" "$target\src\data\mockData.ts" -Force
  
  Write-Host "Configured variant $v"
}
