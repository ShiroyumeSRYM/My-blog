@echo off
echo 🚀 GitHub 部署向导
echo ====================
echo.
set /p username=请输入你的 GitHub 用户名: 
set /p reponame=请输入仓库名称 (建议: shiroyume-blog): 
set /p email=请输入你的邮箱: 

if "%username%"=="" (
    echo ❌ 用户名不能为空
    pause
    exit /b 1
)

if "%reponame%"=="" set reponame=shiroyume-blog
if "%email%"=="" (
    echo ❌ 邮箱不能为空
    pause
    exit /b 1
)

echo.
echo 📝 配置 Git...
git config --global user.name "シロユメ_Shiroyume"
git config --global user.email "%email%"

echo.
echo 🔧 初始化 Git 仓库...
git init
git add .
git commit -m "Initial commit: シロユメ_Shiroyume personal blog"

echo.
echo 🌐 连接到 GitHub...
git remote add origin https://github.com/%username%/%reponame%.git
git branch -M main

echo.
echo 📤 推送到 GitHub...
git push -u origin main

echo.
echo ✅ 推送完成！
echo.
echo 🌍 下一步：
echo 1. 访问 https://github.com/%username%/%reponame%
echo 2. 进入 Settings → Pages
echo 3. 启用 GitHub Pages
echo 4. 几分钟后访问: https://%username%.github.io/%reponame%/
echo.
pause