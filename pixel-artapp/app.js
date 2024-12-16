let canvas = document.getElementById("pixelCanvas");
let ctx = canvas.getContext("2d");
let currentColor = "#000000";  // Alustava väri
let pixelSize = 10;  // Alustava pikselikoko
let isDrawing = false;
let tool = 'draw';  // Piirtotyökalu (draw, rectangle, circle, fill)
let animationFrames = [];  // Animaatiokehiä tallentamaan
let zoomLevel = 1;  // Zoomaustaso

// Luodaan ruudukko
function createGrid() {
    for (let x = 0; x < canvas.width; x += pixelSize) {
        for (let y = 0; y < canvas.height; y += pixelSize) {
            ctx.strokeStyle = "#ddd";  // Vaaleat rajat
            ctx.strokeRect(x, y, pixelSize, pixelSize);
        }
    }
}

// Värihaarakkeen valinta
function changeColor(color) {
    currentColor = color;
}

// Työkalun vaihto
function setTool(newTool) {
    tool = newTool;
}

// Piirtäminen ja muodot
canvas.addEventListener('mousedown', function (e) {
    isDrawing = true;
    if (tool === 'fill') {
        fillArea(e);
    } else {
        drawPixel(e);
    }
});

canvas.addEventListener('mouseup', function () {
    isDrawing = false;
});

canvas.addEventListener('mousemove', function (e) {
    if (isDrawing && tool === 'draw') {
        drawPixel(e);
    }
    if (isDrawing && tool === 'rectangle') {
        drawRectangle(e);
    }
    if (isDrawing && tool === 'circle') {
        drawCircle(e);
    }
});

// Piirrä pikseli
function drawPixel(e) {
    const x = Math.floor(e.offsetX / pixelSize) * pixelSize;
    const y = Math.floor(e.offsetY / pixelSize) * pixelSize;
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, pixelSize, pixelSize);
}

// Piirrä suorakulmio
function drawRectangle(e) {
    const x = Math.floor(e.offsetX / pixelSize) * pixelSize;
    const y = Math.floor(e.offsetY / pixelSize) * pixelSize;
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, pixelSize * 5, pixelSize * 5);  // Esimerkki: suorakulmion koko 5x5
}

// Piirrä ympyrä
function drawCircle(e) {
    const x = Math.floor(e.offsetX / pixelSize) * pixelSize;
    const y = Math.floor(e.offsetY / pixelSize) * pixelSize;
    ctx.beginPath();
    ctx.arc(x + pixelSize / 2, y + pixelSize / 2, pixelSize * 2, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    ctx.fill();
}

// Täytä alue väreillä
function fillArea(e) {
    const x = Math.floor(e.offsetX / pixelSize) * pixelSize;
    const y = Math.floor(e.offsetY / pixelSize) * pixelSize;
    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, pixelSize, pixelSize);  // Täyttää yhden pikselin
}

// Tyhjennä kangas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createGrid();
}

// Tallenna kangas
function saveCanvas() {
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "pixel-art.png";
    link.click();
}

// Zoomaustoiminto
function zoomIn() {
    zoomLevel += 0.1;
    pixelSize = Math.max(5, pixelSize * zoomLevel);
    redrawCanvas();
}

function zoomOut() {
    zoomLevel -= 0.1;
    pixelSize = Math.max(5, pixelSize * zoomLevel);
    redrawCanvas();
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createGrid();
}

// Alustetaan ruudukko
createGrid();
