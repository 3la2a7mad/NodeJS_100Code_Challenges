// Alaa Ahmad
//http://localhost:3000/greet?name=Alaa
const http = require('http');
const port = 3000;

// Create the HTTP server.
const server = http.createServer((req, res) => {
  // Use the URL constructor to easily parse the request URL, including query parameters.
  const url = new URL(req.url, `http://${req.headers.host}`);


  if (req.method === 'GET' && url.pathname === '/greet') {
    const name = url.searchParams.get('name');

    
    if (!name) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('The "name" query parameter is required.');
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello, ${name}`);

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server.
server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});