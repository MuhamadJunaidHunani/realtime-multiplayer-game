import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const ChallengesQueue = ({ currentUser }) => {
  const [challenges, setChallenges] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const challengesRef = collection(db, 'users', currentUser.id, 'challenges');
    const unsubscribe = onSnapshot(challengesRef, (snapshot) => {
      const newChallenges = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChallenges(newChallenges);
    });

    return () => unsubscribe();
  }, [currentUser, db]);

  const acceptChallenge = async (challengeId) => {
    const challengeRef = doc(db, 'users', currentUser.id, 'challenges', challengeId);
    await updateDoc(challengeRef, { status: 'accepted' });

    // Redirect to game room (room ID can be challengeId)
    window.location.href = `/game/${challengeId}`;
  };

  const rejectChallenge = async (challengeId) => {
    const challengeRef = doc(db, 'users', currentUser.id, 'challenges', challengeId);
    await updateDoc(challengeRef, { status: 'rejected' });
    await deleteDoc(challengeRef); // Remove the challenge after rejection
  };

  return (
    <div>
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
                  <button onClick={() => acceptChallenge(challenge.id)}>Accept</button>
                  <button onClick={() => rejectChallenge(challenge.id)}>Reject</button>
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
