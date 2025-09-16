// Alaa Ahmad

const { performance, PerformanceObserver } = require('perf_hooks');

// The PerformanceObserver is the standard way to collect performance entries.
const obs = new PerformanceObserver((items) => {
    const entry = items.getEntries()[0];

    console.log('\n--- Performance Measurement Received ---');
    console.log(`Name:     ${entry.name}`);
    console.log(`Duration: ${entry.duration.toFixed(3)} ms`);
    console.log('------------------------------------');
    
    // Disconnect the observer after use.
    obs.disconnect();
    performance.clearMarks();
});

//observe 'measure' entry types.
obs.observe({ entryTypes: ['measure'], buffered: true });


//simulates a slow asynchronous operation
function simulateAsyncOperation() {
    const delay = 1500;
    console.log(`Starting simulated async operation (will take ${delay}ms)...`);
    return new Promise(resolve => setTimeout(resolve, delay));
}

// The main function that performs the measurement.
async function runMeasurement() {
    try {
        console.log('Running performance measurement...');

        // Set a "start" mark.
        performance.mark('async-op-start');

        // Await the async operation.
        await simulateAsyncOperation();

        // Set an "end" mark.
        performance.mark('async-op-end');

        // 4. Measure the duration between the marks.
        performance.measure(
            'Async DB Query Simulation', // Measurement name
            'async-op-start',            // Start mark
            'async-op-end'               // End mark
        );

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

runMeasurement();