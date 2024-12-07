import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from './Firebase';

export const updateUserStats = async (userId, field, value) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      [field]: increment(value),
    });
    console.log(`${field} updated successfully!`);
  } catch (error) {
    console.error(`Failed to update ${field}:`, error);
  }
};
