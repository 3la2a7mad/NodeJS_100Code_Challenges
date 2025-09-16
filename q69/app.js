// Alaa Ahmad

const express = require('express');
const morgan = require('morgan');
const logger = require('./logger'); 

const app = express();
const port = 3000;

// Pipe HTTP request logs from morgan through our winston logger
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Example routes to generate different types of logs
app.get('/', (req, res) => {
    logger.info('A user accessed the home page.');
    res.send('Hello, Logger! Check the console and the /logs directory.');
});

app.get('/warn', (req, res) => {
    logger.warn('This is a warning message.');
    res.status(400).send('Warning event logged.');
});

app.get('/error', (req, res) => {
    logger.error('This is an error message.');
    res.status(500).send('Error event logged.');
});

app.listen(port, () => {
    logger.info(`Server started and running on http://localhost:${port}`);
});