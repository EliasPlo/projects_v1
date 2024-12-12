fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = products.map(product => `
            <div class="product">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Hinta: ${product.price} €</p>
                <p>Varasto: ${product.stock}</p>
                <button onclick="addToCart(${product.ID})">Lisää ostoskoriin</button>
            </div>
        `).join('');
    });

function addToCart(productId) {
    alert(`Tuote ${productId} lisätty ostoskoriin!`);
}
