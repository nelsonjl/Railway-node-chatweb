let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

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

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
