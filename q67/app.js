// Alaa Ahmad

const http = require('http');
const express = require('express');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

// Serve the HTML file that will be my client
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Main Socket.IO connection logic
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Join a room ---
    socket.on('join_room', (roomName) => {
        socket.join(roomName);
        console.log(`User ${socket.id} joined room: ${roomName}`);
        // Send confirmation back to the client who just joined
        socket.emit('joined_room_confirmation', `You have joined room: '${roomName}'`);
    });

    // Broadcast a message to a specific room ---
    socket.on('send_message_to_room', (data) => {
        const { room, message } = data;
        console.log(`Broadcasting message to room '${room}': ${message}`);
        // Use io.to(room) to send the message to all clients in that room
        io.to(room).emit('receive_room_message', `User ${socket.id.substring(0, 5)}: ${message}`);
    });
    
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`Server and Socket.IO running at http://localhost:${port}`);
});