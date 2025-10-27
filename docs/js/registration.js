// Check for success message parameter
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');
  if (message === 'reset') {
    document.getElementById('resetMessage').style.display = 'block';
  }
});

// Handle login form submission
document.querySelector('.login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const canToast = !!(window.bubbistixUI && typeof window.bubbistixUI.showToast === 'function');

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
  } else {
    // Fallback to legacy success popup
    document.getElementById('loginSuccessPopup').style.display = 'flex';
  }

  // Auto redirect to home after sign-in
  setTimeout(() => {
    window.location.href = '../../index.html';
  }, 1500);
});