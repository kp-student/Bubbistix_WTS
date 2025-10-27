// Handle form submission: Prefer toast, fallback to legacy success popup
document.getElementById('createAccountForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const canToast = !!(window.bubbistixUI && typeof window.bubbistixUI.showToast === 'function');

  const form = e.currentTarget;
  const usernameInput = form.querySelector('#username');
  const fullnameInput = form.querySelector('#fullname');
  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password');
  const submitBtn = form.querySelector('.login-btn');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // fallback pattern
  const V = window.bubbistixValidate || {};
  let valid = true;

  // Validate inputs and mark ARIA invalid appropriately
  if (!usernameInput || !(V.minLength ? V.minLength(usernameInput.value, 2) : usernameInput.value.trim().length >= 2)) {
    valid = false;
    V.setFieldError ? V.setFieldError(usernameInput, 'Please enter a valid username.') : usernameInput?.setAttribute('aria-invalid', 'true');
  } else {
    V.clearFieldError ? V.clearFieldError(usernameInput) : usernameInput.removeAttribute('aria-invalid');
  }

  if (!fullnameInput || !(V.minLength ? V.minLength(fullnameInput.value, 2) : fullnameInput.value.trim().length >= 2)) {
    valid = false;
    V.setFieldError ? V.setFieldError(fullnameInput, 'Please provide your first and last name.') : fullnameInput?.setAttribute('aria-invalid', 'true');
  } else {
    V.clearFieldError ? V.clearFieldError(fullnameInput) : fullnameInput.removeAttribute('aria-invalid');
  }

  if (!emailInput || !(V.isEmail ? V.isEmail(emailInput.value) : emailRegex.test(emailInput.value.trim()))) {
    valid = false;
    V.setFieldError ? V.setFieldError(emailInput, 'Please enter a valid email address.') : emailInput?.setAttribute('aria-invalid', 'true');
  } else {
    V.clearFieldError ? V.clearFieldError(emailInput) : emailInput.removeAttribute('aria-invalid');
  }

  if (!passwordInput || !(V.minLength ? V.minLength(passwordInput.value, 6) : passwordInput.value.trim().length >= 6)) {
    valid = false;
    V.setFieldError ? V.setFieldError(passwordInput, 'Password must be at least 6 characters.') : passwordInput?.setAttribute('aria-invalid', 'true');
  } else {
    V.clearFieldError ? V.clearFieldError(passwordInput) : passwordInput.removeAttribute('aria-invalid');
  }

  if (!valid) return;

  // Show spinner and mark form busy
  form.setAttribute('aria-busy', 'true');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Creating account...
    `;
  }

  if (canToast) {
    window.bubbistixUI.showToast({
      title: 'Account successfully created!',
      message: 'Please sign in. Redirecting you to the sign-in page.',
      autohide: true,
      delay: 2000,
      position: 'center',
      size: 'xl',
      backdrop: 'blur'
    });
  }

  // Redirect after delay regardless of toast availability
  setTimeout(() => {
    window.location.href = 'registration.html';
  }, 2000);
});

// Removed legacy goToLogin and popup fallback; relying on toast + timed redirect