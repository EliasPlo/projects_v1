// src/socket.ts
import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
  move: (data: { id: string; x: number; y: number }) => void;
}

interface ClientToServerEvents {
  move: (data: { id: string; x: number; y: number }) => void;
}

// Yhdistetään Socket.io palvelimeen
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3000');

export default socket;
