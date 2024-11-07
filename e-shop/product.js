document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
      loadProduct(productId);
    }
  });
  
  async function loadProduct(id) {
    try {
      const response = await fetch('data/products.json');
      const products = await response.json();
      const product = products.find(item => item.id == id);
      
      if (product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Hinta: ${product.price.toFixed(2)} €</p>
          <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Lisää ostoskoriin</button>
        `;
      } else {
        productDetails.innerHTML = "<p>Tuotetta ei löytynyt.</p>";
      }
    } catch (error) {
      console.error("Virhe tuotteen lataamisessa:", error);
    }
  }
  