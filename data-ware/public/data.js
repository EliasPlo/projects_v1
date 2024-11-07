const articleContainer = document.getElementById("article-container");

// Function to get query parameter by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fetch and display article based on ID
function fetchArticleById() {
    const articleId = getQueryParam("id");
    if (!articleId) return;

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const article = data.articles.find(a => a.id === parseInt(articleId));
            if (article) displayArticle(article);
            else articleContainer.innerHTML = "<p>Article not found.</p>";
        })
        .catch(error => console.error('Error fetching article:', error));
}

// Function to display full article details
function displayArticle(article) {
    articleContainer.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.content}</p><br>
        <p>${article.additional_info}</p>
        <div class="links">
            <strong>Links:</strong> ${article.info.links.map(link => `<a href="${link.url}" target="_blank">${link.label}</a>`).join(", ")}
        </div>
        <div class="references">
            <strong>References:</strong> ${article.info.references.map(ref => `<a href="${ref.url}" target="_blank">${ref.title}</a>`).join(", ")}
        </div>
        <p><strong>Writer:</strong> ${article.writer}</p>
        <p><strong>Creator:</strong> ${article.creator}</p>
        <p><strong>Published Date:</strong> ${article.published_date}</p><br>
    `;
}

// Fetch and display article on page load
window.onload = fetchArticleById;
