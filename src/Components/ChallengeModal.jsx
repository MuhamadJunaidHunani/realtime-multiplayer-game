import React, { useState, useEffect } from 'react';
import { getChallenges } from '../Firebase/UpdateChallanges';
import { generateChallengeId } from '../Firebase/generateConversationId';
import GameRedirect from './GameRedirect';

const ChallengeModal = ({ challenger, opponent, setChallengedPlayer }) => {
  const [status, setStatus] = useState('pending');
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const unsubscribe = getChallenges(opponent.id, (data) => {
      const currentChallenge = data?.find((challenge) => challenge.id === challenger.uid);
      if (currentChallenge) {
        setStatus(currentChallenge.status);
        if (currentChallenge.status !== 'pending') {
          setChallengedPlayer(null);
        }
      }
    });

    const timeout = setTimeout(() => {
      setChallengedPlayer(null);
      setShowModal(false); // Hide modal with transition
    }, 30000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [opponent, challenger, setChallengedPlayer]);

  if (status === 'accepted') {
    const redirectRoomId = generateChallengeId(challenger.uid, opponent.id);
    return <GameRedirect roomId={redirectRoomId} />;
  }

  return (
    showModal && (
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-5 w-[300px] p-4 bg-white border border-green-500 rounded shadow-lg transition-transform duration-500 ${
          status === 'expired' || status === 'rejected' ? 'translate-y-[-100%]' : 'translate-y-0'
        }`}
      >
        {status === 'pending' && (
          <p className="text-center text-gray-700 font-medium">
            Waiting for <span className="text-green-600 font-semibold">{opponent.name}</span> to accept your challenge...
          </p>
        )}
        {status === 'expired' && (
          <p className="text-center text-red-600 font-medium">The challenge has expired.</p>
        )}
        {status === 'accepted' && (
          <p className="text-center text-green-600 font-medium">Challenge accepted! Redirecting...</p>
        )}
        {status === 'rejected' && (
          <p className="text-center text-red-600 font-medium">Challenge rejected.</p>
        )}
      </div>
    )
  );
};

export default ChallengeModal;
