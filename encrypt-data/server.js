const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3090;

app.use(express.json());

const cryptedDir = path.join(__dirname, "data/crypted");
const decryptedDir = path.join(__dirname, "data/decrypted");

if (!fs.existsSync(cryptedDir)) fs.mkdirSync(cryptedDir, { recursive: true });
if (!fs.existsSync(decryptedDir)) fs.mkdirSync(decryptedDir, { recursive: true });

app.post("/encrypt", (req, res) => {
    const { text, format } = req.body;
    if (!text || !format) return res.status(400).json({ error: "Text and format are required" });

    const encryptedText = format === "base64" 
        ? Buffer.from(text, "utf8").toString("base64") 
        : Buffer.from(text, "utf8").toString("binary");

    const filename = `encrypted_${Date.now()}.json`;
    const filePath = path.join(cryptedDir, filename);
    fs.writeFileSync(filePath, JSON.stringify({ encryptedText }));

    res.json({ message: "Text encrypted and saved", file: filename });
});

app.post("/decrypt", (req, res) => {
    const { file } = req.body;
    const filePath = path.join(cryptedDir, file);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File not found" });

    const { encryptedText } = JSON.parse(fs.readFileSync(filePath));
    const decodedText = Buffer.from(encryptedText, "base64").toString("utf8");

    const filename = `decrypted_${Date.now()}.json`;
    const filePathDec = path.join(decryptedDir, filename);
    fs.writeFileSync(filePathDec, JSON.stringify({ decodedText }));

    res.json({ message: "Text decrypted and saved", file: filename });
});

app.get("/files/encrypted", (req, res) => {
    const files = fs.readdirSync(cryptedDir);
    res.json(files);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
