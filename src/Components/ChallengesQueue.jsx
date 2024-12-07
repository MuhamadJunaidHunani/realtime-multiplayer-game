import React, { useState, useEffect } from 'react';
import { acceptChallenge, getChallenges, rejectChallenge } from '../Firebase/UpdateChallanges';
import { generateChallengeId } from '../Firebase/generateConversationId';
import GameRedirect from './GameRedirect';

const ChallengesQueue = ({ currentUser, users }) => {
  const [challenges, setChallenges] = useState([]);
  const [redirectRoomId, setRedirectRoomId] = useState(null);

  useEffect(() => {
    const unsubscribe = getChallenges(currentUser.uid, setChallenges);
    return () => unsubscribe();
  }, [currentUser]);

  const handleAcceptChallenge = async (challengeId) => {
    await acceptChallenge(currentUser.uid, challengeId);
    const roomId = generateChallengeId(currentUser.uid, challengeId);
    setRedirectRoomId(roomId);
  };

  const handleRejectChallenge = async (challengeId) => {
    await rejectChallenge(currentUser.uid, challengeId);
  };

  if (redirectRoomId) {
    return <GameRedirect roomId={redirectRoomId} />;
  }

  return (
    <div className="p-4 w-[30%] mx-auto border-l-4 border-[#b6b1b1]">
      <h2 className="text-2xl font-semibold text-center text-white mb-5">
        Challenges Queue
      </h2>
      {challenges.length === 0 ? (
        <p className="text-center text-gray-500">No challenges at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {challenges.map((challenge) => (
            <li
              key={challenge.id}
              className="flex items-center justify-between px-4 py-3 bg-[#000000b1] border-2 border-[#c5bcbc] rounded-lg shadow-sm"
            >
              <div>
                <p className="font-medium text-white">
                  Challenge from
                </p>
                <p className="text-sm text-gray-500 capitalize">  <span className="text-green-600">
                    {users?.find((user) => user.id === challenge?.challengerId)?.name || 'Unknown User'}
                  </span> {challenge.status}</p>
              </div>
              {challenge.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAcceptChallenge(challenge.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectChallenge(challenge.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChallengesQueue;
