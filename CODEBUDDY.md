# CODEBUDDY.md This file provides guidance to CodeBuddy Code when working with code in this repository.

## Project Overview

This is a personal portfolio/blog website for シロユメ_Shiroyume with a Windows 10-style glassmorphism UI design. The site showcases music works, supports multiple languages, and automatically detects user location for language preference.

## Architecture

### Core Structure
- **Static Site**: Pure HTML/CSS/JavaScript with no build process required
- **Multi-language Support**: Chinese (default), Japanese, English with IP-based auto-detection
- **Responsive Design**: Mobile-first approach with dedicated responsive.css
- **Content Management**: JSON-driven works list via popup.json

### Key Components
- **index.html**: Main page with semantic HTML5 structure
- **css/style.css**: Main styles with glassmorphism effects and animations
- **css/responsive.css**: Media queries for mobile/tablet/desktop layouts
- **js/script.js**: Core functionality including modal system, platform switching, language management
- **js/ip-detection.js**: Geographic location detection and automatic language setting
- **popup.json**: Works database with platform-specific links

### Content Management System
Works are managed through `popup.json` with this structure:
```json
{
  "works": [
    {
      "id": "unique-id",
      "title": "Work Title",
      "time": "YYYY-MM-DD",
      "displayTime": "Localized date string",
      "description": "Work description",
      "platforms": [
        {
          "name": "platform-name",
          "url": "platform-url",
          "title": "Display title",
          "icon": "font-awesome-icon-class"
        }
      ]
    }
  ]
}
```

## Development Commands

### Local Development
```bash
# Method 1: Using Node.js http-server (recommended)
npx http-server

# Method 2: Using Python 3
python -m http.server

# Method 3: Using Python 2
python -m SimpleHTTPServer

# Method 4: Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

### Deployment
```bash
# Windows - Interactive deployment
.\deploy.bat

# Mac/Linux - Interactive deployment  
./deploy.sh

# Manual git commands
git add .
git commit -m "Update message"
git push
```

### Testing JSON Changes
After editing `popup.json`, test locally by:
1. Opening browser developer tools
2. Checking console for JSON parsing errors
3. Verifying modal displays correctly with new content

## Key Technical Details

### Language System
- **Detection Flow**: localStorage → IP detection → default (Chinese)
- **API**: Uses ipapi.co for geolocation
- **Implementation**: Uses `data-lang-key` attributes with translation object in script.js
- **Persistence**: Saves preference to localStorage

### Modal System
- **Triggers**: "查看所有作品" button or programmatic calls
- **Loading**: Dynamic JSON loading with fallback for local file:// protocol
- **Error Handling**: Graceful degradation with manual instructions
- **Accessibility**: ESC key, overlay click, proper focus management

### Platform Switching
- **Supported Platforms**: Bilibili, YouTube, Netease Cloud Music
- **Default Display**: Bilibili for Chinese users, YouTube for others
- **Content**: Embedded iframes in platform-specific divs

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## Customization Guidelines

### Adding New Works
1. Edit `popup.json` following the established structure
2. Add work object with unique `id`
3. Include all relevant platform links
4. Use proper date format (`YYYY-MM-DD`)

### Modifying Languages
1. Add translations to the `translations` object in `js/script.js`
2. Update `data-lang-key` attributes in HTML
3. Test language switching functionality

### Styling Changes
- **Glass Effect**: Modify `backdrop-filter` and rgba backgrounds in style.css
- **Typography**: Google Fonts (M PLUS Rounded 1c) loaded in HTML head
- **Icons**: Font Awesome 6.4.0 via CDN
- **Colors**: CSS custom properties at top of style.css

### Social Links
Edit social media links in `index.html` around lines 51-63. Each link uses Font Awesome icons in the social-links section.

## File Dependencies

### External Resources
- Google Fonts: M PLUS Rounded 1c font family
- Font Awesome: 6.4.0 CSS via CDN
- IP Detection API: ipapi.co/json/

### Asset Structure
```
assets/
├── images/
│   ├── avatar-placeholder.jpg (fallback)
│   └── avatar.jpg (primary, optional)
```

## Common Issues & Solutions

### JSON Loading Fails
- Local files require server due to CORS restrictions
- Use `npx http-server` or VS Code Live Server
- Check JSON syntax with online validator

### Language Detection Not Working
- Check network connectivity to ipapi.co
- Verify localStorage isn't blocked
- Test manual language switching

### Mobile Responsive Issues
- Test with browser dev tools device emulation
- Check viewport meta tag in HTML head
- Verify responsive.css is loaded

## Deployment Notes

### GitHub Pages
- Automatic deployment on push to main branch
- Enable in repository Settings → Pages
- Deployed URL: `https://username.github.io/reponame/`

### Custom Domains
- Add CNAME file to root directory
- Update DNS settings as needed
- HTTPS automatically supported

### Performance Optimization
- Images are served from GitHub CDN
- CSS and JS are unminified (static site)
- Consider adding Gzip compression if needed