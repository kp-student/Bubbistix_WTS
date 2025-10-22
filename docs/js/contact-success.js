// Contact success confirmation popup using existing success-popup styling

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('section.contact form');
  if (!contactForm) return;

  // Determine correct image path depending on current page location
  const path = window.location.pathname.replace(/\\/g, '/');
  const imgPath = path.includes('/docs/html/')
    ? '../images/strawberry5.png'
    : 'docs/images/strawberry5.png';

  // Inject popup markup once
  if (!document.getElementById('contactPopup')) {
    const popup = document.createElement('div');
    popup.id = 'contactPopup';
    popup.className = 'success-popup hidden';
    popup.innerHTML = `
      <div class="success-content">
        <h2 class="success-message">🎉 Message sent!</h2>
        <div class="success-image success-image-centered">
          <img src="${imgPath}" alt="Strawberry">
        </div>
        <p class="success-redirect">Thanks for reaching out — your note is on its way to our inbox 💌</p>
        <button class="login-btn success-btn" id="contactOkBtn">OK, yay! 💕</button>
      </div>
    `;
    document.body.appendChild(popup);

    // Inject scoped styles to match newsletter popup sizing
    const styleId = 'contactPopupStyle';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #contactPopup .success-message { margin-bottom: 0.75rem; }
        #contactPopup .success-image { height: auto; margin: 0.5rem 0; overflow: visible; display: flex; justify-content: center; align-items: center; text-align: center; }
        #contactPopup .success-image img { width: 360px; height: auto; display: block; margin: 0 auto; }
        #contactPopup .success-redirect { margin: 0.5rem 0; font-size: 0.95rem; }
        #contactPopup .success-btn { margin-top: 0.5rem; padding: 0.5rem 1rem; width: auto; }
        @media (max-width: 480px) {
          #contactPopup .success-image img { width: 310px; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  const popupEl = document.getElementById('contactPopup');

  // Show popup on successful submit
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Simulate success immediately and show popup
    popupEl.classList.remove('hidden');
    popupEl.style.display = 'flex';

    // Optionally clear the form fields
    contactForm.reset();

    const okBtn = document.getElementById('contactOkBtn');
    if (okBtn) {
      okBtn.focus();
      okBtn.addEventListener('click', function () {
        popupEl.style.display = 'none';
        popupEl.classList.add('hidden');
      });
    }
  });
});