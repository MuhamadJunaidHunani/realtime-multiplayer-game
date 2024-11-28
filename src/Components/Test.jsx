import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://realtime-game-backend-production.up.railway.app/',{
  transports: ["websocket" , "polling"], 
});


function Test() {
  const [players, setPlayers] = useState({});
  const [myId, setMyId] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(()=>{
    console.log("📒📒");
    
  })

  useEffect(() => {
    console.log("hello world");
    // Initialize with current players
    socket.on('init', (playersData) => {
      setPlayers(playersData);
      
    });

    // Add a new player
    socket.on('new-player', ({ id, car }) => {
      setPlayers((prev) => ({ ...prev, [id]: car }));
    });

    // Update car position
    socket.on('car-update', ({ id, car }) => {
      setPlayers((prev) => ({ ...prev, [id]: car }));
    });

    socket.on('winner', (id) => {
        setWinner(id);
        alert(`Player ${id === myId ? 'You' : id} won the game!`);
      });

    // Remove disconnected player
    socket.on('player-disconnect', (id) => {
      setPlayers((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } , []);

    // Set your ID
    socket.on('connect', () => {
      setMyId(socket.id);
    });

    return () => {
      socket.off('init');
      socket.off('new-player');
      socket.off('car-update');
      socket.off('player-disconnect');
      socket.off('winner');
    };
  }, [myId]);

  const moveCar = (direction) => {
    const newPosition = { ...players[myId] };
    if (direction === 'right') newPosition.x += 10;
    if (direction === 'left') newPosition.x -= 10;
    if (direction === 'up') newPosition.y -= 10;
    if (direction === 'down') newPosition.y += 10;

    setPlayers((prev) => ({ ...prev, [myId]: newPosition }));
    socket.emit('car-move', newPosition); // Notify the server
  };

  return (
    <div>
      <h1>Car Racing Game</h1>
      <div
        style={{
          position: 'relative',
          width: '800px',
          height: '400px',
          border: '1px solid black',
          overflow: 'hidden',
        }}
      >
        {Object.keys(players).map((id) => (
          <div
            key={id}
            style={{
              position: 'absolute',
              left: `${players[id].x}px`,
              top: `${players[id].y}px`,
              width: '50px',
              height: '30px',
              backgroundColor: players[id].color,
              border: id === myId ? '2px solid black' : 'none',
            }}
          />
        ))}
      </div>
      <button onClick={() => moveCar('up')}>Up</button>
      <button onClick={() => moveCar('down')}>Down</button>
      <button onClick={() => moveCar('left')}>Left</button>
      <button onClick={() => moveCar('right')}>Right</button>
    </div>
  );
}

export default Test;
