// Alaa Ahmad


require('dotenv').config();
const express = require('express');

const app = express();

// Read the feature flag from the environment variable on startup.
const newHomepageEnabled = process.env.FEATURE_NEW_HOME === 'true';

app.get('/home', (req, res) => {
  // Check the boolean flag to determine which response to send.
  if (newHomepageEnabled) {
    res.status(200).json({
      version: 'new',
      title: 'Welcome to the New and Improved Homepage!',
      student: 'Alaa Ahmad',
      features: ['Sleek Design', 'Faster Load Times']
    });
  } else {
    res.status(200).json({
      version: 'old',
      title: 'Welcome to our Classic Homepage!',
      student: 'Alaa Ahmad'
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Feature 'FEATURE_NEW_HOME' is currently ${newHomepageEnabled ? 'ENABLED' : 'DISABLED'}`);
});