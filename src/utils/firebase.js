// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCQOLK_JKtNStDr_bxrzpLXygpkzyRoKkU',
  authDomain: 'self-presentation-2d119.firebaseapp.com',
  projectId: 'self-presentation-2d119',
  storageBucket: 'self-presentation-2d119.appspot.com',
  messagingSenderId: '254869811331',
  appId: '1:254869811331:web:ea109dfd6cc5796a536bb6',
  measurementId: 'G-JXPXWD0Q4Y',
};
let instance;
export const getFirebase = () => {
  if (typeof window !== 'undefined') {
    if (instance) {return instance;}
    instance = initializeApp(firebaseConfig);
    const analytics = getAnalytics(instance);
    return { instance, analytics };
  }

  return null;
};
