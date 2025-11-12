# PowerShell script to move frontend files to frontend directory

# Create necessary frontend directories
$frontendDirs = @(
    "frontend/app",
    "frontend/components",
    "frontend/lib",
    "frontend/styles",
    "frontend/public"
)

foreach ($dir in $frontendDirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

# Move frontend files to their new locations
$moves = @{
    "app" = @("app/*")
    "components" = @("components/*")
    "lib" = @("lib/*")
    "styles" = @("styles/*")
    "public" = @("public/*")
}

foreach ($target in $moves.Keys) {
    $source = $moves[$target]
    foreach ($src in $source) {
        if (Test-Path $src) {
            Write-Host "Moving $src to frontend/$target/"
            Move-Item -Path $src -Destination "frontend/$target/" -Force
        }
    }
}

# Move root config files to frontend
$configFiles = @(
    "next.config.js",
    "postcss.config.js",
    "tailwind.config.js",
    "tsconfig.json",
    "package.json",
    "package-lock.json",
    "eslint.config.js"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "Moving $file to frontend/"
        Move-Item -Path $file -Destination "frontend/" -Force
    }
}

# Update Next.js configuration if it exists
$nextConfigPath = "frontend/next.config.js"
if (Test-Path $nextConfigPath) {
    $nextConfig = Get-Content -Path $nextConfigPath -Raw
    # Update any paths that might need adjustment
    $nextConfig = $nextConfig -replace "app/", "frontend/app/"
    $nextConfig | Set-Content -Path $nextConfigPath
}

Write-Host "Frontend files have been moved to the frontend directory."
Write-Host "Please update your development scripts to run from the frontend directory."
Write-Host "Example: cd frontend && npm run dev"
