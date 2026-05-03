// API Configuration
const API_URL = 'http://localhost:5000/api';
// For production, change to: const API_URL = 'https://your-backend-url.onrender.com/api';

// Helper Functions
const getToken = () => localStorage.getItem('token');
const getUser = () => JSON.parse(localStorage.getItem('user') || '{}');
const setAuth = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
};
const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/index.html';
};

// API Helper Function
async function apiCall(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } animate-fade-in`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format Date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Update User UI
function updateUserUI() {
    const user = getUser();
    const userIcon = document.getElementById('userIcon');
    
    if (user && user.id) {
        if (userIcon) {
            userIcon.innerHTML = `
                <div class="relative group">
                    <img src="${user.avatar || 'https://via.placeholder.com/40'}" 
                         alt="${user.name}" 
                         class="w-8 h-8 rounded-full object-cover cursor-pointer">
                    <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                        <a href="/pages/profile.html" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
                <a href="/pages/orders.html" class="block px-4 py-2 hover:bg-gray-100">My Orders</a>
                        ${user.role === 'admin' ? '<a href="/pages/admin/dashboard.html" class="block px-4 py-2 hover:bg-gray-100">Admin Dashboard</a>' : ''}
                        <button onclick="logout()" class="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                    </div>
                </div>
            `;
        }
    }
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        clearAuth();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateUserUI();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenuBtn = document.getElementById('closeMobileMenu');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
        });
    }

    if (closeMobileMenuBtn) {
        closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    }

    if (mobileSearchBtn && mobileMenu) {
        mobileSearchBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                const searchInput = document.getElementById('mobileSearchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }, 200);
        });
    }

    if (mobileMenu) {
        mobileMenu.addEventListener('click', (event) => {
            if (event.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }
});

// Close mobile menu function
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

// Loading Spinner
function showLoading(element) {
    element.innerHTML = `
        <div class="flex justify-center items-center py-12">
            <i class="fas fa-spinner fa-spin text-4xl text-gray-400"></i>
        </div>
    `;
}

// Error Display
function showError(element, message) {
    element.innerHTML = `
        <div class="text-center py-12">
            <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
            <p class="text-gray-600">${message}</p>
        </div>
    `;
}