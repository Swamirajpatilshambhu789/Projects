// import express from 'express';
// import { createServer } from 'node:http';
// import { fileURLToPath } from 'node:url';
// import { dirname, join } from 'node:path';
// import { Server } from 'socket.io';
// import mongoose from 'mongoose';
// import os from 'node:os';

// const message = mongoose.model("message", {
//   sendername:String,
//   des:String
// })
// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   connectionStateRecovery: {}
// });

// const __dirname = dirname(fileURLToPath(import.meta.url));

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
//   console.log(os.networkInterfaces())
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg, sendername) => {
//     let conn = mongoose.connect("mongodb://localhost:27017/Users")
//     let mess = new message({
//       sendername: sendername,
//       des:msg
//     })
// console.log("saved");
//     mess.save()
//     io.emit('chat message', msg);
//   });
// });


// // const ios = new Server(server, {
// //     connectionStateRecovery: {}
// //   });
// server.listen(3000, () => {
//   console.log('server running at http://localhost:3000');
// });
import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import mongoose from 'mongoose';


async function getAlldocuments(model) {

  const alldocuments = await model.find({});
  console.log(alldocuments)
  return alldocuments
}

// Define the message schema and model
const messageSchema = new mongoose.Schema({
  sendername: String,
  des: String
});
const Message = mongoose.model("Message", messageSchema);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// Connect to MongoDB once at the start
mongoose.connect("mongodb://localhost:27017/Users", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
  // console.log(os.networkInterfaces());
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg, sendername) => {
    const mess = new Message({
      sendername: sendername,
      des: msg
    });

    mess.save()
      .then(() => {
        console.log("Message saved");
        // let oldmsgs = getAlldocuments(Message)
        io.emit('chat message', { msg, sendername});
      })
      .catch(err => console.error('Error saving message:', err));
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
