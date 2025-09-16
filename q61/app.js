// Alaa Ahmad

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// This MUST be the same secret key used to sign the tokens.
const JWT_SECRET = 'your-super-secret-key-that-is-long-and-random';

// Middleware to verify a JWT token from the Authorization header.
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('A token is required for authentication.');
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token and attach the decoded 
        req.user = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).send('Invalid Token.');
    }
    
    return next(); 
};



// A login route to generate a token for testing.
app.post('/login', (req, res) => {
    const MOCK_USER_ID = 'user_abc_123_from_BZU';
    const payload = { userId: MOCK_USER_ID, name: 'Alaa Ahmad' };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful! Use this token to access protected routes.', token });
});


app.get('/home', (req, res) => {
    res.send('This is a public page, accessible to all.');
});

// A protected route that uses the verifyToken middleware.
app.get('/profile', verifyToken, (req, res) => {
    // The middleware ensures req.user is populated if the token is valid.
    res.send(`Welcome to your protected profile, ${req.user.name} (ID: ${req.user.userId})`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});