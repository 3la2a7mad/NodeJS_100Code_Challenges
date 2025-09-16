// Alaa Ahmad

const { config } = require('./config');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello! The application is running in ${config.NODE_ENV} mode.`);
});

app.listen(config.PORT, () => {
  console.log(`Server is running in ${config.NODE_ENV} mode on port ${config.PORT}`);
  console.log(`Database URL is set: ${config.DATABASE_URL.substring(0, 20)}`);
});