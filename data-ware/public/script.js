// data-script.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => displayArticles(data.articles))
        .catch(error => console.error('Virhe ladattaessa dataa:', error));
});

function displayArticles(articles) {
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // Clear the container before adding articles

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';
        articleDiv.innerHTML = `
            <h2>${article.title || "Otsikko puuttuu"}</h2>
            <p>${article.content || "Sisältö puuttuu"}</p>
            <p>Kirjoittaja: ${article.writer || "Tuntematon"}</p>
            <button onclick="editArticle(${article.id})">Muokkaa</button>
            <button onclick="deleteArticle(${article.id})">Poista</button>
        `;
        container.appendChild(articleDiv);
    });
}

function editArticle(id) {
    window.location.href = `edit.html?id=${id}`;
}

function deleteArticle(id) {
    // Handle article deletion (e.g., send a request to the server)
    console.log(`Artikkeli ${id} poistettu!`); // This should be replaced with actual deletion logic
    alert(`Artikkeli ${id} poistettu!`);
}
