import React, { useState, useEffect } from 'react';
import { acceptChallenge, getChallenges, rejectChallenge } from '../Firebase/UpdateChallanges';
import { generateChallengeId } from '../Firebase/generateConversationId';
import GameRedirect from './GameRedirect';

const ChallengesQueue = ({ currentUser }) => {
  const [challenges, setChallenges] = useState([]);
  const [redirectRoomId, setRedirectRoomId] = useState(null);

  useEffect(() => {
    const unsubscribe = getChallenges(currentUser.uid, setChallenges);
    return () => unsubscribe();
  }, [currentUser]);

  const handleAcceptChallenge = async (challengeId) => {
    await acceptChallenge(currentUser.uid, challengeId);
    const roomId = generateChallengeId(currentUser.uid , challengeId);
    console.log(roomId);
    setRedirectRoomId(roomId); 
  };

  const handleRejectChallenge = async (challengeId) => {
    await rejectChallenge(currentUser.uid, challengeId);
  };

  if (redirectRoomId) {
    return <GameRedirect roomId={redirectRoomId} />;
  }


  return (
    <div className='w-[300px] p-[20px] border'>
      <h2>Challenges Queue</h2>
      {challenges.length === 0 ? (
        <p>No challenges at the moment.</p>
      ) : (
        <ul>
          {challenges.map((challenge) => (
            <li key={challenge.id}>
              Challenge from {challenge.challengerId} - {challenge.status}
              {challenge.status === 'pending' && (
                <>
                  <button onClick={() => handleAcceptChallenge(challenge.id)}>Accept</button>
                  <button onClick={() => handleRejectChallenge(challenge.id)}>Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChallengesQueue;
