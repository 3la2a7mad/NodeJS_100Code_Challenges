// Alaa Ahmad
//POST http://localhost:3000/users (body: {"email": "alaa@test.com", "name": "Alaa"})
//GET http://localhost:3000/users
//PUT http://localhost:3000/users/:id (replace :id with an actual ID from the GET request, body: {"name": "Alaa Ahmad"})
//PUT http://localhost:3000/users/:id (replace :id with an actual ID from the GET request, body: {"name": "Alaa Ahmad"})

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const dbURI = 'mongodb://localhost:27017/app-q49'; 

app.use(express.json());

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, default: 'Anonymous' },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);


// --- CREATE a new user ---
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(400).json({ error: error.message });
  }
});


// --- READ all users ---
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});


// --- UPDATE a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body; 

        if (!name) {
            return res.status(400).json({ error: 'Name field is required for update.' });
        }

        // Find the user by ID and update them. { new: true } returns the updated document.
        const updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during update.', details: error.message });
    }
});


// --- DELETE a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during deletion.', details: error.message });
    }
});

const start = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('Successfully connected to MongoDB!');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

start();