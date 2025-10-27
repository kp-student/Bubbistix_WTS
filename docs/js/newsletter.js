// Newsletter subscribe confirmation popup using existing success-popup styling

// Newsletter subscribe confirmation: Prefer Bootstrap toast, fallback to legacy popup
document.addEventListener('DOMContentLoaded', () => {
  const subscribeForm = document.querySelector('.footer-subscribe form');
  if (!subscribeForm) return;

  const canToast = !!(window.bubbistixUI && typeof window.bubbistixUI.showToast === 'function');

  if (canToast) {
    // Use accessible Bootstrap toast for unified feedback
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.bubbistixUI.showToast({
        title: '🎉 You’re in!',
        message: 'Thanks for joining our list — get ready for sweet deals, happy news, and maybe a little sparkle in your inbox soon! ✨💌',
        autohide: true,
        delay: 3000
      });
    });
    return; // Skip legacy popup injection when toast is available
  }

  // Determine correct image path depending on current page location
  const path = window.location.pathname.replace(/\\/g, '/');
  const imgPath = path.includes('/docs/html/')
    ? '../images/strawberry4.png'
    : 'docs/images/strawberry4.png';

  // Fallback: Inject legacy popup markup once when Bootstrap toast is not available
  if (!document.getElementById('subscribePopup')) {
    const popup = document.createElement('div');
    popup.id = 'subscribePopup';
    popup.className = 'success-popup hidden';
    popup.innerHTML = `
      <div class="success-content">
        <h2 class="success-message">🎉 You’re in!</h2>
        <div class="success-image success-image-centered">
          <img src="${imgPath}" alt="Strawberry">
        </div>
        <p class="success-redirect">Thanks for joining our list — get ready for sweet deals, happy news, and maybe a little sparkle in your inbox soon! ✨💌</p>
        <button class="login-btn success-btn" id="subscribeOkBtn">OK, yay! 💕</button>
      </div>
    `;
    document.body.appendChild(popup);

    // Inject scoped styles for larger image and shorter button
    const styleId = 'subscribePopupStyle';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #subscribePopup .success-message { margin-bottom: 0.75rem; }
        #subscribePopup .success-image { height: auto; margin: 0.5rem 0; overflow: visible; }
        #subscribePopup .success-image img { width: 320px; height: auto; }
        #subscribePopup .success-redirect { margin: 0.5rem 0; font-size: 0.95rem; }
        #subscribePopup .success-btn { margin-top: 0.5rem; padding: 0.5rem 1rem; width: auto; }
        @media (max-width: 480px) {
          #subscribePopup .success-image img { width: 280px; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  const popupEl = document.getElementById('subscribePopup');

  // Fallback: Show legacy popup on subscribe
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    popupEl.classList.remove('hidden');
    popupEl.style.display = 'flex';

    const okBtn = document.getElementById('subscribeOkBtn');
    if (okBtn) {
      okBtn.focus();
      okBtn.addEventListener('click', () => {
        popupEl.style.display = 'none';
        popupEl.classList.add('hidden');
      });
    }
  });
});