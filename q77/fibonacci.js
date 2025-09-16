// Alaa Ahmad

const { workerData, parentPort } = require('worker_threads');


 //This run in a worker thread to avoid blocking the main event loop.
 
function fibonacci(num) {
    if (num <= 1) return num;
    return fibonacci(num - 1) + fibonacci(num - 2);
}

// Get the input number from the main thread via workerData.
const numberToCalculate = workerData.number;

// Perform the heavy calculation.
const result = fibonacci(numberToCalculate);

// Send the result back to the main thread.
parentPort.postMessage(result);