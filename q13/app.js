// Alaa Ahmad

const EventEmitter = require('events');

// Create a new EventEmitter instance.
const myEmitter = new EventEmitter();
const eventName = 'login';

// Create two distinct listener functions.
const log1 = () => {
  console.log('Welcome, Alaa Ahmad!');
};
const log2 = () => {
  console.log('Login detected');
};

// Add two listeners to the same event.
myEmitter.on(eventName, log1);
myEmitter.on(eventName, log2);
myEmitter.emit(eventName);

// Remove only the second listener.
console.log('\nRemovingn Login detected');
myEmitter.off(eventName, log2);
myEmitter.emit(eventName);