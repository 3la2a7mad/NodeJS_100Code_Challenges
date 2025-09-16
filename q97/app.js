// Alaa Ahmad

const express = require('express');
const helmet = require('helmet');

const app = express();

// Use the helmet middleware to apply secure HTTP headers.
app.use(helmet());

app.get('/', (req, res) => {
  res.send('This page is now more secure thanks to Helmet!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});