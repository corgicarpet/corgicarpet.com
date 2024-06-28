// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6EYgNG0YAIQaHYuYRC7OkNkjM2YlibEk",
  authDomain: "corgicarpet-2b755.firebaseapp.com",
  databaseURL: "https://corgicarpet-2b755-default-rtdb.firebaseio.com/",
  projectId: "corgicarpet-2b755",
  storageBucket: "corgicarpet-2b755.appspot.com",
  messagingSenderId: "1039226205657",
  appId: "1:1039226205657:web:5968db94185f840c2355c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    // Create a new message object
    const newMessage = {
        username: username,
        message: message,
        timestamp: new Date().toISOString()
    };

    // Save the message to the backend (we'll use a service like Firebase)
    saveMessage(newMessage);
    
    // Clear the form
    document.getElementById('messageForm').reset();
});

// Function to save the message to the backend
function saveMessage(message) {
    // Here, you'll implement saving to a third-party backend
    // For example, using Firebase Realtime Database or Firestore
    console.log('Message saved:', message);
}

// Function to load messages from the backend
function loadMessages() {
    // Here, you'll implement loading messages from the third-party backend
    // For example, using Firebase Realtime Database or Firestore
    console.log('Messages loaded');
}

// Call loadMessages to fetch and display messages when the page loads
loadMessages();
