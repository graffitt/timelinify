echo off
echo previous versions:
git tag
echo.
set /P new_version=enter new version: 
echo version changed to - %new_version%
npm version %new_version% --no-git-tag-version