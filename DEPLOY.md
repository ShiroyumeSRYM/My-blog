# GitHub 部署指南

## 🚀 部署到 GitHub Pages

### 方法一：使用 GitHub 网页界面（推荐）

1. **创建 GitHub 仓库**
   - 访问 [GitHub](https://github.com)
   - 点击 "New repository"
   - 仓库名称建议：`shiroyume-blog` 或 `shiroyume-portfolio`
   - 选择 Public（公开）
   - 不要初始化 README、.gitignore

2. **上传文件**
   - 在仓库页面点击 "uploading an existing file"
   - 或者直接拖拽所有文件到网页上
   - 重要：确保包含所有文件和文件夹结构

3. **启用 GitHub Pages**
   - 进入仓库的 Settings 页面
   - 找到 "Pages" 选项（左侧菜单）
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main"
   - 主题选择 "No theme"（因为我们有自己的样式）
   - 点击 Save

4. **访问网站**
   - 等待几分钟部署完成
   - 访问：`https://[你的用户名].github.io/[仓库名]`

### 方法二：使用 Git 命令行

1. **安装 Git**（如果未安装）
   ```bash
   # Windows: https://git-scm.com/download/win
   # Mac: https://git-scm.com/download/mac
   # Linux: sudo apt install git
   ```

2. **配置 Git**
   ```bash
   git config --global user.name "你的姓名"
   git config --global user.email "你的邮箱"
   ```

3. **初始化仓库**
   ```bash
   cd "d:/工程/Code/my blog"
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. **连接 GitHub**
   ```bash
   git remote add origin https://github.com/[用户名]/[仓库名].git
   git branch -M main
   git push -u origin main
   ```

5. **启用 Pages**
   - 在 GitHub 仓库 Settings 中启用 Pages
   - 选择 main 分支作为源

### 方法三：使用 GitHub Desktop（推荐新手）

1. **下载 GitHub Desktop**
   - 访问：https://desktop.github.com/

2. **创建仓库**
   - File → New Repository
   - 输入仓库名称
   - 选择本地路径：`d:/工程/Code/my blog`

3. **提交和推送**
   - 在左侧面板中填写提交信息
   - 点击 "Commit to main"
   - 点击 "Publish repository"

4. **启用 Pages**
   - 在 GitHub 网页版启用 Pages

## 📁 部署前检查清单

### ✅ 必需文件
- [x] `index.html` - 主页面
- [x] `popup.json` - 作品数据
- [x] `css/style.css` - 主样式
- [x] `css/responsive.css` - 响应式样式
- [x] `js/script.js` - 主逻辑
- [x] `js/ip-detection.js` - IP检测

### ✅ 资源文件
- [x] `assets/images/avatar-placeholder.jpg`
- [x] 实际头像图片（可选）：`assets/images/avatar.jpg`
- [x] 背景图片（可选）：`assets/images/background.jpg`

### ✅ 文档文件
- [x] `README.md` - 项目说明
- [x] `docs/JSON_GUIDE.md` - JSON编辑指南
- [x] `docs/CODEBUDDY.md` - 开发指南

### 🔧 配置检查
- [x] 所有链接指向正确文件
- [x] 图片路径正确
- [x] 社交媒体链接有效
- [x] JSON 格式有效

## 🌐 访问地址

部署成功后，你的网站将可以通过以下地址访问：

```
https://[你的GitHub用户名].github.io/[仓库名]/
```

例如：
```
https://shiroyume.github.io/shiroyume-blog/
```

## 🔄 更新网站

### 添加新作品
1. 编辑 `popup.json` 文件
2. 使用 Git 提交更改：
   ```bash
   git add popup.json
   git commit -m "添加新作品：[作品名称]"
   git push
   ```
3. 等待 1-2 分钟自动重新部署

### 其他更新
所有文件更改都会自动触发 GitHub Pages 重新部署！

## ⚠️ 注意事项

1. **文件路径**：确保所有文件路径都是相对路径
2. **大小限制**：GitHub Pages 仓库限制为 1GB
3. **自定义域名**：如需自定义域名，在 Pages 设置中配置
4. **HTTPS**：GitHub Pages 自动提供 HTTPS 支持

## 🎉 部署成功标志

- [ ] 页面正常加载
- [ ] 样式显示正确
- [ ] 头像显示（如果有）
- [ ] 作品列表弹窗正常
- [ ] 语言切换工作
- [ ] 移动端响应式正常
- [ ] 社交媒体链接有效

## 🆘 故障排除

### 常见问题
1. **404 错误**：检查文件名和路径
2. **样式丢失**：检查 CSS 文件路径
3. **JavaScript 错误**：检查浏览器控制台
4. **部署失败**：检查 .gitignore 文件是否排除重要文件

### 调试方法
1. 使用浏览器开发者工具检查网络请求
2. 查看 GitHub Pages 构建日志
3. 在本地确保所有功能正常

## 📞 获取帮助

如遇到问题：
- GitHub 官方文档：https://docs.github.com/en/pages
- GitHub 支持：https://support.github.com