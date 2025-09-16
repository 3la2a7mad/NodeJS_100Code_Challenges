// Alaa Ahmad

const express = require('express');
const redis = require('redis');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Create and connect the Redis client.
const redisClient = redis.createClient();
redisClient.connect().catch(console.error);
redisClient.on('error', (err) => console.log('Redis Error: ' + err));

async function getPosts(req, res) {
    const cacheKey = 'posts';

    try {
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            console.log('Cache HIT!');
            return res.json(JSON.parse(cachedData));
        }

        console.log('Cache MISS! Fetching from API...');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        // Save the data to Redis with a 60-second Time-To-Live (TTL).
        redisClient.set(cacheKey, JSON.stringify(data), {
            EX: 60,
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An internal error occurred.');
    }
}

app.get('/posts', getPosts);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});