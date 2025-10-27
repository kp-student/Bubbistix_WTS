// Handle form submission: Prefer toast, fallback to legacy success popup
document.getElementById('createAccountForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const canToast = !!(window.bubbistixUI && typeof window.bubbistixUI.showToast === 'function');

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
    setTimeout(() => {
      window.location.href = 'registration.html';
    }, 2000);
  } else {
    // Fallback to legacy popup
    document.getElementById('successPopup').style.display = 'flex';
  }
});

// Function to go to login page
function goToLogin() {
  window.location.href = 'registration.html';
}