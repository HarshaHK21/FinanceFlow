// =============================================
// Supabase Configuration
// =============================================
const SUPABASE_URL = 'https://pgarmxrwzvkzaccxwmlx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYXJteHJ3enZremFjY3h3bWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNjQ2NzIsImV4cCI6MjA4ODY0MDY3Mn0.QIbTIhm5K4ienrlRajp6k_62eBbzzMtmmKfY964mrow';

// Initialize Supabase client (named supabaseClient to avoid conflict with CDN global)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================================
// Auth Helper Functions
// =============================================

/**
 * Sign up a new user
 */
async function signUpUser(email, password, fullName) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Sign in an existing user
 */
async function signInUser(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Sign out the current user
 */
async function signOutUser() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
}

/**
 * Get current session
 */
async function getSession() {
  const { data: { session }, error } = await supabaseClient.auth.getSession();
  if (error) throw error;
  return session;
}

/**
 * Get current user
 */
async function getCurrentUser() {
  const { data: { user }, error } = await supabaseClient.auth.getUser();
  if (error) throw error;
  return user;
}

/**
 * Redirect to dashboard if already logged in
 */
async function redirectIfLoggedIn() {
  const session = await getSession();
  if (session) {
    window.location.href = '/pages/dashboard.html';
  }
}

/**
 * Redirect to login if not logged in
 */
async function redirectIfNotLoggedIn() {
  const session = await getSession();
  if (!session) {
    window.location.href = '/pages/login.html';
  }
  return session;
}

/**
 * Send password reset email (OTP)
 */
async function sendPasswordReset(email) {
  const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email);
  if (error) throw error;
  return data;
}

/**
 * Verify OTP token for password recovery
 */
async function verifyResetOtp(email, token) {
  const { data, error } = await supabaseClient.auth.verifyOtp({
    email,
    token,
    type: 'recovery',
  });
  if (error) throw error;
  return data;
}

/**
 * Update user password (requires active session after OTP verification)
 */
async function updatePassword(newPassword) {
  const { data, error } = await supabaseClient.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
  return data;
}
