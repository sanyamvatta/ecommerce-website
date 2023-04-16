// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider } from 'firebase/auth' 
import { getAnalytics } from "firebase/analytics";
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDECDVAN1nZzLkffESdP6hgpcW7So2tsME",
  authDomain: "crwn-clothing-db-a2363.firebaseapp.com",
  projectId: "crwn-clothing-db-a2363",
  storageBucket: "crwn-clothing-db-a2363.appspot.com",
  messagingSenderId: "469088426863",
  appId: "1:469088426863:web:29bbdbdf1224ae1199669a",
  measurementId: "G-PWPGWNNN1Q"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider  = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt : 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth)=>{
  const userDocRef = doc(db,'users',userAuth.uid)

  console.log(userDocRef)

  const userSnapShot = await getDoc(userDocRef)

  console.log(userSnapShot.exists())

  if(!userSnapShot.exists()){
    const {displayName,email} = userAuth
    const createdAt = new Date()

    try{
      await setDoc(userDocRef,{
        displayName:displayName,
        email:email,
        createdAt:createdAt
      })
    }catch(err){
      console.log('error creating user',err)
    }
  }

  return userDocRef;
  // if user data exists then return user Doc ref

  // if user does not exist then create /set the document for the user based on the userAuth using userSnapshot
}