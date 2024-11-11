// src/App.tsx
import React, { useEffect, useState } from 'react';
import socket from './socket';

interface Player {
  id: string;
  x: number;
  y: number;
}

function App() {
  const [player, setPlayer] = useState<Player>({ id: socket.id, x: 0, y: 0 });
  const [opponents, setOpponents] = useState<Player[]>([]);

  useEffect(() => {
    // Kuuntele muiden pelaajien liikkeitä
    socket.on('move', (data) => {
      setOpponents((prev) => {
        const updated = prev.filter((opp) => opp.id !== data.id);
        updated.push(data);
        return updated;
      });
    });

    return () => {
      socket.off('move');
    };
  }, []);

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    const newPosition = { ...player };

    if (direction === 'up') newPosition.y -= 10;
    else if (direction === 'down') newPosition.y += 10;
    else if (direction === 'left') newPosition.x -= 10;
    else if (direction === 'right') newPosition.x += 10;

    setPlayer(newPosition);
    socket.emit('move', { id: player.id, x: newPosition.x, y: newPosition.y });
  };

  return (
    <div>
      <h1>Verkkopeli</h1>
      <button onClick={() => handleMove('up')}>Ylös</button>
      <button onClick={() => handleMove('down')}>Alas</button>
      <button onClick={() => handleMove('left')}>Vasen</button>
      <button onClick={() => handleMove('right')}>Oikea</button>

      <div
        style={{
          position: 'absolute',
          left: player.x,
          top: player.y,
          width: 20,
          height: 20,
          backgroundColor: 'blue',
        }}
      />
      {opponents.map((opponent) => (
        <div
          key={opponent.id}
          style={{
            position: 'absolute',
            left: opponent.x,
            top: opponent.y,
            width: 20,
            height: 20,
            backgroundColor: 'red',
          }}
        />
      ))}
    </div>
  );
}

export default App;
