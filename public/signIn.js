// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log('test')
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8QVC-W-rGVm9E9ecgge8EkzR-0iAXrpc",
    authDomain: "todocalendar-412f4.firebaseapp.com",
    projectId: "todocalendar-412f4",
    storageBucket: "todocalendar-412f4.appspot.com",
    messagingSenderId: "390855221798",
    appId: "1:390855221798:web:9e0751fd800b01bc0f7ce7",
    measurementId: "G-CRY0V56CX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let uid = '';

const submit = document.getElementById('login');
submit.addEventListener('click', async function () {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('error has occurred: ' + errorCode + " " + errorMessage)

        });
        
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            let uid = user.uid;  
            console.log('Logging In...');
            localStorage.setItem('uidKey', uid)
            window.location.href = 'todoCalendar.html';
            return uid;
            // ...
          } else {
            // User is signed out
            // ...
          }
        });
});





  
const signUp = document.getElementById('signUp');
signUp.addEventListener('click', function() {
    window.location.href = 'index.html';
})