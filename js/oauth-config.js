// OAuth Configuration
// Replace these with your actual OAuth credentials from Google and Facebook Developer Consoles

const OAUTH_CONFIG = {
  google: {
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    // Get your Google OAuth Client ID from: https://console.cloud.google.com/
    redirectUri: window.location.origin + '/oauth-callback.html',
    scope: 'email profile'
  },
  
  facebook: {
    appId: '1234567890', // Replace with your Facebook App ID
    // Get your Facebook App ID from: https://developers.facebook.com/apps/
    version: 'v18.0'
  }
};

// Initialize Google Sign-In (if using Google Identity Services)
function initializeGoogleSignIn() {
  if (typeof google !== 'undefined' && google.accounts) {
    google.accounts.id.initialize({
      client_id: OAUTH_CONFIG.google.clientId,
      callback: handleGoogleCallback
    });
  }
}

// Handle Google OAuth callback
function handleGoogleCallback(response) {
  // Decode JWT token from Google
  const userInfo = parseJwt(response.credential);
  
  const googleUser = {
    email: userInfo.email,
    name: userInfo.name,
    picture: userInfo.picture,
    provider: 'google',
    googleId: userInfo.sub
  };
  
  // Process the authentication
  if (window.handleSocialSignup) {
    handleSocialSignup(googleUser);
  } else if (window.attemptSocialLogin) {
    attemptSocialLogin(googleUser);
  }
}

// Parse JWT token
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error parsing JWT:', e);
    return null;
  }
}

// Initialize Facebook SDK
function initializeFacebookSDK() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : OAUTH_CONFIG.facebook.appId,
      cookie     : true,
      xfbml      : true,
      version    : OAUTH_CONFIG.facebook.version
    });
  };
}

// Load Facebook SDK
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Auto-initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeFacebookSDK();
  });
} else {
  initializeFacebookSDK();
}
