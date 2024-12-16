document.addEventListener('DOMContentLoaded', () => {
    // Lataa tuotteet
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => renderProducts(products));

    // Hakutoiminto
    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('search').value.toLowerCase();
        fetch('data/products.json')
            .then(response => response.json())
            .then(products => {
                const filtered = products.filter(product => product.name.toLowerCase().includes(query));
                renderProducts(filtered);
            });
    });

    // Suodattimet
    document.getElementById('filterBtn').addEventListener('click', () => {
        const maxPrice = document.getElementById('priceFilter').value;
        const brand = document.getElementById('brandFilter').value.toLowerCase();
        const category = document.getElementById('categoryFilter').value.toLowerCase();
        const rating = document.getElementById('ratingFilter').value;

        fetch('data/products.json')
            .then(response => response.json())
            .then(products => {
                const filtered = products.filter(product => 
                    product.price <= maxPrice &&
                    product.brand.toLowerCase().includes(brand) &&
                    product.category.toLowerCase().includes(category) &&
                    product.rating >= rating
                );
                renderProducts(filtered);
            });
    });

    // Renderöi tuotteet
    function renderProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = products.map(product => `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Hinta: €${product.price}</p>
                <a href="product.html?id=${product.ID}">Näytä tiedot</a>
            </div>
        `).join('');
    }
});
