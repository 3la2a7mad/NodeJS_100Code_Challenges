// Alaa Ahmad

const { Worker, MessageChannel, isMainThread } = require('worker_threads');
const path = require('path');

if (isMainThread) {
    // Create a MessageChannel, which provides two connected ports.
    const { port1, port2 } = new MessageChannel();
    console.log('[Main] Created MessageChannel.');

    const worker = new Worker(path.join(__dirname, 'worker.js'));
    
    // Send port2 to the worker. It must be included in the transfer list.
    worker.postMessage({ hereIsYourPort: port2 }, [port2]);
    console.log('[Main] Transferred port2 to the worker.');
    
    // The main thread now uses port1 for all communication.
    port1.on('message', (messageFromWorker) => {
        console.log(`[Main] Received on private channel: "${messageFromWorker}"`);
    });
    
    // Send a message to the worker on the private channel.
    setTimeout(() => {
        const message = 'PING!';
        console.log(`[Main] Sending on private channel: "${message}"`);
        port1.postMessage(message);
    }, 500); // Wait a moment for the worker to initialize.

    worker.on('exit', () => console.log('[Main] Worker has exited.'));
}