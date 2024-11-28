import React, { useState, useEffect } from 'react';
import { getChallenges } from '../Firebase/UpdateChallanges';
import { generateChallengeId } from '../Firebase/generateConversationId';

const ChallengeModal = ({ challenger, opponent, setChallengedPlayer }) => {
  const [status, setStatus] = useState('pending');


  useEffect(() => {
    const unsubscribe = getChallenges(opponent.id, (data) => {
      console.log(data, "<<<==>>>");
      const currentChallenge = data?.find((data) => data.id === challenger.uid)
      setStatus(currentChallenge.status)
      currentChallenge.status !== "pending" ? setChallengedPlayer(null):''
    });

    const timeout = setTimeout(async () => {
      setChallengedPlayer(null);
    }, 30000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [opponent , challenger]);

  if (status === 'accepted' ) {
    const redirectRoomId = generateChallengeId(challenger.uid , opponent.id)
    return <GameRedirect roomId={redirectRoomId} />;
  }

  return (
    <div className='w-[300px] p-[20px] border-2 border-[green]'>
      {status === 'pending' && <p>Waiting for {opponent.name} to accept your challenge...</p>}
      {status === 'expired' && <p>The challenge has expired.</p>}
      {status === 'accepted' && <p>Challenge accepted! Redirecting...</p>}
      {status === 'rejected' && <p>Challenge rejected.</p>}
    </div>
  );
};

export default ChallengeModal;
