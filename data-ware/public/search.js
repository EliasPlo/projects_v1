let articles = []; // Stores all articles data
const articlesContainer = document.getElementById("articles-container");
const paginationControls = document.getElementById("pagination-controls");
const searchInput = document.getElementById("search");
const articlesPerPage = 20; // Maximum articles per page
let currentPage = 1;

// Function to fetch articles
function fetchArticles() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            articles = data.articles;
            displayArticles(articles);
            setupPagination(articles);
        })
        .catch(error => console.error('Error fetching articles:', error));
}

// Function to display articles on current page
function displayArticles(articlesToDisplay) {
    articlesContainer.innerHTML = ""; // Clear current articles
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const paginatedArticles = articlesToDisplay.slice(start, end);

    paginatedArticles.forEach(article => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.content.slice(0, 100)}...</p>
            <button onclick="readMore(${article.id})">Read More</button>
        `;
        articlesContainer.appendChild(articleElement);
    });
}

// Redirect to data.html with article ID as a query parameter
function readMore(id) {
    window.location.href = `data.html?id=${id}`;
}

// Function to set up pagination
function setupPagination(articlesToPaginate) {
    paginationControls.innerHTML = ""; // Clear current pagination controls
    const pageCount = Math.ceil(articlesToPaginate.length / articlesPerPage);
    
    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("page-button");
        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayArticles(articlesToPaginate);
            setupPagination(articlesToPaginate);
        });
        paginationControls.appendChild(pageButton);
    }
}

// Handle search input
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(query) || 
        article.content.toLowerCase().includes(query)
    );
    currentPage = 1; // Reset to first page
    displayArticles(filteredArticles);
    setupPagination(filteredArticles);
}

// Add event listener for search input
searchInput.addEventListener("input", handleSearch);

// Fetch articles on page load
window.onload = fetchArticles;
