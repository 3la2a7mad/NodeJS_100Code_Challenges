// Alaa Ahmad

const express = require('express');
const app = express();

let requestCount = 0;

app.get('/', (req, res) => {
  requestCount++;

  res.json({
    message: 'Hello from the PM2 cluster!',
    version: '1.0.0',
    processId: process.pid,
    requestsHandledByThisProcess: requestCount
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server process ${process.pid} is listening on port ${PORT}`);
});