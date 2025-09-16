// Alaa Ahmad

const fs = require('fs');
const readline = require('readline');

const filePath = 'input.txt';
let lineCount = 0;

// Create a readable stream from the file.
const fileStream = fs.createReadStream(filePath);

// Create a readline .
const rl = readline.createInterface({
  input: fileStream,
});

// For each 'line' event, increment the counter.
rl.on('line', () => {
  lineCount++;
});

// When the stream ends, the 'close' event is triggered.
rl.on('close', () => {
  console.log(`The file has ${lineCount} lines.`);
});

// Handle any errors on the stream.
fileStream.on('error', (err) => {
  console.error('Error reading file stream:', err);
});