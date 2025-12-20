# GitHub 快速设置指南

## 🎯 一键部署脚本

### Windows 用户
```batch
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
```

### Mac/Linux 用户
```bash
#!/bin/bash

echo "🚀 GitHub 部署向导"
echo "===================="
echo ""

read -p "请输入你的 GitHub 用户名: " username
read -p "请输入仓库名称 (建议: shiroyume-blog): " reponame
read -p "请输入你的邮箱: " email

if [ -z "$username" ]; then
    echo "❌ 用户名不能为空"
    exit 1
fi

if [ -z "$reponame" ]; then
    reponame="shiroyume-blog"
fi

if [ -z "$email" ]; then
    echo "❌ 邮箱不能为空"
    exit 1
fi

echo ""
echo "📝 配置 Git..."
git config --global user.name "シロユメ_Shiroyume"
git config --global user.email "$email"

echo ""
echo "🔧 初始化 Git 仓库..."
git init
git add .
git commit -m "Initial commit: シロユメ_Shiroyume personal blog"

echo ""
echo "🌐 连接到 GitHub..."
git remote add origin "https://github.com/$username/$reponame.git"
git branch -M main

echo ""
echo "📤 推送到 GitHub..."
git push -u origin main

echo ""
echo "✅ 推送完成！"
echo ""
echo "🌍 下一步："
echo "1. 访问 https://github.com/$username/$reponame"
echo "2. 进入 Settings → Pages"
echo "3. 启用 GitHub Pages"
echo "4. 几分钟后访问: https://$username.github.io/$reponame/"
```

## 🎨 自定义仓库名

### 推荐的仓库名
- `shiroyume-blog` - 个人博客
- `shiroyume-portfolio` - 作品集
- `shiroyume-music` - 音乐作品
- `shiroyume-vocaloid` - VOCALOID 作品

### 域名规划

如果计划使用自定义域名，建议仓库名与域名相关：
- 域名 `shiroyume.com` → 仓库 `shiroyume-com`
- 域名 `shiroyume.dev` → 仓库 `shiroyume-dev`

## 🔄 使用方法

1. **保存脚本**：
   - Windows: 保存为 `deploy.bat`
   - Mac/Linux: 保存为 `deploy.sh`

2. **设置权限**（仅限 Mac/Linux）：
   ```bash
   chmod +x deploy.sh
   ```

3. **运行脚本**：
   - Windows: 双击 `deploy.bat`
   - Mac/Linux: `./deploy.sh`

4. **按提示操作**：
   - 输入 GitHub 信息
   - 等待推送完成
   - 在 GitHub 中启用 Pages

## ⚠️ 注意事项

1. **网络连接**：确保网络连接正常
2. **Git 安装**：确认系统已安装 Git
3. **GitHub 账号**：确认有 GitHub 账号权限
4. **文件完整性**：确认所有必要文件存在

## 🎉 部署成功

完成！你的个人博客现在应该在线上运行了！🌟