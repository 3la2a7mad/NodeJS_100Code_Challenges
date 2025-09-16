// Alaa Ahmad

const { Worker, isMainThread } = require('worker_threads');
const path = require('path');


if (isMainThread) {
    const number = 43; 

    console.log(`Main Thread Starting worker to calculate fibonacci(${number})`);
    
    const worker = new Worker(path.join(__dirname, 'fibonacci.js'), {
        workerData: { number: number } // Pass data to the worker.
    });

    // Listen for the result message from the worker.
    worker.on('message', (result) => {  
        console.log(`Main Thread Result received: ${result}`);  
    });

    worker.on('error', (error) => {
        console.error('Main Thread Worker error:', error);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Main Thread Worker stopped with exit code ${code}`);
        }
    });

    console.log('Main Thread Waiting for result. The main thread is NOT blocked.');
}