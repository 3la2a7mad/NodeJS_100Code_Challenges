// Alaa Ahmad

const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

async function connectRedis() {
  await redisClient.connect();
  console.log('Connected to Redis successfully!');
}

module.exports = { redisClient, connectRedis };