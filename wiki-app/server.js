const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000; // Voit vaihtaa portin tarvittaessa

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Palvelin staattiset tiedostot public-kansiosta
app.use(express.static(path.join(__dirname, 'public')));

// Lataa JSON-tiedot
const loadData = () => {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data);
};

// Palvelin kaikki artikkelit
app.get('/api/articles', (req, res) => {
    const articles = loadData();
    res.json(articles);
});

// Palvelin yksittäinen artikkeli
app.get('/api/articles/:id', (req, res) => {
    const articles = loadData();
    const article = articles.articles.find(a => a.id == req.params.id);
    if (article) { 
        res.json(article);
    } else {
        res.status(404).send('Artikkelia ei löytynyt.');
    }
});

// Päivitä artikkeli
app.put('/api/articles/:id', (req, res) => {
    const articles = loadData();
    const index = articles.articles.findIndex(a => a.id == req.params.id);
    
    if (index !== -1) {
        articles.articles[index] = { id: req.params.id, ...req.body };
        fs.writeFileSync('data.json', JSON.stringify(articles, null, 2));
        res.send('Artikkeli päivitettiin onnistuneesti.');
    } else {
        res.status(404).send('Artikkelia ei löytynyt.');
    }
});

// Lisää uusi artikkeli
app.post('/api/articles', (req, res) => {
    const articles = loadData();
    const newId = articles.articles.length ? Math.max(...articles.articles.map(a => a.id)) + 1 : 1;
    const newArticle = { id: newId, ...req.body };
    
    articles.articles.push(newArticle);
    fs.writeFileSync('data.json', JSON.stringify(articles, null, 2));

    res.send('Uusi artikkeli lisätty onnistuneesti.');
});

// Poista artikkeli
app.delete('/api/articles/:id', (req, res) => {
    const articles = loadData();
    const articleIndex = articles.articles.findIndex(a => a.id == req.params.id);

    if (articleIndex !== -1) {
        articles.articles.splice(articleIndex, 1);
        fs.writeFileSync('data.json', JSON.stringify(articles, null, 2));
        res.send('Artikkeli poistettu onnistuneesti.');
    } else {
        res.status(404).send('Artikkelia ei löytynyt.');
    }
});

// Käynnistä palvelin
app.listen(PORT, () => {
    console.log(`Palvelin käynnistetty portissa ${PORT}`);
});
