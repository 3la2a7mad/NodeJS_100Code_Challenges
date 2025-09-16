// Alaa Ahmad

const express = require('express');
const app = express();
const PORT = 4000;

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Please provide valid numbers for a and b.' });
    }

    const result = a + b;
    console.log(`Received request: ${a} + ${b} = ${result}. Sending response.`);
    res.status(200).json({ result });
});

app.listen(PORT, () => {
    console.log(`Service B (Sum API) is listening on http://localhost:${PORT}`);
});