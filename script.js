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
