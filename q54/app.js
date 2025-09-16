// Alaa Ahmad

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const MONGO_URI = "mongodb://localhost:27017/challenge54?replicaSet=rs0";

app.use(express.json());

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
});

const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
    try {
        const newUser = await User.create({ email: req.body.email });
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'This email is already in use.' });
        }
        res.status(500).json({ message: 'An error occurred.' });
    }
});

app.get('/users', async (req, res) => {
    const allUsers = await User.find();
    res.json(allUsers);
});

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB!");
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB. Is it a replica set?", err.message);
    }
};

start();