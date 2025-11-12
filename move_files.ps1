# PowerShell script to move files to new frontend/backend structure

# Create necessary directories
$frontendDirs = @(
    "frontend/app",
    "frontend/components",
    "frontend/lib",
    "frontend/styles",
    "frontend/public",
    "backend/src/controllers",
    "backend/src/routes",
    "backend/src/models",
    "backend/src/middleware",
    "backend/src/config"
)

foreach ($dir in $frontendDirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

# Move frontend files
$frontendFiles = @{
    "app" = @("app\*")
    "components" = @("components\*")
    "lib" = @("lib\*")
    "styles" = @("styles\*")
}

foreach ($target in $frontendFiles.Keys) {
    $source = $frontendFiles[$target]
    foreach ($src in $source) {
        if (Test-Path $src) {
            Write-Host "Moving $src to frontend/$target/"
            Move-Item -Path $src -Destination "frontend/$target/" -Force
        }
    }
}

# Move public files if they exist
if (Test-Path "public") {
    Move-Item -Path "public\*" -Destination "frontend/public/" -Force
}

# Move package.json and other config files to frontend
$configFiles = @("package.json", "package-lock.json", "tsconfig.json", "next.config.js", "postcss.config.js", "tailwind.config.js", "eslint.config.js")
foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination "frontend/" -Force
    }
}

Write-Host "File movement complete. Please review the new structure and update any paths as needed."
