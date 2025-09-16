// Alaa Ahmad

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const SERVICE_B_URL = 'http://localhost:4000';

// This function calls Service B and implements the retry logic.
async function callServiceBWithRetries(a, b) {
    const maxRetries = 3;
    const retryDelay = 1000; 

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}: Calling Service B...`);
            const response = await fetch(`${SERVICE_B_URL}/sum?a=${a}&b=${b}`);

            if (!response.ok) {
                throw new Error(`Service B responded with status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Successfully received data from Service B.");
            return data;
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt === maxRetries) {
                throw new Error(`Failed to connect to Service B after ${maxRetries} attempts.`);
            }
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}

app.get('/calculate', async (req, res) => {
    const a = req.query.a;
    const b = req.query.b;

    if (!a || !b) {
        return res.status(400).json({ error: 'Query parameters "a" and "b" are required.' });
    }

    try {
        const data = await callServiceBWithRetries(a, b);
        res.status(200).json({ message: 'Calculation successful', ...data });
    } catch (error) {
        // This runs if all retries fail.
        res.status(503).json({
            error: 'Service B is currently unavailable.',
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Service A (Client) is listening on http://localhost:${PORT}`);
});