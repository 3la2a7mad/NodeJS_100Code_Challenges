// Alaa Ahmad

const express = require('express');
const he = require('he'); // Use 'he' library for robust HTML entity encoding.

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // Default to 'Guest' if no name is provided in the query string.
  const name = req.query.name || 'Guest';

  // Sanitize the user input to prevent Cross-Site Scripting (XSS) attacks.
  const safeName = he.escape(name);

  res.send(`<h1>Hello, ${safeName}</h1>`);
});

app.listen(port, () => {
  console.log(`Server running. Test a potential XSS attack in your browser:`);
  console.log(`http://localhost:3000/?name=<script>alert('XSS by Alaa Ahmad')</script>`);
});