// Alaa Ahmad

const { emailQueue } = require('./queue.js');

async function addEmailJob() {
  try {
    const jobData = {
      recipient: `user${Math.floor(Math.random() * 1000)}@bzu.edu`,
      subject: 'Welcome from Alaa Ahmad!',
      body: 'This is a test email job.'
    };

    const job = await emailQueue.add('send-email', jobData);
    console.log(`Successfully added job ${job.id} for ${jobData.recipient}.`);

  } catch (error) {
    console.error('Error adding job to the queue:', error);
  }
}

// Add a job, then close the connection to allow the script to exit.
addEmailJob().then(() => {
    emailQueue.close();
});