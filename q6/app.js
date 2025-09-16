// Alaa Ahmad

const fs = require('fs');

console.log('Initiating file read');

// Asynchronously read the file.
// 'utf8' tells Node.js to decode the file data into a readable string.
fs.readFile('./my-file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  console.log('File Content Start');
  console.log(data);
  console.log('File Content End');
  
  setImmediate(() => {
    console.log('log: after-read');
  });
});