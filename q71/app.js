// Alaa Ahmad

const UppercaseTransform = require('./uppercase-transform');

const myTransform = new UppercaseTransform();

console.log('Stream processor started. Type something and press Enter.');
console.log('Press Ctrl+C to exit.');

// Pipe the streams together:
// Keyboard Input (stdin) -> Uppercase Transformer -> Console Output (stdout)
process.stdin.pipe(myTransform).pipe(process.stdout);