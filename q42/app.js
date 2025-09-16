// Alaa Ahmad
//http://localhost:3000/
//http://localhost:3000/error
const express = require('express');
const app = express();
const port = 3000;

// This route will cause a server error on purpose.
app.get('/error', (req, res, next) => {
  try {
    throw new Error('Something went wrong on the server!');
  } catch (err) {
    // Pass the error to Express's error handling middleware.
    next(err);
  }
});

app.get('/', (req, res) => {
  res.send('Welcome! Try navigating to /error to test the error handler.');
});


// It MUST have 4 arguments to be recognized by Express
function errorHandler(err, req, res, next) {
  //this goes to the console
  console.error(`An error occurred: ${err.message}`);
  res.status(500).json({ message: 'Internal Server Error' });
}

// Register the error handler as the LAST piece of middleware.
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});