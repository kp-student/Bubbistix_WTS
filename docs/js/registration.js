// Check for success message parameter
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');
  
  if (message === 'reset') {
    document.getElementById('resetMessage').style.display = 'block';
  }
});

// Handle login form submission
document.querySelector('.login-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form from actually submitting
  
  // Show success popup
  document.getElementById('loginSuccessPopup').style.display = 'flex';
  
  // Auto redirect after 3 seconds
  setTimeout(function() {
    window.location.href = 'index.html';
  }, 3000);
});