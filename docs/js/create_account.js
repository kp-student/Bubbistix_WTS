// Handle form submission
document.getElementById('createAccountForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form from actually submitting
  
  // Show success popup
  document.getElementById('successPopup').style.display = 'flex';
});

// Function to go to login page
function goToLogin() {
  window.location.href = 'registration.html';
}