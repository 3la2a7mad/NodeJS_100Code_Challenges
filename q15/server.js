// Alaa Ahmad

const http = require('http');
const port = 3000;
const server = http.createServer((req, res) => {
  
  if (req.url === '/hello') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found 404');
  }
});


server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});