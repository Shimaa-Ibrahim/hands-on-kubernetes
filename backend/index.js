const express = require('express');
const app = express();

const server = require('http').Server(app);
const socketio = require('socket.io', {
    cors: {
        origin: "*"
    }
});

const io = socketio(server)
const port = 3000

io.on('connection', (client)=>{
    client.on('message',(message, user) => {
        console.log(message, user);
        io.emit('message', message,user)
    })
})

server.listen(port, function () {
    console.log(`Hello world! listening on port ${port}!`);
  });

