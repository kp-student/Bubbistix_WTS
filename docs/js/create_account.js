// Handle form submission: Prefer toast, fallback to legacy success popup
document.getElementById('createAccountForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const canToast = !!(window.bubbistixUI && typeof window.bubbistixUI.showToast === 'function');

  if (canToast) {
    window.bubbistixUI.showToast({
      title: 'Account Created',
      message: 'Please sign in ❤',
      autohide: true,
      delay: 1200
    });
    setTimeout(() => {
      window.location.href = 'registration.html';
    }, 1200);
  } else {
    // Fallback to legacy popup
    document.getElementById('successPopup').style.display = 'flex';
  }
});

// Function to go to login page
function goToLogin() {
  window.location.href = 'registration.html';
}