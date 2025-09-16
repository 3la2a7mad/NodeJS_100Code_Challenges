// Alaa Ahmad

const fs = require('fs').promises;

const successPromise = fs.readFile('a.txt');
const failurePromise = fs.readFile('missing.txt');

async function runComparison() {
  // --- Promise.race ---
  // Rejects because the failure promise is faster than the successful read.
  console.log('Testing Promise.race');
  try {
    await Promise.race([successPromise, failurePromise]);
  } catch (err) {
    console.log(`Race settled first with a rejection: ${err.code}`);
  }

  // --- Promise.allSettled ---
  // Always fulfills with an array of result objects.
  console.log('\nTesting Promise.allSettled');
  const results = await Promise.allSettled([successPromise, failurePromise]);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Promise ${index} fulfilled with ${result.value.length} bytes.`);
    } else {
      console.log(`Promise ${index} rejected with error: ${result.reason.code}`);
    }
  });
}

runComparison();