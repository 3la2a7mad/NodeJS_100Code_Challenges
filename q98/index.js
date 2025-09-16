const express = require('express');
const app = express();


app.use(express.json({ limit: '100kb' }));

app.post('/data', (req, res) => {
  
  console.log('Received data:', req.body);
  res.status(200).json({ message: 'Data received successfully!' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Accepting JSON bodies up to 100kb.');
});