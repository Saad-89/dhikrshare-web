// App configuration
const APP_CONFIG = {
    scheme: 'dhikrShare',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME',
    appStoreUrl: 'https://apps.apple.com/app/YOUR_APP_ID',
    fallbackDelay: 2500 // Delay before showing fallback message
};

// Utility functions
function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    return {
        uid: params.get('uid') || '',
        name: params.get('name') || 'Someone'
    };
}

function updatePageTitle(name) {
    document.title = `${name} wants to be your friend! - DhikrShare`;
    
    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', `${name} wants to be your friend on DhikrShare!`);
    }
}

function showStatus(message, type = 'loading') {
    const statusEl = document.getElementById('status');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.className = `status-message show ${type}`;
    }
}

function hideStatus() {
    const statusEl = document.getElementById('status');
    if (statusEl) {
        statusEl.className = 'status-message';
    }
}

function detectMobileOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/android/i.test(userAgent)) {
        return 'android';
    }
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios';
    }
    
    return 'unknown';
}

function createDeepLink(uid, name) {
    const encodedName = encodeURIComponent(name);
    return `${APP_CONFIG.scheme}://friend-request?uid=${uid}&name=${encodedName}`;
}

function tryOpenApp(deepLink) {
    // Create a hidden iframe to attempt deep link
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = deepLink;
    document.body.appendChild(iframe);
    
    // Clean up iframe after a short delay
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 1000);
    
    // Also try direct navigation
    window.location.href = deepLink;
}

function openAppStore() {
    const os = detectMobileOS();
    let storeUrl;
    
    switch (os) {
        case 'android':
            storeUrl = APP_CONFIG.playStoreUrl;
            break;
        case 'ios':
            storeUrl = APP_CONFIG.appStoreUrl;
            break;
        default:
            storeUrl = APP_CONFIG.playStoreUrl; // Default to Play Store
    }
    
    window.open(storeUrl, '_blank');
}

function openApp() {
    const params = getUrlParameters();
    const deepLink = createDeepLink(params.uid, params.name);
    
    showStatus('Opening app...', 'loading');
    
    // Try to open the app
    tryOpenApp(deepLink);
    
    // Set a timer to show fallback message
    const fallbackTimer = setTimeout(() => {
        showStatus(
            "App didn't open? Make sure you have DhikrShare installed, or download it from the buttons below.",
            'error'
        );
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideStatus();
        }, 5000);
        
    }, APP_CONFIG.fallbackDelay);
    
    // Listen for page visibility change (app successfully opened)
    const handleVisibilityChange = () => {
        if (document.hidden) {
            clearTimeout(fallbackTimer);
            showStatus('App opened successfully!', 'success');
            
            setTimeout(() => {
                hideStatus();
            }, 2000);
        }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange, { once: true });
    
    // Clean up event listener after delay
    setTimeout(() => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, APP_CONFIG.fallbackDelay + 1000);
}

function initializeFriendRequest() {
    const params = getUrlParameters();
    
    // Update friend name in the UI
    const friendNameEl = document.getElementById('friend-name');
    if (friendNameEl) {
        friendNameEl.textContent = params.name;
    }
    
    // Update page title
    updatePageTitle(params.name);
    
    // Auto-try to open the app after a short delay (for better UX)
    setTimeout(() => {
        openApp();
    }, 1000);
}

// Analytics and tracking (optional)
function trackEvent(eventName, parameters = {}) {
    // Add your analytics tracking here
    console.log('Event:', eventName, parameters);
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Initialize page based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Track page view
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
    
    // Add click tracking to download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const store = this.classList.contains('android') ? 'google_play' : 'app_store';
            trackEvent('download_click', {
                store: store,
                source: 'landing_page'
            });
        });
    });
});

// Global function for opening app (called from HTML)
window.openApp = openApp;
window.openAppStore = openAppStore;

// Handle back button navigation
window.addEventListener('popstate', function(event) {
    // Handle navigation if needed
    console.log('Navigation detected');
});

// Service Worker registration (optional, for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}