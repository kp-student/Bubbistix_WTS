// Check for success message parameter
// Initialize page behaviors (ES6 + accessible patterns)
document.addEventListener('DOMContentLoaded', () => {
  // Announce password reset success if present
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');
  if (message === 'reset') {
    const resetEl = document.getElementById('resetMessage');
    if (resetEl) {
      resetEl.style.display = 'block';
      resetEl.setAttribute('role', 'status');
      resetEl.setAttribute('aria-live', 'polite');
    }
  }
});

// Handle login form submission
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // kept for fallback

// Enhance form submission: validate, show spinner, use ARIA busy
document.querySelector('.login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password');
  const submitBtn = form.querySelector('.login-btn');
  const canToast = !!(window.bubbistixUI && typeof window.bubbistixUI.showToast === 'function');
  const V = window.bubbistixValidate || {};

  // Basic validation with error states
  let valid = true;
  // Email (inline errors only)
  if (!emailInput || !(V.isEmail ? V.isEmail(emailInput.value) : emailRegex.test(emailInput.value.trim()))) {
    valid = false;
    V.setFieldError ? V.setFieldError(emailInput, 'Please enter a valid email address.') : emailInput?.setAttribute('aria-invalid', 'true');
  } else {
    V.clearFieldError ? V.clearFieldError(emailInput) : emailInput.removeAttribute('aria-invalid');
  }
  // Password (inline errors only)
  if (!passwordInput || !(V.minLength ? V.minLength(passwordInput.value, 6) : passwordInput.value.trim().length >= 6)) {
    valid = false;
    V.setFieldError ? V.setFieldError(passwordInput, 'Password must be at least 6 characters.') : passwordInput?.setAttribute('aria-invalid', 'true');
  } else {
    V.clearFieldError ? V.clearFieldError(passwordInput) : passwordInput.removeAttribute('aria-invalid');
  }

  if (!valid) return; // Stop on validation failure

  // Show spinner and mark form busy for screen readers
  form.setAttribute('aria-busy', 'true');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Signing in...
    `;
  }

  // Success feedback
  if (canToast) {
    window.bubbistixUI.showToast({
      title: "You're now signed in",
      message: 'Redirecting to your dashboard',
      autohide: true,
      delay: 1500,
      position: 'center',
      size: 'xl',
      backdrop: 'blur'
    });
  }

  // Auto redirect to home after sign-in
  setTimeout(() => {
    window.location.href = '../../index.html';
  }, 1500);
});