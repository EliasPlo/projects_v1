        // Ladataan tuotetiedot URL-parametrin perusteella
        document.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');

            if (productId) {
                fetch('data/products.json')
                    .then(response => response.json())
                    .then(products => {
                        const product = products.find(p => p.ID === parseInt(productId));

                        if (product) {
                            displayProductDetails(product);
                        } else {
                            document.getElementById('product-details').innerHTML = '<p>Tuotetta ei löytynyt.</p>';
                        }
                    })
                    .catch(error => {
                        console.error('Virhe tuotetietojen latauksessa:', error);
                        document.getElementById('product-details').innerHTML = '<p>Virhe tuotetietojen latauksessa.</p>';
                    });
            } else {
                document.getElementById('product-details').innerHTML = '<p>Tuotetta ei määritetty.</p>';
            }
        });

        function displayProductDetails(product) {
            const productDetails = document.getElementById('product-details');
            productDetails.innerHTML = `
                <h2>${product.name}</h2>
                <p><strong>Kuvaus:</strong> ${product.description}</p>
                <p><strong>Hinta:</strong> €${product.price}</p>
                <p><strong>Kategoria:</strong> ${product.category}</p>
                <p><strong>Varastotilanne:</strong> ${product.stock} kpl</p>
                <p><strong>Brändi:</strong> ${product.brand}</p>
                <p><strong>Arvostelut:</strong> ${product.rating} tähteä</p>
                <p><strong>Lisätty:</strong> ${product.date_added}</p>
                <p><strong>Toimittaja:</strong> ${product.supplier}</p>
                <p><strong>Takuu:</strong> ${product.warranty}</p>
                <p><strong>Saatavuus:</strong> ${product.availability}</p>
                <h3>Arvostelut</h3>
                <ul>
                    ${product.reviews.map(review => `
                        <li>
                            <p><strong>${review.customer || 'Anonyymi'}:</strong> ${review.rating} tähteä</p>
                            <p>${review.comment || 'Ei kommenttia.'}</p>
                        </li>`).join('')}
                </ul>
            `;
        }