import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, collection, addDoc } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBd_4pXt68g3gEQSBbMRcL910ezUPone3Y',
  authDomain: 'soliphototag.firebaseapp.com',
  projectId: 'soliphototag',
  storageBucket: 'soliphototag.appspot.com',
  messagingSenderId: '248274114142',
  appId: '1:248274114142:web:8b2e2b15f07db9cd99c6cf',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

export const sendTime = async (info, currentGame) => {
  const leaderboardRef = collection(db, `${currentGame}Leaderboard`);
  try {
    await addDoc(leaderboardRef, {
      username: info.username,
      time: info.time,
    });
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
  }
};
