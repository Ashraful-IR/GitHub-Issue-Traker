const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

function handleLogin(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === 'admin' && password === 'admin123') {
        // alert('Login successful! Redirecting to dashboard...');
        window.location.href = './Pages/home.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

document.getElementById('loginForm').addEventListener('submit', handleLogin);
console.log('Login script loaded');