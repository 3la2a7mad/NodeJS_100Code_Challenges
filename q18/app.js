// Alaa Ahmad

const fs = require('fs');

const sourceFile = 'test.txt';
const destinationFile = 'test-copy.txt';

const source = fs.createReadStream(sourceFile);
// Set a small buffer size on the destination to easily trigger backpressure.
const destination = fs.createWriteStream(destinationFile, { highWaterMark: 1024 });

// On each chunk of data from the source file
source.on('data', (chunk) => {
  const canContinue = destination.write(chunk);

  // If the destination's buffer is full, pause the source stream.
  if (!canContinue) {
    console.log('Backpressure detected: pausing read stream.');
    source.pause();
  }
});

// The 'drain' event fires when the destination buffer is empty again.
destination.on('drain', () => {
  console.log('Destination drained: resuming read stream.');
  source.resume();
});

// When the source is finished, close the destination.
source.on('end', () => {
  destination.end();
});

destination.on('finish', () => {
  console.log('File copy complete.');
});

source.on('error', err => console.error('Source error:', err));
destination.on('error', err => console.error('Destination error:', err));