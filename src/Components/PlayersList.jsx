import React from 'react';

const PlayersList = ({ onChallenge , currentUser , users }) => {

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {users?.filter((player) => player.id !== currentUser?.uid)
          .map((player) => (
            <li key={player.id}>
              {player.name}
              <button onClick={() => onChallenge(player)}>Challenge</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PlayersList;
