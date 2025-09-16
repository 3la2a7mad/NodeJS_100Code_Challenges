// Alaa Ahmad
import path from 'path';

//to make me  free to declare __dirname.
const __dirname = '/usr/app';

// path.join.
const normalizedPath = path.join(__dirname, 'assets', 'img', 'logo.png');

console.log(normalizedPath);