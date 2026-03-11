// =============================================
// Authentication Page Logic
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is already logged in
  redirectIfLoggedIn();

  // ---- LOGIN FORM ----
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const loginBtn = document.getElementById('login-btn');
    const loginBtnText = document.getElementById('login-btn-text');
    const loginSpinner = document.getElementById('login-spinner');

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      if (!email || !password) {
        Toast.show('Please fill in all fields', 'warning');
        return;
      }

      // Show loading state
      loginBtn.disabled = true;
      loginBtnText.textContent = 'Signing in...';
      loginSpinner.classList.remove('hidden');

      try {
        await signInUser(email, password);
        Toast.show('Welcome back! Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = '/pages/dashboard.html';
        }, 1000);
      } catch (error) {
        Toast.show(error.message || 'Invalid email or password', 'error');
        loginBtn.disabled = false;
        loginBtnText.textContent = 'Sign In';
        loginSpinner.classList.add('hidden');
      }
    });
  }

  // ---- SIGNUP FORM ----
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    const signupBtn = document.getElementById('signup-btn');
    const signupBtnText = document.getElementById('signup-btn-text');
    const signupSpinner = document.getElementById('signup-spinner');

    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullName = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;

      // Validations
      if (!fullName || !email || !password || !confirmPassword) {
        Toast.show('Please fill in all fields', 'warning');
        return;
      }

      if (password.length < 6) {
        Toast.show('Password must be at least 6 characters', 'warning');
        return;
      }

      if (password !== confirmPassword) {
        Toast.show('Passwords do not match', 'error');
        return;
      }

      // Show loading state
      signupBtn.disabled = true;
      signupBtnText.textContent = 'Creating account...';
      signupSpinner.classList.remove('hidden');

      try {
        await signUpUser(email, password, fullName);
        Toast.show('Account created! Please check your email to verify.', 'success', 6000);
        setTimeout(() => {
          window.location.href = '/pages/login.html';
        }, 2000);
      } catch (error) {
        Toast.show(error.message || 'Failed to create account', 'error');
        signupBtn.disabled = false;
        signupBtnText.textContent = 'Create Account';
        signupSpinner.classList.add('hidden');
      }
    });
  }

  // ---- PASSWORD VISIBILITY TOGGLE ----
  document.querySelectorAll('.toggle-password').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      const eyeOpen = btn.querySelector('.eye-open');
      const eyeClosed = btn.querySelector('.eye-closed');

      if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.classList.add('hidden');
        eyeClosed.classList.remove('hidden');
      } else {
        input.type = 'password';
        eyeOpen.classList.remove('hidden');
        eyeClosed.classList.add('hidden');
      }
    });
  });
});
