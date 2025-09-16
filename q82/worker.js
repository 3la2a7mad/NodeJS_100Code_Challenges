// Alaa Ahmad

const { Worker } = require('bullmq');
const { emailQueue } = require('./queue.js'); 

//defines the work to be done for each job.
const processEmailJob = async (job) => {
  const { recipient, subject } = job.data;
  console.log(`[Job ${job.id}] PROCESSING: Sending email to ${recipient}`);

  // Simulate an async task.
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log(`[Job ${job.id}] COMPLETED: Email sent to ${recipient} with subject "${subject}"`);
  return 'Done';
};

// Create the worker with a concurrency of 5.
const worker = new Worker(emailQueue.name, processEmailJob, {
  concurrency: 5,
  connection: {
    host: 'localhost',
    port: 6379
  }
});

worker.on('completed', (job) => {
  console.log(`[Worker] Job ${job.id} has completed successfully.`);
});

worker.on('failed', (job, err) => {
  console.log(`[Worker] Job ${job.id} has failed with error: ${err.message}`);
});

console.log("Worker is listening for jobs");