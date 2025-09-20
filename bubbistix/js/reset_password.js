// Handle form submission for password reset
document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form from actually submitting
  
  // Redirect to registration page with success message
  window.location.href = 'registration.html?message=reset';
});