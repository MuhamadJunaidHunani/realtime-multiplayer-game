import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './Firebase';

export const getChallenges = (CurrentUserId, callback) => {
  const challengesRef = collection(db, 'users', CurrentUserId, 'challenges');
  const unsubscribe = onSnapshot(challengesRef, (snapshot) => {
    const challenges = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(challenges);
  });
  return unsubscribe;
};

export const acceptChallenge = async (CurrentUserId, challengeId) => {
  const challengeRef = doc(db, 'users', CurrentUserId, 'challenges', challengeId);
  await updateDoc(challengeRef, { status: 'accepted' });
};

export const rejectChallenge = async (CurrentUserId, challengeId) => {
  const challengeRef = doc(db, 'users', CurrentUserId, 'challenges', challengeId);
  await updateDoc(challengeRef, { status: 'rejected' });
  await deleteDoc(challengeRef);
};
