// Alaa Ahmad

const http = require('http');
const port = 3000;

// Middleware: Logs the request.
function logger(req, res, next) {
  console.log(`Request received for URL: ${req.url}`);
  next(); // Pass control to the next function in the stack.
}

// Middleware: Adds a custom header.
function addAuthorHeader(req, res, next) {
  res.setHeader('X-Author', 'Alaa Ahmad');
  next();
}

// Middleware : The final handler that sends the response.
function finalResponse(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from the end of the middleware chain!');
}

// An array containing the middleware functions.
const middlewareStack = [logger, addAuthorHeader, finalResponse];


function runMiddleware(req, res, stack) {
  let index = 0;
  // The next function moves to the subsequent middleware.
  const next = () => {
    if (index < stack.length) {
      const currentMiddleware = stack[index];
      index++;
      currentMiddleware(req, res, next);
    }
  };
  
  next();
}

// Create the server and run the middleware.
const server = http.createServer((req, res) => {
  runMiddleware(req, res, middlewareStack);
});

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});