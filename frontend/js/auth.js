// Authentication Functions

// Register User
async function registerUser(formData) {
    try {
        const data = await apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        if (data.success) {
            setAuth(data.token, data.user);
            showToast('Registration successful!');
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 1000);
        }
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Login User
async function loginUser(formData) {
    try {
        const data = await apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        if (data.success) {
            setAuth(data.token, data.user);
            showToast('Login successful!');
            
            // Redirect based on role
            setTimeout(() => {
                if (data.user.role === 'admin') {
                    window.location.href = '/pages/admin/dashboard.html';
                } else {
                    window.location.href = '/index.html';
                }
            }, 1000);
        }
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Check if user is logged in
function requireAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = '/pages/login.html';
        return false;
    }
    return true;
}

// Check if user is admin
function requireAdmin() {
    const user = getUser();
    if (!user || user.role !== 'admin') {
        window.location.href = '/index.html';
        return false;
    }
    return true;
}

// Handle Registration Form
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        const confirmPassword = document.getElementById('confirmPassword').value;

        if (formData.password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        if (formData.password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }

        await registerUser(formData);
    });
}

// Handle Login Form
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        await loginUser(formData);
    });
}
