const PRODUCTS_PER_PAGE = 20;  // Määritetään tuotteiden määrä per sivu
let currentPage = 1;
let allProducts = [];

// Ladataan tuotteet
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadCart();
  });
  
  // Ladataan tuotteet
  async function loadProducts() {
    try {
      const response = await fetch('data/products.json');
      allProducts = await response.json();
      displayProducts();
    } catch (error) {
      console.error("Virhe tuotteiden lataamisessa:", error);
    }
  }
  
  // Näytetään vain nykyisen sivun tuotteet
  function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Tyhjennetään aikaisemmat tuotteet
  
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const productsToShow = allProducts.slice(startIndex, endIndex);
  
    productsToShow.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>${product.price.toFixed(2)} €</p>
        <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Lisää ostoskoriin</button>
        <button onclick="viewProduct(${product.id})">Lue lisää</button>
      `;
      productList.appendChild(productDiv);
    });
  
    // Päivitetään sivunumero
    document.getElementById('current-page').textContent = currentPage;
  
    // Hallitaan painikkeiden näkyvyyttä
    document.getElementById('prev-page').style.display = currentPage > 1 ? 'inline' : 'none';
    document.getElementById('next-page').style.display = endIndex < allProducts.length ? 'inline' : 'none';
  }
  
  // Sivunvaihtofunktio
  function changePage(direction) {
    currentPage += direction;
    displayProducts();
  }

  // Funktio "Lue lisää" -painikkeelle
  function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
  }

  
  function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === id);
    
    if (index !== -1) {
      cart[index].quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartSummary();
  }
  
  function updateCartSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = 0;
    let totalPrice = 0;
    
    cart.forEach(item => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    
    document.getElementById("cart-count").textContent = totalItems;
    document.getElementById("cart-total").textContent = totalPrice.toFixed(2) + " €";
  }
  
  function loadCart() {
    updateCartSummary();
  }
  