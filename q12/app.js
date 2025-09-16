// Alaa Ahmad

const EventEmitter = require('events');

//Create a new EventEmitter instance.
const myEmitter = new EventEmitter();

let callCount = 0;
const eventName = 'ping';

// Register a listener for the 'ping' event.
myEmitter.on(eventName, () => {
  callCount++;
  console.log(`Event '${eventName}' was received. Current count: ${callCount}`);
});
// Emit the event twice.
myEmitter.emit(eventName);
myEmitter.emit(eventName);

console.log(`the listener was called ${callCount} times.`);