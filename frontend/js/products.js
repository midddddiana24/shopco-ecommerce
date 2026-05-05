// Products Functions

// Load Products
async function loadProducts(filters = {}) {
    const { category, search, sort, page = 1, limit = 12 } = filters;
    
    let queryString = `?page=${page}&limit=${limit}`;
    if (category) queryString += `&category=${category}`;
    if (search) queryString += `&search=${search}`;
    if (sort) queryString += `&sort=${sort}`;

    try {
        const data = await apiCall(`/products${queryString}`);
        return data;
    } catch (error) {
        console.error('Error loading products:', error);
        throw error;
    }
}

// Load Single Product
async function loadProduct(id) {
    try {
        const data = await apiCall(`/products/${id}`);
        return data.product;
    } catch (error) {
        console.error('Error loading product:', error);
        throw error;
    }
}

// Load Categories
async function loadCategories() {
    try {
        const data = await apiCall('/categories');
        return data.categories;
    } catch (error) {
        console.error('Error loading categories:', error);
        return [];
    }
}

// Render Product Card
function renderProductCard(product) {
    const discountPercent = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const imageUrl = Array.isArray(product.images) && product.images[0] ? product.images[0] : 'https://via.placeholder.com/400';
    return `
        <div class="group cursor-pointer" onclick="viewProduct('${product._id}')">
            <div class="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img src="${imageUrl}" 
                     alt="${product.name}"
                     class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                     onerror="this.src='https://via.placeholder.com/400'">
                ${discountPercent > 0 ? `
                    <span class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        -${discountPercent}%
                    </span>
                ` : ''}
            </div>
            <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
            <div class="flex items-center mb-2">
                <div class="flex text-yellow-400">
                    ${renderStars(product.rating)}
                </div>
                <span class="text-sm text-gray-600 ml-2">${product.rating}/5</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="font-bold text-xl">${formatCurrency(product.price)}</span>
                ${product.originalPrice ? `
                    <span class="text-gray-400 line-through">${formatCurrency(product.originalPrice)}</span>
                ` : ''}
            </div>
        </div>
    `;
}

// Render Stars
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = Math.ceil(rating); i < 5; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Resolve cross-page path for navigation
function resolvePath(path) {
    const currentPath = window.location.pathname;
    if (!currentPath.includes('/pages/')) return path;

    const relativePath = path.replace(/^pages\//, '');
    const afterPages = currentPath.substring(currentPath.indexOf('/pages/') + 7);
    const depth = afterPages.split('/').length - 1;
    const prefix = '../'.repeat(Math.max(0, depth));
    return prefix + relativePath;
}

// View Product Detail
function viewProduct(productId) {
    window.location.href = resolvePath(`pages/product-detail.html?id=${productId}`);
}

// Load New Arrivals on Homepage
if (document.getElementById('newArrivalsGrid')) {
    loadProducts({ limit: 4, sort: 'newest' })
        .then(data => {
            const grid = document.getElementById('newArrivalsGrid');
            if (data.products.length > 0) {
                grid.innerHTML = data.products.map(renderProductCard).join('');
            } else {
                grid.innerHTML = '<p class="col-span-4 text-center text-gray-500">No products available</p>';
            }
        })
        .catch(error => {
            const grid = document.getElementById('newArrivalsGrid');
            showError(grid, 'Failed to load products');
        });
}

// Load Categories on Homepage
if (document.getElementById('categoriesGrid')) {
    loadCategories()
        .then(categories => {
            const grid = document.getElementById('categoriesGrid');
            if (categories.length > 0) {
                grid.innerHTML = categories.map(category => `
                    <div class="bg-white rounded-lg p-8 hover:shadow-lg transition cursor-pointer"
                         onclick="window.location.href='/pages/products.html?category=${category._id}'">
                        <h3 class="text-2xl font-bold mb-2">${category.name}</h3>
                        <p class="text-gray-600">${category.description || ''}</p>
                    </div>
                `).join('');
            } else {
                // Default categories if none exist
                grid.innerHTML = `
                    <div class="bg-white rounded-lg p-8 hover:shadow-lg transition cursor-pointer">
                        <h3 class="text-2xl font-bold mb-2">Casual</h3>
                        <p class="text-gray-600">Comfortable everyday wear</p>
                    </div>
                    <div class="bg-white rounded-lg p-8 hover:shadow-lg transition cursor-pointer">
                        <h3 class="text-2xl font-bold mb-2">Formal</h3>
                        <p class="text-gray-600">Professional attire</p>
                    </div>
                    <div class="bg-white rounded-lg p-8 hover:shadow-lg transition cursor-pointer">
                        <h3 class="text-2xl font-bold mb-2">Party</h3>
                        <p class="text-gray-600">Stylish evening outfits</p>
                    </div>
                    <div class="bg-white rounded-lg p-8 hover:shadow-lg transition cursor-pointer">
                        <h3 class="text-2xl font-bold mb-2">Gym</h3>
                        <p class="text-gray-600">Active sportswear</p>
                    </div>
                `;
            }
        });
}

// Products Page Functionality
if (window.location.pathname.includes('products.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    let currentFilters = {
        category: urlParams.get('category') || '',
        search: urlParams.get('search') || '',
        sort: urlParams.get('sort') || 'newest',
        page: parseInt(urlParams.get('page'), 10) || 1
    };

    async function renderProductsPage() {
        const container = document.getElementById('productsContainer');
        showLoading(container);

        try {
            const data = await loadProducts(currentFilters);
            
            if (data.products.length > 0) {
                container.innerHTML = `
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        ${data.products.map(renderProductCard).join('')}
                    </div>
                `;

                // Render pagination if needed
                if (data.totalPages > 1) {
                    renderPagination(data.currentPage, data.totalPages);
                }
            } else {
                container.innerHTML = `
                    <div class="text-center py-12">
                        <i class="fas fa-shopping-bag text-6xl text-gray-300 mb-4"></i>
                        <p class="text-xl text-gray-600">No products found</p>
                    </div>
                `;
            }
        } catch (error) {
            showError(container, 'Failed to load products');
        }
    }

    function renderPagination(currentPage, totalPages) {
        const paginationContainer = document.getElementById('pagination');
        if (!paginationContainer) return;

        let pages = '';
        for (let i = 1; i <= totalPages; i++) {
            pages += `
                <button onclick="changePage(${i})" 
                        class="px-4 py-2 ${i === currentPage ? 'bg-black text-white' : 'bg-white text-black'} 
                               border rounded-lg hover:bg-gray-100">
                    ${i}
                </button>
            `;
        }

        paginationContainer.innerHTML = `
            <div class="flex justify-center gap-2 mt-8">
                ${pages}
            </div>
        `;
    }

    window.changePage = function(page) {
        currentFilters.page = page;
        renderProductsPage();
        window.scrollTo(0, 0);
    };

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = currentFilters.search;
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value;
            currentFilters.page = 1;
            clearTimeout(window.searchTimeout);
            window.searchTimeout = setTimeout(() => {
                renderProductsPage();
            }, 500);
        });
    }

    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.value = currentFilters.sort;
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            currentFilters.page = 1;
            renderProductsPage();
        });
    }

    // Load categories for filter
    loadCategories().then(categories => {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.innerHTML = `
                <option value="">All Categories</option>
                ${categories.map(cat => `
                    <option value="${cat._id}" ${cat._id === currentFilters.category ? 'selected' : ''}>
                        ${cat.name}
                    </option>
                `).join('')}
            `;

            categoryFilter.addEventListener('change', (e) => {
                currentFilters.category = e.target.value;
                currentFilters.page = 1;
                renderProductsPage();
            });
        }
    });

    // Initial load
    renderProductsPage();
}

// Product Detail Page
if (window.location.pathname.includes('product-detail.html')) {
    const productId = new URLSearchParams(window.location.search).get('id');
    
    if (productId) {
        loadProduct(productId)
            .then(product => {
                renderProductDetail(product);
            })
            .catch(error => {
                document.getElementById('productDetail').innerHTML = `
                    <div class="text-center py-12">
                        <i class="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
                        <h2 class="text-2xl font-bold mb-2">Product Not Found</h2>
                        <p class="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
                        <a href="/pages/products.html" class="inline-block bg-black text-white px-6 py-3 rounded-lg">
                            Browse Products
                        </a>
                    </div>
                `;
            });
    }
}

function renderProductDetail(product) {
    const container = document.getElementById('productDetail');
    const discountPercent = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const mainImageUrl = Array.isArray(product.images) && product.images[0] ? product.images[0] : 'https://via.placeholder.com/600';
    container.innerHTML = `
        <div class="grid lg:grid-cols-2 gap-12">
            <!-- Images -->
            <div>
                <div class="mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    <img id="mainImage" src="${mainImageUrl}" 
                         alt="${product.name}"
                         class="w-full h-96 object-cover"
                         onerror="this.src='https://via.placeholder.com/600'">
                </div>
                ${Array.isArray(product.images) && product.images.length > 1 ? `
                    <div class="grid grid-cols-4 gap-4">
                        ${product.images.map((img, index) => `
                            <img src="${img || 'https://via.placeholder.com/150'}" 
                                 alt="${product.name} ${index + 1}"
                                 onclick="document.getElementById('mainImage').src='${img || 'https://via.placeholder.com/600'}'"
                                 onerror="this.src='https://via.placeholder.com/150'"
                                 class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75">
                        `).join('')}
                    </div>
                ` : ''}
            </div>

            <!-- Product Info -->
            <div>
                <h1 class="text-4xl font-bold mb-4">${product.name}</h1>
                
                <div class="flex items-center mb-4">
                    <div class="flex text-yellow-400 text-xl">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="text-gray-600 ml-2">${product.rating}/5</span>
                </div>

                <div class="flex items-center gap-4 mb-6">
                    <span class="text-3xl font-bold">${formatCurrency(product.price)}</span>
                    ${product.originalPrice ? `
                        <span class="text-2xl text-gray-400 line-through">${formatCurrency(product.originalPrice)}</span>
                        <span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                            -${discountPercent}%
                        </span>
                    ` : ''}
                </div>

                <p class="text-gray-600 mb-6 leading-relaxed">${product.description}</p>

                <div class="border-t pt-6">
                    ${product.colors && product.colors.length > 0 ? `
                        <div class="mb-6">
                            <label class="block font-semibold mb-3">Select Colors</label>
                            <div class="flex gap-3">
                                ${product.colors.map((color, index) => `
                                    <button onclick="selectColor('${color.code}')" 
                                            class="w-10 h-10 rounded-full border-2 hover:border-black transition"
                                            style="background-color: ${color.code}"
                                            title="${color.name}">
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${product.sizes && product.sizes.length > 0 ? `
                        <div class="mb-6">
                            <label class="block font-semibold mb-3">Choose Size</label>
                            <div class="flex gap-3">
                                ${product.sizes.map(size => `
                                    <button onclick="selectSize('${size}')" 
                                            class="px-6 py-2 border-2 rounded-lg hover:border-black hover:bg-gray-100 transition">
                                        ${size}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="mb-6">
                        <label class="block font-semibold mb-3">Quantity</label>
                        <div class="flex items-center gap-4">
                            <button onclick="changeQuantity(-1)" 
                                    class="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span id="quantity" class="text-xl font-semibold">1</span>
                            <button onclick="changeQuantity(1)" 
                                    class="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <p class="text-sm text-gray-600 mt-2">
                            ${product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
                        </p>
                    </div>

                    <button onclick='addToCart(${JSON.stringify(product).replace(/'/g, "\\'")})'
                            ${product.stock === 0 ? 'disabled' : ''}
                            class="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
                        ${product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    `;

    // Store product for cart functionality
    window.currentProduct = product;
    window.selectedColor = product.colors && product.colors.length > 0 ? product.colors[0].code : null;
    window.selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
    window.productQuantity = 1;
}

window.selectColor = function(color) {
    window.selectedColor = color;
    // Update UI to show selected color
    showToast(`Color selected: ${color}`, 'success');
};

window.selectSize = function(size) {
    window.selectedSize = size;
    showToast(`Size selected: ${size}`, 'success');
};

window.changeQuantity = function(change) {
    const quantityElement = document.getElementById('quantity');
    let newQuantity = window.productQuantity + change;
    
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > window.currentProduct.stock) {
        showToast('Maximum stock reached', 'error');
        return;
    }
    
    window.productQuantity = newQuantity;
    quantityElement.textContent = newQuantity;
};