// Alaa Ahmad

const { setTimeout: delay } = require('timers/promises');

// Tries an async function up to a specific number of times.
async function retry(asyncFn, times) {
  let lastError = null;
  for (let i = 0; i < times; i++) {
    try {
      return await asyncFn();
    } catch (err) {
      lastError = err;
      if (i < times - 1) {
        await delay(200);
      }
    }
  }
  throw lastError;
}



let connectionAttempts = 0;
async function fetchStudentRecords() {
  connectionAttempts++;
  console.log(`Attempt #${connectionAttempts} to connect to university database`);
  if (connectionAttempts <= 2) {
    throw new Error('Connection failed.');
  }
  return { student: 'Alaa Ahmad', status: 'Success' };
}


async function main() {
  try {
    // Retry the function 3 times.
    const result = await retry(fetchStudentRecords, 3);
    console.log('Final Result:', result);
  } catch (err) {
    console.error(`Final error: ${err.message}`);
  }
}

main();