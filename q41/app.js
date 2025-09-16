// Alaa Ahmad
//http://localhost:3000/
//http://localhost:3000/slow
const express = require('express');
const app = express();
const port = 3000;

// middleware function.
const logger = (req, res, next) => {
  const start = Date.now();
  // waits until the response is sent.
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[Log] ${req.method} ${req.originalUrl} - ${res.statusCode} [${duration}ms]`);
  });
  next();
};

// Apply the middleware to all incoming requests.
app.use(logger);

// Route: A simple homepage.
app.get('/', (req, res) => {
  res.send('Homepage');
});

// Route: Simulates a 500ms delay.
app.get('/slow', (req, res) => {
  setTimeout(() => res.send('This response was delayed.'), 2000);
});
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});