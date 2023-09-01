let express = require('express');
const router = express.Router();
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

io.on('connection', (socket) => {
  socket.on('join', (data) => {
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('user joined');
  });

  socket.on('message', (data) => {
      console.log(data.userName + ': ' + data.message)
      io.in(data.room).emit('new message', {idMessage: data.idMessage, userId: data.userId, userName: data.userName, message: data.message});
  });
});

module.exports = router;
