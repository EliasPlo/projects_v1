// Canvas ja konteksti
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// UI elementit
const fileInput = document.getElementById("fileInput");
const imageNameInput = document.getElementById("imageName");
const imageWidthInput = document.getElementById("imageWidth");
const imageHeightInput = document.getElementById("imageHeight");
const createNewImageBtn = document.getElementById("createNewImageBtn");
const clearCanvasBtn = document.getElementById("clearCanvasBtn");
const downloadBtn = document.getElementById("downloadBtn");
const pencilTool = document.getElementById("pencilTool");
const brushTool = document.getElementById("brushTool");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const contrastBtn = document.getElementById("contrastBtn");
const cropBtn = document.getElementById("cropBtn");
const resizeBtn = document.getElementById("resizeBtn");
const textInput = document.getElementById("textInput");
const addTextBtn = document.getElementById("addTextBtn");

// Kuvan ja piirrosasetusten muuttujat
let img = new Image();
let isDrawing = false;
let tool = 'pencil';
let currentColor = '#000000';
let currentBrushSize = 5;
let currentImageData;
let layers = [];

// Kuvan lataaminen ja näyttäminen
fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.onload = function() {
                // Kuvan asetukset ja piirtäminen canvasille
                const width = canvas.width = img.width;
                const height = canvas.height = img.height;
                ctx.drawImage(img, 0, 0, width, height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Aloita uusi kuva
createNewImageBtn.addEventListener("click", () => {
    const width = parseInt(imageWidthInput.value);
    const height = parseInt(imageHeightInput.value);
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layers = [];
    img = new Image(); // Tyhjennetään vanha kuva
});

// Piirrustustyökalujen logiikka
pencilTool.addEventListener("click", () => tool = 'pencil');
brushTool.addEventListener("click", () => tool = 'brush');
colorPicker.addEventListener("input", (e) => currentColor = e.target.value);
brushSize.addEventListener("input", (e) => currentBrushSize = e.target.value);

// Piirroksen alku ja loppu
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});
canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        if (tool === 'pencil') {
            ctx.lineWidth = 1;
            ctx.strokeStyle = currentColor;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        } else if (tool === 'brush') {
            ctx.lineWidth = currentBrushSize;
            ctx.lineJoin = ctx.lineCap = 'round';
            ctx.strokeStyle = currentColor;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    }
});
canvas.addEventListener("mouseup", () => isDrawing = false);

// Tyhjennä canvas
clearCanvasBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layers = [];
});

// Kuvan lataaminen ja tallentaminen
downloadBtn.addEventListener("click", () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL(); // Kuvan base64-muoto
    const imageName = imageNameInput.value || 'muokattu_kuva';
    link.download = `${imageName}.png`;
    link.click();
});

// Kontrasti
contrastBtn.addEventListener("click", () => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * 1.2; // Punainen
        data[i + 1] = data[i + 1] * 1.2; // Vihreä
        data[i + 2] = data[i + 2] * 1.2; // Sininen
    }
    ctx.putImageData(imageData, 0, 0);
});

// Rajaus
cropBtn.addEventListener("click", () => {
    const x = 50, y = 50, width = 200, height = 200;
    const imageData = ctx.getImageData(x, y, width, height);
    canvas.width = width;
    canvas.height = height;
    ctx.putImageData(imageData, 0, 0);
});

// Tekstin lisääminen
addTextBtn.addEventListener("click", () => {
    const text = textInput.value;
    const x = 50, y = 50; // Esimerkkikohta
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(text, x, y);
});

// Täydennys ja retusointi
// Täydennys ja retusointi ovat edistyneempiä toimintoja, joita voidaan toteuttaa käsin yksittäisillä pikseleillä tai kehittyneemmillä algoritmeilla.
// Tämä voi vaatia erillisen kirjaston, kuten **Fabric.js** tai **pixi.js**.
