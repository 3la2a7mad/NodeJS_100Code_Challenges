// Alaa Ahmad
// readFileSync blocks the entire script until the file is read.
 // readFile runs only after the I/O operation is complete.
const fs = require('fs');
const filePath = './data.txt';

// 1. Synchronous (blocking) read
console.log('Starting synchronous read');
try {
  const syncData = fs.readFileSync(filePath);
  console.log(`Bytes read (Sync): ${syncData.length}`);
} catch (err) {
  console.error('Sync Error:', err);
}
console.log('Synchronous read finished');

console.log(''); // Adds a space.

// 2. Asynchronous (non-blocking) read
console.log('Starting asynchronous read');
fs.readFile(filePath, (err, asyncData) => {
  if (err) {
    console.error('Async Error:', err);
    return;
  }
  console.log(`Bytes read (Async): ${asyncData.length}`);
});
console.log('Asynchronous read initiated, script continues executing');