// Alaa Ahmad

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// Configuration
const MONGO_URI = 'mongodb://localhost:27017/q62?replicaSet=rs0';
app.use(express.json());

// Database Model 
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    // This field stores the HASH, not the plain-text password.
    password: { type: String, required: true } 
});
const User = mongoose.model('User', userSchema);

// Routes 

// Hashes a new password during user registration.
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash the password with a salt round of 10.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user with the hashed password.
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(error.code === 11000 ? 409 : 500).json({ message: 'Error during registration.' });
    }
});

// Verifies the password 
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Securely compare the plain-text password with the database hash.
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        
        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login.' });
    }
});

//Server and Database Connection 
const start = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to MongoDB database 'q62'.");
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB. Is the replica set running?", err);
        process.exit(1);
    }
};

start();