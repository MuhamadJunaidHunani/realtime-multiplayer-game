import React from "react";
import { useSelector } from "react-redux";
import Header from '../Components/Header';
import Loader from "../Components/Loader";
import plyersBgImage from '../assets/images/playersBg.jpg'



const players = [
  { id: 1, name: "Player 1", stars: 5, score: 2980 },
  { id: 2, name: "Player 2", stars: 4, score: 2721 },
  { id: 3, name: "Player 3", stars: 4, score: 2579 },
  { id: 4, name: "Player 4", stars: 3, score: 1874 },
  { id: 5, name: "Player 5", stars: 2, score: 1756 },
];

const Leaderboard = () => {
  const { users, userLoading } = useSelector((state) => state.users);
  if (userLoading) {
    return <Loader />
  }

  const calculateWinningPercentage = (wins, losses) => {
    if (wins === 0 && losses === 0) return 0;
    return (wins / (wins + losses)) * 100;
  };

  const sortedUsers = [...users].sort((a, b) => {
    const winPercentageA = calculateWinningPercentage(a.win, a.lose);
    const winPercentageB = calculateWinningPercentage(b.win, b.lose);

    return winPercentageB - winPercentageA;
  });

  return (
    <div style={{ backgroundImage: `url(${plyersBgImage})` }} className={`bg-center bg-cover bg-no-repeat h-screen`}>
      <div className='h-screen w-full bg-[#00000050] backdrop-blur-[10px]'>
        <Header />
        <div className="p-4 w-[100%] overflow-y-auto h-[calc(100vh-92px)] custom-scrollbar ">
          <h2 className="text-3xl font-semibold text-center text-white mb-3">
            Leader Boader
          </h2>
          <ul className="space-y-4">
            {sortedUsers?.map((player, index) => {
              const winPercentage = calculateWinningPercentage(player.win, player.lose);
              return (
                <li
                  key={player.id}
                  className="flex items-center justify-between px-4 py-3 bg-[#000000b1] border-2 border-[#c5bcbc] rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-between w-[100%]">

                    <div className="flex items-center">
                      <p className="text-[25px] text-[white] w-[50px] text-center">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                      </p>
                      <img
                        src={player.profileImage || 'https://via.placeholder.com/40'}
                        alt={`${player.name}'s avatar`}
                        className="w-10 h-10 bg-[#4682B4] rounded-full mr-4"
                      />
                      <span className="text-[white] font-medium text-[16px] ">{player.name}</span>
                    </div>

                    <span className="text-[white] font-medium text-[16px]  ">Win: {player.win}</span>
                    <span className="text-[white] font-medium text-[16px]  ">Lose: {player.lose}</span>
                    <span className="text-[white] font-medium text-[16px]  ">Win Percentage: {winPercentage.toFixed()}%</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default Leaderboard;
