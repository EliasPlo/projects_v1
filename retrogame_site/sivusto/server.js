// Tuodaan tarvittavat moduulit
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

// Luodaan Express-sovellus
const app = express();

// Keskitetään middlewaret
app.use(cors()); // Mahdollistaa CORS-pyynnöt
app.use(bodyParser.json()); // Mahdollistaa JSON-datan käsittelyn

// Endpoint pelitietojen hakemiseen
app.get('/data/games.json', (req, res) => {
    fs.readFile('data/games.json', (err, data) => {
        if (err) {
            return res.status(500).send('Virhe tiedoston lukemisessa');
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint pelitietojen päivittämiseen
app.put('/data/games.json', (req, res) => {
    fs.writeFile('data/games.json', JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Virhe tiedoston kirjoittamisessa');
        }
        res.sendStatus(200); // Onnistunut vastaus
    });
});

// Palvelin kuuntelee portissa 5500
app.listen(5500, () => {
    console.log('Palvelin käynnistyi osoitteessa http://localhost:5500');
});
