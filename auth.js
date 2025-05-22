function signup(email, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(user => user.email === email)) {
    alert('User already exists');
    return false;
  }
  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('currentUser', email);
  return true;
}
function login(email, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email);
  if (!user) {
    alert('Your account doesn\'t exist');
    window.location.href = 'signup.html';
    return false;
  }
  if (user.password === password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', email);
    return true;
  }
  alert('Invalid password');
  return false;
}
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
function deleteAccount() {
  if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) {
    return;
  }
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(user => user.email !== currentUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  }
}
function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const protectedPages = [
    'dashboard.html',
    'bot.html',
    'content.html',
    'summarizer.html',
    'image.html',
    'notes.html',
    'translator.html'
  ];
  if (!isLoggedIn && protectedPages.includes(currentPage)) {
    window.location.href = 'login.html';
  }
}
function updateWelcomeMessage() {
  const welcomeElement = document.querySelector('.welcome');
  if (welcomeElement) {
    const email = localStorage.getItem('currentUser') || 'user@example.com';
    welcomeElement.textContent = `Welcome, ${email}`;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  if (window.location.pathname.includes('dashboard.html')) {
    updateWelcomeMessage();
  }
  const signupForm = document.querySelector('form[action="/signup"]');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = signupForm.querySelector('input[name="email"]').value;
      const password = signupForm.querySelector('input[name="password"]').value;
      if (signup(email, password)) {
        window.location.href = 'login.html';
      }
    });
  }
  const loginForm = document.querySelector('form[action="/login"]');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[name="email"]').value;
      const password = loginForm.querySelector('input[name="password"]').value;
      if (login(email, password)) {
        window.location.href = 'dashboard.html';
      }
    });
  }
});
