const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware JSON-datan käsittelyyn
app.use(express.json());

// Tilausten tallennus /data/payments.json -tiedostoon
app.post("/api/saveOrder", (req, res) => {
  const orderData = req.body;

  // Luetaan nykyinen payments.json-tiedosto
  const filePath = path.join(__dirname, "data", "payments.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Virhe tiedoston lukemisessa:", err);
      return res.status(500).json({ message: "Tiedoston luku epäonnistui" });
    }

    // Parsitaan ja lisätään uusi tilaus
    let payments = [];
    try {
      payments = JSON.parse(data);
    } catch (error) {
      console.error("Virhe JSON-parsinnassa:", error);
    }

    payments.push(orderData);

    // Tallennetaan päivitetty payments.json-tiedosto
    fs.writeFile(filePath, JSON.stringify(payments, null, 2), (err) => {
      if (err) {
        console.error("Virhe tiedoston kirjoittamisessa:", err);
        return res.status(500).json({ message: "Tiedoston tallennus epäonnistui" });
      }

      res.status(200).json({ message: "Tilaus tallennettu onnistuneesti" });
    });
  });
});

// Palvelimen käynnistys
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
