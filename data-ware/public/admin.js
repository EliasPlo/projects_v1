// admin-script.js
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('new-article-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        createArticle();
    });
});

function createArticle() {
    const newArticle = {
        id: Date.now(), // Use a timestamp as a unique ID for simplicity
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        additional_info: document.getElementById('additional-info').value,
        writer: document.getElementById('writer').value,
        creator: document.getElementById('creator').value,
        published_date: new Date().toISOString().split('T')[0], // Current date
        info: {
            source: document.getElementById('source').value,
            links: [],  // Populate links array from the form
            references: []  // Populate references array from the form
        }
    };

    console.log(newArticle); // This should be sent to the server or processed accordingly
    alert('Artikkeli luotu!');
}
