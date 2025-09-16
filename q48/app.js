// Alaa Ahmad

const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/q48-student-app';

// Define the Mongoose schema for a student.
const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true 
  },
  university: {
    type: String,
    required: true
  },
  major: String,
  registeredAt: {
    type: Date,
    default: Date.now // Sets a default value to the current date and time.
  }
});


const Student = mongoose.model('q48', studentSchema);

// An async function to connect and perform database operations.
async function manageStudent() {
  try {
    await mongoose.connect(dbURI);
    console.log('Database connected.');

    // Create a new document using the Student model.
    const newStudent = new Student({
      email: 'alaa.ahmad@bzu.edu',
      university: 'Birzeit University',
      major: 'Computer Engineering'
    });

    // Save the document to the database.
    await newStudent.save();
    console.log('New student record saved successfully:', newStudent.email);

  } catch (err) {
    // If the email already exists, Mongoose/MongoDB will throw an E11000 error.
    if (err.code === 11000) {
      console.error('Error: A student with this email already exists.');
    } else {
      console.error('An error occurred:', err);
    }
  } finally {
    // Ensure the database connection is always closed.
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

manageStudent();