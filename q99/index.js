// Alaa Ahmad

const express = require('express');
const { connectRedis } = require('./redisClient');
const { tokenBucketRateLimiter } = require('./rateLimiter');

const app = express();
app.set('trust proxy', 1); // Required to get the correct client IP behind a proxy

app.get('/', (req, res) => {
  res.send('Welcome! Go to /api to test the rate limiter.');
});

app.use('/api', tokenBucketRateLimiter);

app.get('/api', (req, res) => {
  res.json({
    message: 'Success! You accessed the protected resource.',
    timestamp: new Date().toISOString(),
  });
});

const PORT = 3000;
connectRedis().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});