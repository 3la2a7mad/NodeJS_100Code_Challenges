// Alaa Ahmad

const http = require('http');
const port = 3000;

// This helper function 
function sendError(res, statusCode, message) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: message }));
}

// Create the HTTP server.
const server = http.createServer((req, res) => {
  // Handle POST requests to the /sum endpoint.
  if (req.method === 'POST' && req.url === '/sum') {
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const { a, b } = JSON.parse(body);

        // Validate that 'a' and 'b' are numbers.
        if (typeof a !== 'number' || typeof b !== 'number') {
          return sendError(res, 400, 'Both "a" and "b" must be numbers.');
        }

        const sum = a + b;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ sum }));

      } catch (err) {
        return sendError(res, 400, 'Invalid JSON format in request body.');
      }
    });
  } else {
    // Handle all other requests with 404 Not Found.
    sendError(res, 404, 'Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});