import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC_JsW6Air2Worty7NIT3mJga6UR0dLWOo",
  authDomain: "dotpotapp.firebaseapp.com",
  projectId: "dotpotapp",
  storageBucket: "dotpotapp.appspot.com",
  messagingSenderId: "472590500824",
  appId: "1:472590500824:web:13d51f52e5ba138c6be8ad",
  measurementId: "G-D625VFN370"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth();
function login(email, password) {

  return new Promise((resolve, reject) => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log('Signed In User', user.displayName)
        resolve(user)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Sign In failed ', error.message)
        reject(error)
      });

  })

}

var loginListener = function () {

}

function setOnLoggedListener(listener) {
  loginListener = listener;
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginListener(user)
  } else {
    loginListener(undefined)
  }
});
export default {
  firebaseapp: app,
  auth: auth,
  login: login,
  logout: function () {
    signOut(auth)
  },
  setOnLoggedListener: setOnLoggedListener
};