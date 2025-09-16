// Alaa Ahmad

const { Queue } = require('bullmq');

const redisConnection = {
  host: 'localhost',
  port: 6379
};

// Create and export a single queue instance to be shared.
const emailQueue = new Queue('email-queue', { connection: redisConnection });

module.exports = { emailQueue };