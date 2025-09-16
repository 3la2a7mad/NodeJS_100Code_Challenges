// Alaa Ahmad

const { setTimeout: sleep } = require('timers/promises');

//async function to use await .
async function runTimer() {
  const controller = new AbortController();
  const { signal } = controller;

  console.log('Starting a 5-second timer');
  console.log('Timer will be cancelled after 1 second.');

  setTimeout(() => {
    controller.abort();
  }, 1000);

  try {
    await sleep(5000, 'Timer completed', { signal });
    console.log('Timer finished without being aborted.'); // This not run if my work is sucssful.
  } catch (err) {
    if (err.name === 'AbortError') { // This is expected becuase i abort the timer.
      console.log('Timer successfully aborted as planned.');
    } else {
      console.error('An unexpected error occurred:', err);
    }
  }
}

runTimer();