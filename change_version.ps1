# list previous versions
Write-Output 'previous versions:'
git tag

# get version from user input
$version = Read-Host -Prompt 'enter new version'

# Cargo.toml
$c_toml = [string]::Join("`n", (Get-Content Cargo.toml))

# get previous version
$c_toml -match '\nversion.*?"([^"]+)"' | Out-Null
$c_toml_prev_version = $Matches.1

[regex]::Replace($c_toml, '\nversion.*?"([^"]+)"', "`nversion = `"$version`"") |
Set-Content Cargo.toml -NoNewline

# get project name from Cargo.toml
$c_toml -match 'name.*?"(?<name>[^"]+)"' | Out-Null
$proj_name = $Matches.name

# Cargo.lock
$c_lock = [string]::Join("`n", (Get-Content Cargo.lock))
[regex]::Replace($c_lock, "name.*`"($proj_name)`"\nversion.*?`"([^`"]+)`"", "name = `"$`1`"`nversion = `"$version`"") |
Set-Content Cargo.lock -NoNewline

# write version change
Write-Output "$c_toml_prev_version -> $version"

# npm
npm version $version --no-git-tag-version | Out-Null