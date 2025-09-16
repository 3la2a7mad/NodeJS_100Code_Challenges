// Alaa Ahmad

// The URL from question.
const urlString = 'https://example.com/api?x=10&y=test';

//built-in way to parse URLs in Node.js.
const urlObject = new URL(urlString);

// The .searchParams property provides methods to access query parameters by name.
const x = urlObject.searchParams.get('x');
const y = urlObject.searchParams.get('y');

console.log('x:', x);
console.log('y:', y);