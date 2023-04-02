const express = require('express');
const app = express();

const server = require('http').Server(app);
const socketio = require('socket.io', {
    cors: {
        origin: "*"
    }
});

const io = socketio(server, {path: '/chat/'})
const port = 3000

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/hello', (req, res) => res.status(200).json({ hello: 'Hello World!' }));


io.on('connection', (client)=>{
    client.on('message',(message, user) => {
        console.log(message, user);
        io.emit('message', message,user)
    });

    client.on('error', (error) => {
        console.error('An error occurred with a WebSocket client:', error);
    });

    client.on('disconnect', () => {
        console.log('A client disconnected from the WebSocket server.');
    });
})

server.listen(port, function () {
    console.log(`Hello world! listening on port ${port}!`);
  });

