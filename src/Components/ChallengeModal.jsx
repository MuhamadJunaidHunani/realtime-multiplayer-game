import React, { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { generateChallengeId } from '../Firebase/generateConversationId';
import { db } from '../Firebase/Firebase';

const ChallengeModal = ({ challenger, opponent, onResult }) => {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const challengeId = generateChallengeId(challenger.id , opponent.id);
    const challengeRef = doc(db, 'challenges', challengeId);

    setDoc(challengeRef, {
      challengerId: challenger.uid,
      opponentId: opponent.id,
      status: 'pending',
      createdAt: Date.now(),
    });

    const unsubscribe = onSnapshot(challengeRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setStatus(data.status);
      }
    });

    const timeout = setTimeout(async () => {
      await deleteDoc(challengeRef);
      setStatus('expired');
    }, 30000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [challenger, opponent, db]);

  useEffect(() => {
    if (status !== 'pending') onResult(status);
  }, [status, onResult]);

  return (
    <div>
      <h2>Waiting for {opponent.name} to accept your challenge...</h2>
      {status === 'expired' && <p>The challenge has expired.</p>}
      {status === 'accepted' && <p>Challenge accepted! Redirecting...</p>}
      {status === 'rejected' && <p>Challenge rejected.</p>}
    </div>
  );
};

export default ChallengeModal;
