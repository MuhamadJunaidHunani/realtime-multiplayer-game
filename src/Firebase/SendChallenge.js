import { getFirestore, doc, setDoc, deleteDoc } from 'firebase/firestore';

export const sendChallenge = async (challengerId, opponentId) => {
  const db = getFirestore();
  const challengeRef = doc(db, 'users', opponentId, 'challenges', challengerId);

  const challengeData = {
    challengerId,
    status: 'pending',
    createdAt: Date.now(),
  };

  await setDoc(challengeRef, challengeData);

  setTimeout(async () => {
    const challengeSnapshot = await challengeRef.get();
    if (challengeSnapshot.exists() && challengeSnapshot.data().status === 'pending') {
      await deleteDoc(challengeRef);
    }
  }, 30000);
};
