import { useState, useRef, useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Navbar from "./components/navbar";
import Chatapp from "./routes/Chat app/Chat app";
import NewUser from "./components/New_User";

function App() { 
  const [messages, setMessages] = useState([]);
  const [currentroom, setCurrentroom] = useState("General");
  const [username, setUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [directMessages, setDirectMessages] = useState({});
  const socket = useRef();

  useEffect(() => {
    if (username) {
      // Initialize socket connection
      socket.current = io('http://localhost:3000', {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling']
      });

      // Handle connection events
      socket.current.on('connect', () => {
        console.log('Connected to server');
        // Join room after connection
        socket.current.emit("join room", currentroom, username, (messages) => {
          setMessages(messages || []);
        });
      });

      socket.current.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });

      socket.current.on('error', (error) => {
        console.error('Socket error:', error);
      });

      // Handle incoming messages
      socket.current.on('message', (messageObj) => {
        console.log('New message:', messageObj);
        setMessages(prevMessages => [...prevMessages, messageObj]);
      });

      // Handle direct messages
      socket.current.on('direct message', (messageObj) => {
        const chatId = [messageObj.from, messageObj.to].sort().join('_');
        setDirectMessages(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), messageObj]
        }));
      });

      // Handle online users updates
      socket.current.on('userList', (users) => {
        setOnlineUsers(users.online || []);
      });

      // Cleanup on unmount
      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [currentroom, username]);

  const sendMessage = (message) => {
    if (socket.current && message.trim()) {
      socket.current.emit('messages', currentroom, message, username);
    }
  };

  const sendDirectMessage = (to, message) => {
    if (socket.current && message.trim()) {
      socket.current.emit('direct message', to, message, username);
    }
  };

  const changeRoom = (newRoom) => {
    setCurrentroom(newRoom);
    setMessages([]); // Clear messages when changing rooms
  };

  const handleUsernameSubmit = (newUsername, isNewUser) => {
    setUsername(newUsername);
    // If it's a new user, we could store this in localStorage or a database
    if (isNewUser) {
      localStorage.setItem('username', newUsername);
    }
  };
  
  return (
    <>
      {!username ? (
        <NewUser 
          onUsernameSubmit={handleUsernameSubmit}
        />
      ) : (
        <>
          <Navbar />
          <Chatapp 
            messages={messages} 
            username={username}
            onSendMessage={sendMessage}
            onSendDirectMessage={sendDirectMessage}
            currentRoom={currentroom}
            onRoomChange={changeRoom}
            onlineUsers={onlineUsers}
            directMessages={directMessages}
          />
        </>
      )}
    </>
  );
}

export default App;
