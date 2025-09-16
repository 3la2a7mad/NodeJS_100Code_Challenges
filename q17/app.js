// Alaa Ahmad

const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');

const source = fs.createReadStream('big.txt');
const destination = fs.createWriteStream('big.txt.gz');
const gzip = zlib.createGzip();

console.log('Compressing big.txt');

// 'pipeline' connects the streams and handles errors.
pipeline(source, gzip, destination, (err) => {
  if (err) {
    return console.error('Compression failed:', err);
  }
  console.log('Compression successful.');
});