// Alaa Ahmad

const fs = require('fs').promises;
const filePath = 'a.txt';

// The async function to use 'await'.
async function readFilePromise() {
  try {
    const data = await fs.readFile(filePath);
    console.log(`File content length: ${data.length} bytes.`);
  } catch (err) {
    console.error('Error reading the file:', err);
  }
}

readFilePromise();