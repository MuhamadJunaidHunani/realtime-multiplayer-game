import React from 'react';

const PlayersList = ({ onChallenge, currentUser, users, challengedPlayer }) => {
  return (
    <div className="p-4 w-[70%] overflow-y-auto h-[calc(100vh-92px)] custom-scrollbar ">
      <h2 className="text-3xl font-semibold text-center text-white mb-3">
        Players
      </h2>
      <ul className="space-y-4">
        {users?.filter((player) => player.id !== currentUser?.uid)
          .map((player) => (
            <li
              key={player.id}
              className="flex items-center justify-between px-4 py-3 bg-[#000000b1] border-2 border-[#c5bcbc] rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <img
                  src={player.profileImage || 'https://via.placeholder.com/40'}
                  alt={`${player.name}'s avatar`}
                  className="w-10 h-10 bg-[#4682B4] rounded-full mr-4"
                />
                <div className='flex flex-col'>

                <span className="text-[white] font-medium">{player.name}</span>
                <span className="text-[#9b9b9b] text-[10px] font-normal">Win: {player.win} , Lose: {player.lose}</span>
                </div>
              </div>
              <button
                onClick={() => onChallenge(player)}
                disabled={!!challengedPlayer}
                className={`px-4 py-2 font-semibold text-white rounded-lg ${
                  challengedPlayer
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                Challenge
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PlayersList;
