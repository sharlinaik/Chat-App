import React, { useState } from "react";
import './App.css';

const App = () => {
  // Static messages
  const staticMessages = [
    { sender: "Bot", content: "Hey, how's it going?" },
    { sender: "Bot", content: "Doing well, just working on a project." }
  ];

  // Dynamic messages (user's messages)
  const [dynamicMessages, setDynamicMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Track the index of the next static message to show
  const [staticIndex, setStaticIndex] = useState(1); // Start from the second static message

  // Handle message input change
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Handle sending a new user message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add user's dynamic message
      setDynamicMessages((prevMessages) => [
        ...prevMessages,
        { sender: "You", content: newMessage }
      ]);
      
      // After the user sends a message, update the staticIndex to show the next static message
      if (staticIndex < staticMessages.length) {
        setStaticIndex(staticIndex + 1);
      }
      
      setNewMessage(""); // Clear the input after sending
    }
  };

  // Function to get all messages in the desired sequence
  const getMessages = () => {
    const combinedMessages = [];

    // Always push the first static message at the beginning
    combinedMessages.push(staticMessages[0]);

    // Now alternate between dynamic and static messages
    for (let i = 0; i < dynamicMessages.length; i++) {
      combinedMessages.push(dynamicMessages[i]); // Push dynamic message
      
      // Push static message if available
      if (i + 1 < staticIndex) {
        combinedMessages.push(staticMessages[i + 1]);
      }
    }

    return combinedMessages;
  };

  const allMessages = getMessages();

  return (
    <div className="chat-container">
      <h2>Chat App</h2>
      <div className="chat-box">
        {allMessages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'You' ? 'your-message' : ''}`}>
            <strong>{msg.sender}: </strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
