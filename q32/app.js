// Alaa Ahmad

const fs = require('fs').promises;

// The async function to use 'await'.
async function readBothFiles() {
  try {
    // Start reading both files concurrently.
    // Use array destructuring to assign the results directly.
    const [dataA, dataB] = await Promise.all([
      fs.readFile('a.txt'),
      fs.readFile('b.txt'),
    ]);

    const totalBytes = dataA.length + dataB.length;
    console.log(`Read ${dataA.length} bytes from a.txt  + ${dataB.length} bytes from b.txt.\nTotal: ${totalBytes} bytes.`);

  } catch (err) {
    console.error('Error reading the files:', err);
  }
}

readBothFiles();