// Cookie / tracking consent banner for guyrolandsterling.com
// Gates Google Analytics (via Consent Mode v2) and Meta Pixel until the visitor accepts.
// Choice is remembered in localStorage so the banner doesn't reappear every visit.

(function () {
  var STORAGE_KEY = 'grs-consent';

  function getStoredConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // localStorage unavailable (private browsing, etc.) — consent just won't persist across visits
    }
  }

  function grantConsent() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
    loadMetaPixel();
  }

  function loadMetaPixel() {
    var pixelId = window.metaPixelId;
    if (!pixelId || pixelId === 'PIXEL_ID_PLACEHOLDER' || window.fbPixelLoaded) return;
    window.fbPixelLoaded = true;

    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', pixelId);
    fbq('track', 'PageView');
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.id = 'grs-consent-banner';
    banner.style.cssText = [
      'position:fixed', 'left:0', 'right:0', 'bottom:0', 'z-index:9999',
      'background:#14100a', 'border-top:1px solid #cda85e',
      'color:#e6d9b8', 'font-family:Georgia, serif', 'font-size:14px',
      'padding:16px 20px', 'display:flex', 'flex-wrap:wrap', 'align-items:center',
      'justify-content:center', 'gap:14px', 'box-shadow:0 -4px 16px rgba(0,0,0,0.4)'
    ].join(';');

    var text = document.createElement('span');
    text.style.cssText = 'max-width:560px; line-height:1.5; text-align:center;';
    text.innerHTML = 'This site uses cookies for analytics and to measure how ads perform. You can accept or decline — either way, the music still plays.';

    var btnRow = document.createElement('span');
    btnRow.style.cssText = 'display:flex; gap:10px; flex-shrink:0;';

    var acceptBtn = document.createElement('button');
    acceptBtn.textContent = 'Accept';
    acceptBtn.style.cssText = [
      'background:#cda85e', 'color:#14100a', 'border:none', 'padding:9px 20px',
      'border-radius:4px', 'font-family:Georgia, serif', 'font-weight:bold',
      'cursor:pointer', 'letter-spacing:0.5px'
    ].join(';');

    var declineBtn = document.createElement('button');
    declineBtn.textContent = 'Decline';
    declineBtn.style.cssText = [
      'background:transparent', 'color:#e6d9b8', 'border:1px solid #6b6252',
      'padding:9px 20px', 'border-radius:4px', 'font-family:Georgia, serif',
      'cursor:pointer', 'letter-spacing:0.5px'
    ].join(';');

    acceptBtn.addEventListener('click', function () {
      storeConsent('granted');
      grantConsent();
      banner.remove();
    });

    declineBtn.addEventListener('click', function () {
      storeConsent('denied');
      banner.remove();
    });

    btnRow.appendChild(declineBtn);
    btnRow.appendChild(acceptBtn);
    banner.appendChild(text);
    banner.appendChild(btnRow);
    document.body.appendChild(banner);
  }

  function init() {
    var existing = getStoredConsent();
    if (existing === 'granted') {
      grantConsent();
      return;
    }
    if (existing === 'denied') {
      return; // respect prior decline, don't re-prompt
    }
    buildBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
