// Alaa Ahmad

const cluster = require('cluster');
const http = require('http');
const os = require('os');
const process = require('process');

const numCPUs = os.availableParallelism();
const port = 3000;

// The primary process is responsible for forking worker processes.
if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running.`);
    console.log(`Forking server for ${numCPUs} CPU(s)...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Restart a worker.
    cluster.on('exit', (worker, code, signal) => {
        console.error(`Worker ${worker.process.pid} died. Forking a new one...`);
        cluster.fork();
    });

// Worker processes handle the HTTP requests.
} else {
    http.createServer((req, res) => {
        // Log the PID of the worker that handles the request.
        console.log(`Request handled by Worker ${process.pid}`);
        res.writeHead(200);
        res.end(`Hello from Worker ${process.pid}\n`);
    }).listen(port);

    console.log(`Worker ${process.pid} started and listening on port ${port}.`);
}