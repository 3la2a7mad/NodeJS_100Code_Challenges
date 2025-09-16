// Alaa Ahmad
//http://localhost:3000/
//http://localhost:3000/static/style.css
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Get the absolute path to the 'public' directory.
const publicPath = path.join(__dirname, 'public');

// Any request starting with /static will be looked for in the 'public' folder.
app.use('/static', express.static(publicPath));

app.get('/', (req, res) => {
  res.send(`Server is running.`);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});