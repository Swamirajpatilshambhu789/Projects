// Importing the necessary modules
import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import { Msg as GeneralMsg } from './Models/Collections/General.js';
import { Msg as MemesMsg } from './Models/Collections/Memes.js';
import { Msg as GamesMsg } from './Models/Collections/Games.js';
import { Msg as JokesMsg } from './Models/Collections/Jokes.js';
import { User } from './Models/Collections/Users.js';

// Connect to MongoDB with SSL options
mongoose.connect("mongodb+srv://swamirajpatilshambhu789:CVwLJKJB7oiphP60@linkup.nimabv1.mongodb.net/Chats", {
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Add connection event handlers
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

const corsOptions = {
  origin: true,
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Making a server
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
  connectionStateRecovery: {}
});

// Making msg(storage)//Rooms
const msg = {
  General: [],
  Memes: [],
  Gaming: [],
  Jokes: [],
};

// Function to load messages from database
async function loadMessages() {
  try {
    const [generalMsgs, memesMsgs, gamesMsgs, jokesMsgs] = await Promise.all([
      GeneralMsg.find({}).lean(),
      MemesMsg.find({}).lean(),
      GamesMsg.find({}).lean(),
      JokesMsg.find({}).lean()
    ]);

    msg.General = generalMsgs;
    msg.Memes = memesMsgs;
    msg.Gaming = gamesMsgs;
    msg.Jokes = jokesMsgs;
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

// Load messages when server starts
loadMessages();

// Making an alias for the directory
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors(corsOptions));
app.use(express.json());

// User management routes
app.post("/api/users/check", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    res.json({ exists: !!user });
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post("/api/users/register", async (req, res) => {
  try {
    const { username } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create new user
    const user = new User({ username });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Making a routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
app.get("/chat", (req, res) => {
  res.sendFile(join(__dirname, "Src/chat.html"));
});

// Add this after the msg object:
const onlineUsers = new Map(); // Store socket.id -> username mapping
const userSockets = new Map(); // Store username -> socket.id mapping
const directMessages = new Map(); // Store direct messages

// Making a socket connection
io.on("connection", (socket) => {
  socket.on("join room", async (room, username, cb) => {
    try {
      // Update user's last seen
      await User.findOneAndUpdate(
        { username },
        { lastSeen: new Date() },
        { new: true }
      );

      // Reload messages when someone joins
      await loadMessages();
      
      socket.join(room);
      // Add user to online users
      onlineUsers.set(socket.id, username);
      userSockets.set(username, socket.id);
      
      // Get all users for the client
      const allUsers = await User.find({}).select('username lastSeen');
      
      // Broadcast updated user list to all clients
      io.emit("userList", {
        online: Array.from(new Set(onlineUsers.values())),
        all: allUsers
      });

      if (msg[room]) {
        cb(msg[room]);
      } else {
        cb([]);
      }
    } catch (error) {
      console.error('Error in join room:', error);
      cb([]);
    }
  });

  socket.on("messages", async (room, message, username) => {
    console.log('Received message:', { room, message, username });
    if (msg[room]) {
      try {
        console.log('Attempting to save message to database...');
        if (room === "General") {
          const generalMsg = new GeneralMsg({username: username, room: room, msg: message});
          console.log('Created GeneralMsg document:', generalMsg);
          await generalMsg.save();
          console.log('Successfully saved GeneralMsg');
        }
        else if (room === "Jokes") {
          const jokesMsg = new JokesMsg({username: username, room: room, msg: message});
          console.log('Created JokesMsg document:', jokesMsg);
          await jokesMsg.save();
          console.log('Successfully saved JokesMsg');
        }
        else if (room === "Games") {
          const gamesMsg = new GamesMsg({username: username, room: room, msg: message});
          console.log('Created GamesMsg document:', gamesMsg);
          await gamesMsg.save();
          console.log('Successfully saved GamesMsg');
        }
        else if (room === "Memes") {
          const memesMsg = new MemesMsg({username: username, room: room, msg: message});
          console.log('Created MemesMsg document:', memesMsg);
          await memesMsg.save();
          console.log('Successfully saved MemesMsg');
        }

        const messageId = Date.now();
        const messageObj = { msg: message, username, messageId };
        msg[room].push(messageObj);
        io.to(room).emit("message", messageObj);
      } catch (error) {
        console.error('Error saving message to database:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
    } else {
      console.log('Invalid room:', room);
    }
  });

  // Add direct message handler
  socket.on("direct message", (to, message, from) => {
    console.log("Direct message received:", { to, message, from });
    const messageId = Date.now();
    const messageObj = {
      msg: message,
      from,
      to,
      messageId,
      isDirect: true,
    };

    // Store message using a consistent chat ID
    const chatId = [from, to].sort().join("_");
    console.log("Chat ID:", chatId);
    if (!directMessages.has(chatId)) {
      directMessages.set(chatId, []);
    }
    directMessages.get(chatId).push(messageObj);
    console.log("Stored messages for chat:", directMessages.get(chatId));

    // Send to both users
    const toSocket = Array.from(onlineUsers.entries()).find(
      ([_, username]) => username === to
    )?.[0];

    console.log("Target socket:", toSocket);
    if (toSocket) {
      io.to(toSocket).emit("direct message", messageObj);
      console.log("Message sent to target user");
    }
    // Send back to sender
    io.to(socket.id).emit("direct message", messageObj);
    console.log("Message sent back to sender");
  });

  // Handle disconnection
  socket.on("disconnect", async () => {
    const username = onlineUsers.get(socket.id);
    if (username) {
      // Update user's last seen
      await User.findOneAndUpdate(
        { username },
        { lastSeen: new Date() }
      );

      onlineUsers.delete(socket.id);
      userSockets.delete(username);
      
      // Get updated user list
      const allUsers = await User.find({}).select('username lastSeen');
      
      // Broadcast updated user list to all clients
      io.emit("userList", {
        online: Array.from(new Set(onlineUsers.values())),
        all: allUsers
      });
    }
  });
});

// Add a test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Starting the server
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
