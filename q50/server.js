// Alaa Ahmad
//POST http://localhost:3000/users {"name": "Alaa Ahmad", "email": "alaa@test.com"}
//POST http://localhost:3000/users {"name": "Alaa", "email": "not-a-valid-email"}
//POST http://localhost:3000/users {"name": "Alaa"}
//POST http://localhost:3000/users {"name": "A", "email": "a@test.com"}
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const dbURI = 'mongodb://localhost:27017/validation-app-q50';

app.use(express.json());
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Name must be at least 2 characters long.']
  },
  email: {
    type: String,
    required: [true, 'Email is a required field.'],
    unique: true,
    // Use a regex to validate the email format.
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.']
  }
});

const User = mongoose.model('User', userSchema);

// This route will test the Mongoose validators.
app.post('/users', async (req, res) => {
  try {
    // .create() will automatically trigger the schema's validation rules.
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    // If it's a validation error from Mongoose.
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }
    // If the email is not unique.
    if (err.code === 11000) {
      return res.status(409).json({ error: 'This email is already in use.' });
    }
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

// A standard server start function.
async function startServer() {
  try {
    await mongoose.connect(dbURI);
    console.log('Database connected.');
    app.listen(port, () => console.log(`Server listening on port: ${port}`));
  } catch (err) {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  }
}

startServer();