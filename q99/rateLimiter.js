// Alaa Ahmad

const { redisClient } = require('./redisClient');

const BUCKET_CAPACITY = 10; // The 'burst' limit
const REFILL_RATE = 1;      // Tokens added per second

async function tokenBucketRateLimiter(req, res, next) {
  try {
    const ip = req.ip;
    const redisKey = `rate-limit:${ip}`;
    const now = Date.now();

    const bucketData = await redisClient.hGetAll(redisKey);

    let tokens = BUCKET_CAPACITY;
    let lastRefill = now;

    if (Object.keys(bucketData).length) {
      const timeElapsed = now - parseInt(bucketData.lastRefill, 10);
      const tokensToAdd = (timeElapsed / 1000) * REFILL_RATE;
      tokens = Math.min(BUCKET_CAPACITY, parseFloat(bucketData.tokens) + tokensToAdd);
    }
    
    if (tokens >= 1) {
      tokens -= 1;
      await redisClient.hSet(redisKey, {
        tokens: tokens.toString(),
        lastRefill: now.toString(),
      });
      await redisClient.expire(redisKey, 3600); // Clean up old records after 1 hour

      res.setHeader('X-RateLimit-Remaining', Math.floor(tokens));
      res.setHeader('X-RateLimit-Limit', BUCKET_CAPACITY);
      
      next();
    } else {
      const timeToNextToken = (1 - tokens) / REFILL_RATE;
      const retryAfterSeconds = Math.ceil(timeToNextToken);

      res.setHeader('Retry-After', retryAfterSeconds);
      res.status(429).json({
        error: 'Too Many Requests',
        message: `You have exhausted your request quota. Try again in ${retryAfterSeconds} seconds.`,
      });
    }
  } catch (error) {
    console.error('Error in rate limiter:', error);
    next(error);
  }
}

module.exports = { tokenBucketRateLimiter };