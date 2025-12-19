@echo off
echo Pushing Frontend Changes to GitHub...
git add .
git commit -m "Update API URL for production backend"
git push origin main
pause