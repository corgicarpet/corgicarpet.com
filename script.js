// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIoYx1wJe0V5Rl_YlvLnye09RpnkuDhvo",
    authDomain: "corgicarpet-com.firebaseapp.com",
    databaseURL: "https://corgicarpet-com-default-rtdb.firebaseio.com/", // <-- Make sure this is correct
    projectId: "corgicarpet-com",
    storageBucket: "corgicarpet-com.appspot.com", // <-- Corrected this
    messagingSenderId: "766693233014",
    appId: "1:766693233014:web:7d4ffd414e8f935a15ea57",
    measurementId: "G-GD5WHC7P76"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Reference messages
const messagesRef = db.ref("messages");

// Send message function
function sendMessage() {
    let input = document.getElementById("chat-input");
    let message = input.value.trim();

    if (message !== "") {
        messagesRef.push().set({
            text: message,
            timestamp: Date.now()
        });
        input.value = ""; // Clear input
    }
}

// Listen for new messages
messagesRef.on("child_added", (snapshot) => {
    let message = snapshot.val();
    let messageDiv = document.createElement("div");
    messageDiv.textContent = message.text;
    document.getElementById("chat-messages").appendChild(messageDiv);
});
