// edit-script.js
document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');

    if (articleId) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const article = data.articles.find(a => a.id == articleId);
                if (article) {
                    populateForm(article);
                }
            })
            .catch(error => console.error('Virhe ladattaessa dataa:', error));
    }

    const form = document.getElementById('edit-article-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        updateArticle(articleId);
    });
});

function populateForm(article) {
    document.getElementById('article-id').value = article.id;
    document.getElementById('title').value = article.title;
    document.getElementById('content').value = article.content;
    document.getElementById('additional-info').value = article.additional_info;
    document.getElementById('writer').value = article.writer;
    document.getElementById('creator').value = article.creator;
    document.getElementById('source').value = article.info.source;
    // Populate links and references if needed
}

function updateArticle(articleId) {
    // Here you would typically make a request to save the updated article
    const updatedArticle = {
        id: articleId,
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        additional_info: document.getElementById('additional-info').value,
        writer: document.getElementById('writer').value,
        creator: document.getElementById('creator').value,
        info: {
            source: document.getElementById('source').value,
            links: [],  // Populate links array from the form
            references: []  // Populate references array from the form
        }
    };

    console.log(updatedArticle); // This should be sent to the server or processed accordingly
    alert('Artikkeli päivitetty!');
}
