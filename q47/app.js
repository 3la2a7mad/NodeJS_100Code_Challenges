// Alaa Ahmad

const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/student-app';

async function connectToDB() {
  try {
    console.log('Attempting to connect to MongoDB...'); // for debugging

    await mongoose.connect(dbURI, {
      serverSelectionTimeoutMS: 5000 // Give up after 5 seconds
    });

    console.log('Successfully connected to MongoDB for Alaa Ahmad.');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
}

connectToDB();