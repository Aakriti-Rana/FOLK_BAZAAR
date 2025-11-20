const API_URL = 'http://localhost:5000/api/items';
let products = [];
let isEditMode = false;
let currentEditId = null;

// Load products from database on page load
window.onload = async function() {
    await fetchProducts();
};

// Fetch all products from backend
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success) {
            products = result.data;
            renderProducts();
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to load products. Make sure backend is running on port 5000');
    }
}

function openModal() {
    isEditMode = false;
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Add New Product';
    document.getElementById('submitBtn').textContent = 'Add Product';
    document.getElementById('productModal').classList.add('active');
}

function openEditModal(id) {
    isEditMode = true;
    currentEditId = id;
    
    // Find the product
    const product = products.find(p => p._id === id);
    if (!product) return;
    
    // Populate form
    document.getElementById('productId').value = product._id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productImage').value = product.image;
    
    // Update modal title and button
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('submitBtn').textContent = 'Update Product';
    
    document.getElementById('productModal').classList.add('active');
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    document.getElementById('productForm').reset();
    isEditMode = false;
    currentEditId = null;
}

// Close modal when clicking outside
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Handle form submission - Save or Update to database
document.getElementById('productForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value;
    const image = document.getElementById('productImage').value;

    const productData = {
        name: name,
        category: category,
        price: price,
        description: description,
        image: image
    };

    try {
        let response, result;
        
        if (isEditMode && currentEditId) {
            // UPDATE existing product
            response = await fetch(`${API_URL}/${currentEditId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
            
            result = await response.json();
            
            if (result.success) {
                alert('Product updated successfully in database!');
                await fetchProducts();
                closeModal();
            } else {
                alert('Failed to update product: ' + (result.error || 'Unknown error'));
            }
        } else {
            // CREATE new product
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            result = await response.json();
            
            if (result.success) {
                alert('Product added successfully to database!');
                await fetchProducts();
                closeModal();
            } else {
                alert('Failed to add product: ' + (result.error || 'Unknown error'));
            }
        }
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save product. Make sure backend is running on port 5000');
    }
});

// Delete product from database
async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product from database?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            
            if (result.success) {
                alert('Product deleted successfully from database!');
                await fetchProducts(); // Refresh the list
            } else {
                alert('Failed to delete product: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Make sure backend is running on port 5000');
        }
    }
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const itemCount = document.getElementById('itemCount');

    itemCount.textContent = `${products.length} item${products.length !== 1 ? 's' : ''}`;

    if (products.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    emptyState.style.display = 'none';

    grid.innerHTML = products.map(product => {
        // Use the actual image URL from database, with fallback
        const imageUrl = product.image || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop';
        
        return `
            <div class="product-card">
                <button class="edit-btn" onclick="openEditModal('${product._id}')" title="Edit Product">✎</button>
                <button class="delete-btn" onclick="deleteProduct('${product._id}')" title="Delete Product">−</button>
                <img src="${imageUrl}" alt="${product.name}" class="product-image" onerror="this.src='https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop'">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-description">${product.description}</div>
                    <div style="margin-top: 8px; color: #888; font-size: 12px;">Category: ${product.category}</div>
                </div>
            </div>
        `;
    }).join('');
}
