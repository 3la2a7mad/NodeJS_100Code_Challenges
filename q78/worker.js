// Alaa Ahmad

const { parentPort } = require('worker_threads');

// The worker listens for the initial message containing the private port.
parentPort.once('message', (value) => {
    const myPort = value.hereIsYourPort;
    console.log('[Worker] Received dedicated port from main thread.');

    // Listen for messages on the dedicated port.
    myPort.on('message', (messageFromMain) => {
        console.log(`[Worker] Received on private channel: "${messageFromMain}"`);

        // Send a reply back through the same private port.
        const response = `PONG! (in response to "${messageFromMain}")`;
        myPort.postMessage(response);
    });

    myPort.postMessage('Worker is ready on the private channel.');
});