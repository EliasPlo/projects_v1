let articlesData = []; // Tähän tallennetaan kaikki artikkelit
const articlesPerPage = 10; // Kuinka monta artikkelia per sivu
const maxPages = 5; // Maksimi sivujen määrä

// Funktio lataa JSON-data palvelimelta
function loadArticles() {
    fetch('http://localhost:3000/api/articles')
        .then(response => response.json())
        .then(data => {
            articlesData = data.articles;
            displayArticles(); // Näytä artikkelit ensimmäisellä sivulla
        })
        .catch(error => {
            console.error('Virhe ladattaessa JSON-tietoja:', error);
            document.getElementById('message').textContent = 'Virhe ladattaessa artikkelitiedot.';
        });
}

// Funktio näyttää artikkelit
function displayArticles(page = 1) {
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    
    // Sekoitetaan artikkelit satunnaisesti
    const shuffledArticles = articlesData.sort(() => 0.5 - Math.random());

    // Valitaan artikkelit nykyiselle sivulle
    const articlesToShow = shuffledArticles.slice(startIndex, endIndex);
    
    // Näytetään artikkelit
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    
    articlesToShow.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';
        articleDiv.innerHTML = `<h2>${article.title}</h2><p>${article.content}</p><a href="data.html?id=${article.id}">Lue lisää</a>`;
        contentDiv.appendChild(articleDiv);
    });

    // Näytetään navigointi
    setupPagination(Math.ceil(articlesData.length / articlesPerPage));
}

// Funktio asetaa sivunavigoinnin
function setupPagination(totalPages) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    for (let i = 1; i <= Math.min(totalPages, maxPages); i++) {
        const pageLink = document.createElement('button');
        pageLink.innerText = i;
        pageLink.onclick = () => displayArticles(i);
        paginationDiv.appendChild(pageLink);
    }
}

// Käynnistetään artikkelien lataaminen
loadArticles();
