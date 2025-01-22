// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
}

// Password visibility toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});

// Password strength checker
const strengthMeter = document.querySelector('.strength-meter');
const strengthText = document.querySelector('.strength-text');

function checkPasswordStrength(password) {
    let strength = 0;
    const feedback = [];

    if (password.length >= 8) {
        strength += 25;
        feedback.push('Length');
    }
    if (password.match(/[A-Z]/)) {
        strength += 25;
        feedback.push('Uppercase');
    }
    if (password.match(/[0-9]/)) {
        strength += 25;
        feedback.push('Numbers');
    }
    if (password.match(/[!@#$%^&*]/)) {
        strength += 25;
        feedback.push('Special');
    }

    strengthMeter.style.background = `linear-gradient(to right, #4CAF50 ${strength}%, #ddd ${strength}%)`;
    strengthText.textContent = `Strength: ${feedback.join(', ')}`;
    
    return strength >= 75;
}

passwordInput.addEventListener('input', (e) => {
    checkPasswordStrength(e.target.value);
});

// Form submission
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!checkPasswordStrength(password)) {
        showToast('Please use a stronger password!', 'error');
        return;
    }

    // Simulate API call
    setTimeout(() => {
        // In real application, you would make an API call here
        showToast('Login successful!', 'success');
        
        // Simulate redirect
        setTimeout(() => {
            window.location.href = '../Dashboard/dashboard.html';
        }, 1500);
    }, 1000);
});

// Toast notification
function showToast(message, type = 'success') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: type === 'success' ? "#4CAF50" : "#f44336",
    }).showToast();
}

// Sign Up button click handler
const signUpBtn = document.querySelector('.signup-btn');
signUpBtn.addEventListener('click', () => {
    // Redirect to sign up page
    window.location.href = '/signup.html';
});

// Forgot password link handler
const forgotPasswordLink = document.querySelector('.forgot-password');
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Redirect to forgot password page
    window.location.href = '/forgot-password.html';
}); 