// Alaa Ahmad

const http = require('http');

const port = 3000;

const responsePayload = {
  status: 'ok',
  serverOwner: 'Alaa Ahmad'
};

const jsonResponse = JSON.stringify(responsePayload);

// Create the HTTP server.
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  // Send the JSON string as the response body.
  res.end(jsonResponse);
});
server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});