(function () {
  var style = document.createElement('style');
  style.textContent =
    '.back-to-top{position:fixed;right:26px;bottom:26px;z-index:45;' +
    'width:44px;height:44px;border-radius:50%;background:#cda85e;color:#14100a;' +
    'border:none;display:flex;align-items:center;justify-content:center;' +
    'font-size:20px;line-height:1;cursor:pointer;font-family:\'Cinzel\',serif;' +
    'opacity:0;visibility:hidden;transform:translateY(10px);' +
    'transition:opacity .3s ease,transform .3s ease,background .25s ease;' +
    'box-shadow:0 4px 14px rgba(0,0,0,.4);}' +
    '.back-to-top.visible{opacity:1;visibility:visible;transform:translateY(0);}' +
    '.back-to-top:hover{background:#e6d9b8;}' +
    '@media (max-width:720px){.back-to-top{right:16px;bottom:16px;width:40px;height:40px;font-size:18px;}}';
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.id = 'backToTop';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.setAttribute('title', 'Back to top');
  btn.innerHTML = '&#8593;';
  document.body.appendChild(btn);

  var dockTarget = document.querySelector('footer, .story-end');

  function toggleVisibility() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight < 200) {
      btn.classList.remove('visible');
      return;
    }
    var scrolled = window.scrollY / docHeight;
    btn.classList.toggle('visible', scrolled > 0.28);
  }

  function positionButton() {
    if (!dockTarget) return;
    var targetTop = dockTarget.getBoundingClientRect().top + window.scrollY;
    var nearTarget = (window.scrollY + window.innerHeight) > (targetTop - 10);
    if (nearTarget) {
      btn.style.position = 'absolute';
      btn.style.top = (targetTop - 64) + 'px';
      btn.style.bottom = 'auto';
    } else {
      btn.style.position = 'fixed';
      btn.style.top = 'auto';
      btn.style.bottom = '';
    }
  }

  function onScroll() {
    toggleVisibility();
    positionButton();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', positionButton);
  onScroll();

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
