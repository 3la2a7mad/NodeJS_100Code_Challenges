// Alaa Ahmad

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

app.post('/users', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is a required field.' });
  }
  const newUser = {
    id: new Date().getTime(), //to get a unique ID.
    email: email,
    createdBy: 'Alaa Ahmad',
  };

  // Respond with status 201 (Created) and the new user's data.
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});