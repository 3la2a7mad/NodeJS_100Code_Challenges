// Alaa Ahmad
//http://localhost:3000/users/123
//http://localhost:3000/users/abc

const express = require('express');
const app = express();
const port = 3000;
app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  // Convert the extracted ID to a number.
  const idAsNumber = parseInt(id, 10);

  // Validate that the ID is a valid number.
  if (isNaN(idAsNumber)) {
    return res.status(400).json({ error: 'User ID must be a number.' });
  }

  res.status(200).json({
    id: idAsNumber,
    name: 'Alaa Ahmad',
    role: 'Student'
  });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});