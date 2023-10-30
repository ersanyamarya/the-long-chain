// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyDWh9ytq7DeqAE6TU44I9WMnwThgIPasBY',
  authDomain: 'aryantriki.firebaseapp.com',
  projectId: 'aryantriki',
  storageBucket: 'aryantriki.appspot.com',
  messagingSenderId: '71121844826',
  appId: '1:71121844826:web:a5c2eff42de994ef3d3663',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
export { auth, googleProvider }
