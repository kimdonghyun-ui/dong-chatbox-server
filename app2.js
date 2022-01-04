const express = require('express');
const http = require('http');
const socketIo = require("socket.io");

// localhost 포트 설정
const port = 4001;

const app = express();

// server instance
const server = http.createServer(app);


// socketio 생성후 서버 인스턴스 사용
const io = socketIo(server, {
  cors: {
    origin: "https://dong-chatbox-client.herokuapp.com",
    // origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


// socketio 문법
io.on('connection', (socket) => {

  socket.on('all_users', (msg) => {
    console.log(msg)
    io.emit('user_update', msg); // Send a message to browser.

  }); // Get message from the browser.


  socket.on('all_rooms', (msg) => {
    console.log(msg)
    io.emit('room_update', msg); // Send a message to browser.

  }); // Get message from the browser.


  // socket.emit('event2', 'message here'); // Send a message to browser.
});

server.listen(port, () => console.log(`Listening on port ${port}`))
