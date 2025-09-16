// Alaa Ahmad

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const port = 3000;

// --- Configuration ---
const MONGO_URI = 'mongodb://localhost:27017/my-sessions?replicaSet=rs0';
const COOKIE_SECRET = 'change-this-to-a-long-random-string';

// --- Middleware Setup ---
app.use(cookieParser(COOKIE_SECRET));
app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: {
        httpOnly: true, // Prevents client-side JS access
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

// --- Routes ---

// Simulates a login, which creates the session and sets the cookie
app.post('/login', (req, res) => {
    req.session.userId = '12345';
    req.session.username = 'Alaa Ahmad';
    res.send('You are logged in. A signed cookie (connect.sid) has been set.');
});

// Verifies the session by reading the cookie sent back by the client
app.get('/profile', (req, res) => {
    if (req.session.userId) {
        res.json({
            message: `Welcome back, ${req.session.username}!`,
            userId: req.session.userId,
            sessionId: req.sessionID
        });
    } else {
        res.status(401).send('You are not logged in.');
    }
});

// Destroys the session and clears the cookie
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.clearCookie('connect.sid');
        res.send('You have been logged out.');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});