// Alaa Ahmad
//reate a 50 MB file filled with zeros for testing.
//node -e "require('fs').writeFileSync('large.bin', Buffer.alloc(50 * 1024 * 1024))"
const fs = require('fs');

const filePath = 'large.bin';
const timerLabel = 'File Read Time';

// Start the timer.
console.time(timerLabel);

// Read the large file.
fs.readFile(filePath, (err, data) => {
  // Stop the timer inside the callback to ensuring we measure the full duration.
  console.timeEnd(timerLabel);

  if (err) {
    return console.error('Error reading the file:', err);
  }

  console.log(`Successfully read ${data.length} bytes.`);
});