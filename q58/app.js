// Alaa Ahmad

const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

// Create the rate limiter middleware
const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 60, // Limit each IP to 60 requests per window
	message: 'Too many requests from this IP, please try again after a minute',
	standardHeaders: true,
	legacyHeaders: false,
});

// Apply the rate limiter to all incoming requests
app.use(limiter);

// Example routes to test the rate limiter
app.get('/api/resource1', (req, res) => {
	res.send('This is a limited resource.');
});

app.get('/api/resource2', (req, res) => {
	res.send('This is another limited resource.');
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
	console.log('Try requesting an endpoint more than 60 times in a minute to trigger the limit.');
});