// API Configuration
const API_URL = (() => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) return 'http://localhost:5000/api';
    return 'https://shopco-ecommerce-pm93.onrender.com/api';
})();
window.API_URL = API_URL;

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
    localStorage.removeItem('cart');
    // Redirect to login page properly
    window.location.href = '/pages/login.html';
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

// Resolve relative path for application pages
function resolveAppPath(path) {
    const currentPath = window.location.pathname;
    const normalizedPath = path.replace(/^\/?pages\//, '');

    if (!currentPath.includes('/pages/')) return normalizedPath;

    const afterPages = currentPath.substring(currentPath.indexOf('/pages/') + 7);
    const depth = afterPages.split('/').length - 1;
    const prefix = '../'.repeat(Math.max(0, depth));
    return prefix + normalizedPath;
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
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
                        ${user.role === 'admin' ? `<a href="/pages/admin/dashboard.html" class="block px-4 py-2 hover:bg-gray-100">Admin Dashboard</a>` : ''}
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

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            try {
                await apiCall('/contact', {
                    method: 'POST',
                    body: JSON.stringify({ name, email, subject, message })
                });

                showToast('Message sent! We will be in touch soon.');
                contactForm.reset();
            } catch (error) {
                showToast(error.message || 'Failed to send message.', 'error');
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

// 3D Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-element');

    if (scrollElements.length > 0) {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;

            scrollElements.forEach((element, index) => {
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                const scrollProgress = Math.min(Math.max((scrollTop - elementTop + windowHeight) / (elementHeight + windowHeight), 0), 1);

                const scrollLevel = Math.floor(scrollProgress * 4);
                element.setAttribute('data-scroll', scrollLevel);
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
    }
});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
});

// Stagger Animation for Cards
document.addEventListener('DOMContentLoaded', () => {
    const staggerContainers = document.querySelectorAll('.stagger-children');
    staggerContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
        });
    });
});

// Update Header for Authenticated Users
document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('authSection');
    const user = getUser();
    const token = getToken();

    if (user && token) {
        authSection.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="relative">
                    <button id="userMenuToggle" class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50" style="transition: none !important; animation: none !important; transform: none !important;">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=000&color=fff&size=24" 
                             alt="${user.name}" class="w-6 h-6 rounded-full">
                        <span class="hidden xl:inline">${user.name.split(' ')[0]}</span>
                        <i class="fas fa-chevron-down text-xs"></i>
                    </button>
                    <div id="userMenu" class="absolute top-full mt-2 right-0 w-48 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 hidden z-50">
                        <a href="pages/profile.html" class="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition">
                            <i class="fas fa-user w-4"></i> Profile
                        </a>
                        <a href="pages/orders.html" class="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition">
                            <i class="fas fa-shopping-bag w-4"></i> Orders
                        </a>
                        <hr class="my-2 border-slate-200">
                        <button onclick="logout()" class="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition w-full text-left">
                            <i class="fas fa-sign-out-alt w-4"></i> Sign Out
                        </button>
                    </div>
                </div>
            </div>
        `;

        // User menu toggle
        const userMenuToggle = document.getElementById('userMenuToggle');
        const userMenu = document.getElementById('userMenu');

        userMenuToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target) && !userMenuToggle.contains(e.target)) {
                userMenu.classList.add('hidden');
            }
        });
    }
});

// Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.getElementById('searchToggle');
    const searchDropdown = document.getElementById('searchDropdown');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    let searchTimeout;
    let products = [];

    // Load products for search
    const loadProducts = async () => {
        try {
            const data = await apiCall('/products?limit=100');
            products = data.products || [];
        } catch (error) {
            console.error('Failed to load products for search');
        }
    };

    loadProducts();

    // Toggle search dropdown
    searchToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        searchDropdown.classList.toggle('hidden');
        if (!searchDropdown.classList.contains('hidden')) {
            searchInput.focus();
        }
    });

    // Close search on outside click
    document.addEventListener('click', (e) => {
        if (!searchDropdown.contains(e.target) && !searchToggle.contains(e.target)) {
            searchDropdown.classList.add('hidden');
        }
    });

    // Search input handler
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        clearTimeout(searchTimeout);

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        searchTimeout = setTimeout(() => {
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(query) || 
                product.description.toLowerCase().includes(query) ||
                product.category?.name.toLowerCase().includes(query)
            ).slice(0, 5);

            if (filtered.length === 0) {
                searchResults.innerHTML = '<p class="text-sm text-slate-500 py-2">No products found</p>';
                return;
            }

            searchResults.innerHTML = filtered.map(product => `
                <a href="/pages/product-detail.html?id=${product._id}" 
                   class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
                    <img src="${(Array.isArray(product.images) && product.images[0]) ? product.images[0] : 'https://via.placeholder.com/40'}" 
                         alt="${product.name}" class="w-10 h-10 rounded-lg object-cover" onerror="this.src='https://via.placeholder.com/40'">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-slate-900 truncate">${product.name}</p>
                        <p class="text-xs text-slate-500">${product.category?.name || 'Uncategorized'}</p>
                    </div>
                    <p class="text-sm font-semibold text-slate-900">₱${product.price}</p>
                </a>
            `).join('');
        }, 300);
    });

    // Search on Enter
    searchInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            window.location.href = `/pages/products.html?search=${encodeURIComponent(searchInput.value.trim())}`;
        }
    });
});
