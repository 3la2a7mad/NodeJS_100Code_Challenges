// Alaa Ahmad

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const allowedOrigin = 'https://app.example.com';

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin 
    // and requests from our specified allowed origin.
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  }
};

// Use the CORS middleware with MY custom options.
app.use(cors(corsOptions));


app.get('/api/data', (req, res) => {
    res.json({ 
        message: 'This is protected data.',
        student: 'Alaa Ahmad',
        university: 'Birzeit University'
    });
});

// Custom error handler to catch CORS errors and send a clean response.
app.use((err, req, res, next) => {
    if (err.message === 'This origin is not allowed by CORS') {
        res.status(403).json({ error: 'This origin is not permitted to access this resource.' });
    } else {
        next(err);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});