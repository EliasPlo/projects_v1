// script.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => displayArticles(data.articles))
        .catch(error => console.error('Virhe ladattaessa dataa:', error));
});

function displayArticles(articles) {
    const container = document.getElementById('articles-container');
    container.innerHTML = ''; // Clear the container before adding articles

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';

        // Article Title
        const titleElement = document.createElement('h2');
        titleElement.textContent = article.title || "Otsikko puuttuu";
        articleDiv.appendChild(titleElement);

        // Article Content
        const contentElement = document.createElement('p');
        contentElement.textContent = article.content || "Sisältö puuttuu";
        articleDiv.appendChild(contentElement);

        // Additional Info
        if (article.additional_info) {
            const additionalInfoElement = document.createElement('p');
            additionalInfoElement.textContent = article.additional_info;
            articleDiv.appendChild(additionalInfoElement);
        }

        // Writer
        const writerElement = document.createElement('p');
        writerElement.textContent = `Kirjoittaja: ${article.writer || "Tuntematon"}`;
        articleDiv.appendChild(writerElement);

        // Creator
        const creatorElement = document.createElement('p');
        creatorElement.textContent = `Luojan nimi: ${article.creator || "Tuntematon"}`;
        articleDiv.appendChild(creatorElement);

        // Published Date
        const dateElement = document.createElement('p');
        dateElement.textContent = `Julkaisupäivämäärä: ${article.published_date || "Tuntematon"}`;
        articleDiv.appendChild(dateElement);

        // Source and Links
        if (article.info) {
            const sourceElement = document.createElement('p');
            sourceElement.textContent = `Lähde: ${article.info.source || "Ei saatavilla"}`;
            articleDiv.appendChild(sourceElement);

            // Links
            if (article.info.links && article.info.links.length > 0) {
                const linksDiv = document.createElement('div');
                linksDiv.className = 'links';
                linksDiv.innerHTML = '<strong>Linkit:</strong>';
                article.info.links.forEach(link => {
                    const linkElement = document.createElement('a');
                    linkElement.href = link.url;
                    linkElement.textContent = link.label;
                    linkElement.target = '_blank';
                    linksDiv.appendChild(linkElement);
                });
                articleDiv.appendChild(linksDiv);
            }

            // References
            if (article.info.references && article.info.references.length > 0) {
                const referencesDiv = document.createElement('div');
                referencesDiv.className = 'references';
                referencesDiv.innerHTML = '<strong>Viitteet:</strong>';
                article.info.references.forEach(reference => {
                    const referenceElement = document.createElement('a');
                    referenceElement.href = reference.url;
                    referenceElement.textContent = reference.title;
                    referenceElement.target = '_blank';
                    referencesDiv.appendChild(referenceElement);
                });
                articleDiv.appendChild(referencesDiv);
            }
        }

        container.appendChild(articleDiv);
    });
}
