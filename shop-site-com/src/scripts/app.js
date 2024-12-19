const products = [
    { id: 1, name: "Product 1", price: 29.99, image: "assets/images/product1.jpg" },
    { id: 2, name: "Product 2", price: 39.99, image: "assets/images/product2.jpg" },
    { id: 3, name: "Product 3", price: 19.99, image: "assets/images/product3.jpg" },
];

let cart = [];

function displayProducts() {
    const productContainer = document.getElementById("product-list");
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalDisplay = document.createElement("div");
    totalDisplay.className = "cart-total";
    totalDisplay.innerHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;
    cartContainer.appendChild(totalDisplay);
}

document.addEventListener("DOMContentLoaded", displayProducts);