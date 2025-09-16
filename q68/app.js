//Alaa Ahmad
const config = require('./config');

const express = require('express');
const app = express();

const port = config.port;

app.get('/', (req, res) => {
    // I display the current config to easily verify it's working.
    res.json({
        message: `Server is running in '${config.env}' environment.`,
        configuration: config
    });
});

app.listen(port, () => {
    console.log(`Server started in '${config.env}' mode on port ${port}.`);
    
});