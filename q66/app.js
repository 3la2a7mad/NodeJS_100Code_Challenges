// Alaa Ahmad

const http = require('http');
const WebSocket = require('ws');

const port = 8080;

// Create a standard HTTP server.
const server = http.createServer();

// Create a WebSocket server and attach it to the HTTP server.
const wss = new WebSocket.Server({ server });

// Listen for new client connections.
wss.on('connection', (ws) => {
    console.log('Client connected.');

    // Listen for messages from this specific client.
    ws.on('message', (message) => {
        const receivedMessage = message.toString();
        console.log('Received:', receivedMessage);

        //Prefix the message and echo it back to the client.
        const responseMessage = `server: ${receivedMessage}`;
        ws.send(responseMessage);
        console.log('Sent:', responseMessage);
    });

    // Handle the client disconnection.
    ws.on('close', () => {
        console.log('Client disconnected.');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

//Start the server.
server.listen(port, () => {
    console.log(`WebSocket server started on ws://localhost:${port}`);
});