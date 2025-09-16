// Alaa Ahmad

const express = require('express');

const app = express();
const port = 3000;

// A Map is used for my simple in-memory key-value cache.
const cache = new Map();

app.get('/data', (req, res) => {
    const cacheKey = '/data';

    // Check if the data exists in the cache.
    if (cache.has(cacheKey)) {
        console.log('Cache HIT!');
        return res.status(200).json(cache.get(cacheKey));
    }

    // If not in cache, it's a CACHE MISS
    console.log('Cache MISS!');
    const freshData = {
        message: "This is fresh data from a slow source.",
        student: "Alaa Ahmad, Birzeit University",
        timestamp: new Date().toISOString()
    };
    
    // Store the fresh data in the cache.
    cache.set(cacheKey, freshData);
    console.log('Cache SET for key:', cacheKey);

    // Set a timer to delete the cache entry after 5 seconds.
    setTimeout(() => {
        cache.delete(cacheKey);
        console.log('Cache EXPIRED and DELETED for key:', cacheKey);
    }, 5000); // 5 seconds

    res.status(200).json(freshData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});