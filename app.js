const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "https://dong-chatbox-client.herokuapp.com",
    // origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// io.on('connection', socket => {
//     socket.on('message', ({ name, message }) => {
//       io.emit('message', { name, message })
//     })
// })


io.on('connection', (socket) => {

  socket.on('all_users', (msg) => {
    console.log(msg)
    io.emit('user_update', msg);

  });


  socket.on('all_rooms', (msg) => {
    console.log(msg)
    io.emit('room_update', msg);

  });

});




const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));