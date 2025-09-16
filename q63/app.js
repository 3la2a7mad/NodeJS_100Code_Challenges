// Alaa Ahmad

const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf'); // The csurf library for CSRF protection

const app = express();
const port = 3000;

// Middleware setup
app.use(express.urlencoded({ extended: false })); // Needed to parse form bodies
app.use(cookieParser());

// Initialize the CSRF protection middleware. 
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Routes

// A route to provide a valid CSRF token to the client.
app.get('/get-csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// The protected route that requires a valid CSRF token to succeed.
app.post('/transfer', (req, res) => {
    // This code only runs if the token was valid.
    res.status(200).send('Transfer successful! Your CSRF token was valid.');
});

//Error Handling 

// A custom error handler to catch invalid CSRF token errors from csurf.
app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') {
        return next(err);
    }
    res.status(403).send('Invalid CSRF Token. Request has been blocked.');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});