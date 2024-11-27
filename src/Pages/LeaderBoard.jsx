import React from "react";
import { useSelector } from "react-redux";

const players = [
  { id: 1, name: "Player 1", stars: 5, score: 2980 },
  { id: 2, name: "Player 2", stars: 4, score: 2721 },
  { id: 3, name: "Player 3", stars: 4, score: 2579 },
  { id: 4, name: "Player 4", stars: 3, score: 1874 },
  { id: 5, name: "Player 5", stars: 2, score: 1756 },
];

const Leaderboard = () => {
    const {users} = useSelector((state)=> state.users);
    console.log(users , "llllllllllllll");
    
  return (

    <div className="bg-blue-900 p-4 rounded-lg w-full max-w-md mx-auto">
      <h1 className="text-white text-center text-xl font-bold mb-4">Leaderboard</h1>
      <div className="space-y-2">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="flex items-center justify-between bg-blue-700 p-2 rounded-md text-white"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-blue-900 font-bold">
                {index + 1 <= 3 ? (
                  <span>
                    {index + 1 === 1
                      ? "🥇"
                      : index + 1 === 2
                      ? "🥈"
                      : "🥉"}
                  </span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div>
                <p>{player.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < player.stars ? "text-yellow-400" : "text-gray-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p>{player.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
