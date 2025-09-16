// Alaa Ahmad
//npm run start
//npm run dev
const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Server is running!\n');
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});