# DhikrShare Web Pages

This repository hosts the web pages for DhikrShare app's deep linking and friend request functionality.

## 🌐 Live Site
- **Main Site**: https://yourusername.github.io/dhikrshare-web
- **Friend Request**: https://yourusername.github.io/dhikrshare-web/friend-request.html?uid=USER_ID&name=USER_NAME

## 📁 Repository Structure
```
dhikrshare-web/
├── .github/workflows/deploy.yml  # GitHub Actions deployment
├── index.html                    # Main landing page
├── friend-request.html          # Friend request page
├── assets/
│   ├── css/style.css           # Styles
│   └── js/app.js              # JavaScript functionality
└── README.md                   # This file
```

## 🚀 Features
- **Responsive Design**: Works on all devices
- **Deep Linking**: Automatically opens the mobile app
- **Fallback Support**: Shows download links if app not installed
- **Social Sharing**: Optimized for social media sharing
- **Auto-deployment**: Uses GitHub Actions for automatic deployment

## 🛠️ Setup Instructions

### 1. Create Repository
1. Create a new repository on GitHub named `dhikrshare-web`
2. Make it public
3. Clone to your local machine

### 2. Add Files
Copy all the files from this structure into your repository:
- `.github/workflows/deploy.yml`
- `index.html`
- `friend-request.html`
- `assets/css/style.css`
- `assets/js/app.js`
- `README.md`

### 3. Configure GitHub Pages
1. Go to repository Settings → Pages
2. Source: Select "GitHub Actions"
3. Save settings

### 4. Update Configuration
Edit the following files with your app details:

**In `assets/js/app.js`:**
```javascript
const APP_CONFIG = {
    scheme: 'dhikrShare', // Your app's URL scheme
    playStoreUrl: 'https://play.google.com/store/apps/details?id=YOUR_ACTUAL_PACKAGE_NAME',
    appStoreUrl: 'https://apps.apple.com/app/YOUR_ACTUAL_APP_ID',
    fallbackDelay: 2500
};
```

**In HTML files:**
- Replace `YOUR_PACKAGE_NAME` with your actual package name
- Replace `YOUR_APP_ID` with your actual App Store ID

### 5. Deploy
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

GitHub Actions will automatically deploy your site!

## 📱 Flutter Integration

Add this to your Flutter app's dependencies:
```yaml
dependencies:
  url_launcher: ^6.2.1
  share_plus: ^7.2.1
```

Use the updated `AppLinkHandler` class in your Flutter app to generate and share friend request links.

## 🔗 URL Parameters

The friend request page accepts these parameters:
- `uid`: User ID of the person sending the request
- `name`: Display name of the person sending the request

Example:
```
https://yourusername.github.io/dhikrshare-web/friend-request.html?uid=user123&name=Ahmed
```

## 🎨 Customization

### Colors
Edit `assets/css/style.css` to change the color scheme:
- Primary gradient: `#667eea` to `#764ba2`
- Accent color: `#ffd700`
- Success color: `#4CAF50`

### App Scheme
Update the URL scheme in `assets/js/app.js`:
```javascript
const APP_CONFIG = {
    scheme: 'yourAppScheme' // Change this
};
```

### Store Links
Update store URLs with your actual app links.

## 📊 Analytics (Optional)

To add Google Analytics, add this to the `<head>` section of your HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🔧 Development

To test locally:
1. Install a local server (e.g., `live-server`)
2. Run: `npx live-server`
3. Open: `http://localhost:8080`

## 🚀 Deployment

The site auto-deploys when you push to the main branch. Check the Actions tab for deployment status.

## 🌟 Advanced Features

### PWA Support (Optional)
Add a service worker for offline functionality:

1. Create `sw.js` in the root directory
2. Add PWA manifest
3. Update the service worker registration in `app.js`

### Custom Domain (Optional)
1. Add a `CNAME` file with your domain
2. Configure your domain's DNS to point to GitHub Pages

## 📞 Support

For issues with:
- **Web pages**: Create an issue in this repository
- **Mobile app**: Contact through your app's support channels

## 📄 License

This project is licensed under the MIT License.