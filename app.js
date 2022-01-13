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
    io.emit('all_user_update', msg);
  });

  socket.on('all_rooms', (msg) => {
    console.log(msg)
    io.emit('all_room_update', msg);
  });

  socket.on('all_msgs', (msg) => {
    console.log(msg)
    io.emit('all_msgs_update', msg);
  });

  socket.on('focusroom', (msg) => {
    console.log(msg)
    io.emit('focusroom_update', msg);
  });

  socket.on('joinRoom', function(roomName) {     // joinRoom을 클라이언트가 emit 했을 시
    console.log(roomName)

    socket.join(roomName.Room);    // 클라이언트를 msg에 적힌 room으로 참여 시킴
    io.to(roomName.Room).emit('joinMsg', roomName); 
    // io.to(roomName.Room).emit('joinMsg', `${roomName.Room}의 방에 ${roomName.NickName}입장`); 
  });

  socket.on('leaveRoom', (roomName) => {
    console.log('roomName',roomName)
    console.log('나갔어?')
    socket.leave(roomName.Room);
    io.to(roomName.Room).emit('leaveMsg', roomName); 
  });

  socket.on('disconnect', (dis) => {

    console.log('소켓종료했어',dis)

  });

});




const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));