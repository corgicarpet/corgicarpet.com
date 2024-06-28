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
firebase.initializeApp(firebaseConfig);
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

    // Save the message to the backend
    saveMessage(newMessage);
    
    // Clear the form
    document.getElementById('messageForm').reset();
});

// Function to save the message to the backend
function saveMessage(message) {
    const messageRef = database.ref('messages').push();
    messageRef.set(message);
}

// Function to load messages from the backend
function loadMessages() {
    const messagesRef = database.ref('messages');
    messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val();
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = '';

        for (let id in messages) {
            const message = messages[id];
            const messageDiv = document.createElement('div');
            messageDiv.innerHTML = `<strong>${message.username}</strong>: ${message.message} <em>${new Date(message.timestamp).toLocaleString()}</em>`;
            messagesDiv.appendChild(messageDiv);
        }
    });
}

// Call loadMessages to fetch and display messages when the page loads
loadMessages();
