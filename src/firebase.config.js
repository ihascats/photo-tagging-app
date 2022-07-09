import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

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
