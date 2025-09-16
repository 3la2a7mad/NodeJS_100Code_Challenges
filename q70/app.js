// Alaa Ahmad

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const MONGO_URI = 'mongodb://localhost:27017/q70?replicaSet=rs0';

app.get('/', (req, res) => {
    res.send('Server is running. Press Ctrl+C in the terminal to test graceful shutdown.');
});

let server;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB.");
        // Start listening only after the DB connection is successful.
        server = app.listen(port, () => {
            console.log(`Server is running on port ${port}.`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB.", err);
        process.exit(1);
    });

// This function handles the shutdown process.
const gracefulShutdown = async () => {
    console.log('\nSIGINT received. Shutting down gracefully...');

    // Stop the HTTP server from accepting new connections.
    server.close(async () => {
        console.log('HTTP server closed.');

        //Close the MongoDB database connection.
        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed.');
        } catch (err) {
            console.error('Error closing MongoDB connection:', err);
        }

        // Exit the process with a success code.
        console.log('Shutdown complete.');
        process.exit(0);
    });
};

// Listen for the SIGINT signal (Ctrl+C)
process.on('SIGINT', gracefulShutdown);

// Also listen for SIGTERM, which is used by many process managers.
process.on('SIGTERM', gracefulShutdown);