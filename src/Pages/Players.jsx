import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChallengeModal from '../Components/ChallengeModal';
import PlayersList from '../Components/PlayersList';
import GameRedirect from '../Components/GameRedirect';
import Loader from '../Components/Loader';

const Players = () => {
  const { currentUser, currentUserLoading } = useSelector((state) => state.currentUser);
  const { users, userLoading } = useSelector((state) => state.users);
  const [challengedPlayer, setChallengedPlayer] = useState(null);
  const [challengeResult, setChallengeResult] = useState(null);

  const handleChallenge = (player) => {
    setChallengedPlayer(player);
  };

  if (currentUserLoading || userLoading) {
    return <Loader />
  }

  if (challengeResult === 'accepted') {
    const roomId = `${selectedPlayer.id}_${Math.random().toString(36).substr(2, 9)}`;
    return <GameRedirect roomId={roomId} />;
  }

  return (
    <div>
      <PlayersList onChallenge={handleChallenge} users={users} currentUser={currentUser}  />
      {challengedPlayer && (
        <ChallengeModal
          challenger={currentUser}
          opponent={challengedPlayer}
          onResult={setChallengeResult}
        />
      )}
    </div>
  );
};

export default Players;
