document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
  });
  
  // Ladataan ostoskorin tuotteet ja kokonaishinta
  function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    
    cartList.innerHTML = '';
    let total = 0;
  
    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Hinta: ${item.price.toFixed(2)} €</p>
        <p>Määrä: ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">Poista</button>
      `;
      cartList.appendChild(itemDiv);
      
      total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `Yhteensä: ${total.toFixed(2)} €`;
  }
  
  // Poistaa tuotteen ostoskorista ja päivittää näkymän
  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
  }
  
  // Näyttää maksulomakkeen
  function showCheckoutForm() {
    document.getElementById("checkout-form").style.display = 'block';
    document.getElementById("checkout-button").style.display = 'none';
  }
  
  // Käsittelee maksun ja vahvistaa tilauksen
  function processPayment(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;
  
    if (name && cardNumber.length === 16 && expiry && cvv.length === 3) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      const orderData = {
        name,
        totalAmount,
        items: cart,
        date: new Date().toISOString()
      };
  
      // Lähetetään tilaus palvelimelle
      fetch("http://localhost:3000/api/saveOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      })
        .then(response => {
          if (response.ok) {
            localStorage.removeItem("cart");  // Tyhjennetään ostoskori
            showConfirmation();
          } else {
            alert("Tilausta ei voitu tallentaa. Yritä uudelleen.");
          }
        })
        .catch(error => {
          console.error("Virhe tilauksen tallennuksessa:", error);
          alert("Virhe tilauksen tallennuksessa. Tarkista palvelimen yhteys.");
        });
    } else {
      alert("Tarkista maksutiedot!");
    }
  }
  
  // Näyttää tilausvahvistuksen
  function showConfirmation() {
    document.getElementById("cart-items").style.display = 'none';
    document.getElementById("checkout-form").style.display = 'none';
    document.getElementById("order-confirmation").style.display = 'block';
  }
  