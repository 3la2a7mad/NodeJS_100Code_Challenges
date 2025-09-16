// Alaa Ahmad

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// --- Configuration ---
const MONGO_URI = 'mongodb://localhost:27017/q60?replicaSet=rs0';
const JWT_SECRET = 'a-very-secure-and-long-secret-key-for-alaa';

app.use(express.json());

// --- Database Model ---
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// --- Routes ---

// A route to create a user, which is necessary for testing the login.
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        // Handles cases where the email is already taken
        res.status(error.code === 11000 ? 409 : 500).json({ message: 'Error creating user.' });
    }
});

// The main challenge route: Login and generate a JWT
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // 2. Compare the provided password with the stored hash
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // 3. Create, sign, and return the JWT if credentials are correct
        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { 
            algorithm: 'HS256',
            expiresIn: '1h' 
        });
        
        res.status(200).json({ message: "Login successful!", token: token });

    } catch (error) {
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
});

// --- Server Startup ---
const start = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to MongoDB database 'q60'.");
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB. Is the replica set running?", err);
        process.exit(1);
    }
};

start();