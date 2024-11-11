// server.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send("Server is running!");
});

// Kun uusi pelaaja liittyy
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Kuuntele pelaajan liikkeitä
  socket.on('move', (data) => {
    // Lähetä muiden pelaajien tietokoneille
    socket.broadcast.emit('move', data);
  });

  // Kun pelaaja irrottaa yhteyden
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
