// Alaa Ahmad

const fs = require('fs');
const CsvToJsonTransform = require('./csv-to-json');

const csvParser = new CsvToJsonTransform();

const readableStream = fs.createReadStream('data.csv');
const writableStream = fs.createWriteStream('data.json');

console.log('Processing data.csv...');

// Pipe the streams: Read CSV -> Transform to JSON -> Write JSON
readableStream.pipe(csvParser).pipe(writableStream);

writableStream.on('finish', () => {
    console.log('Done! Check data.json for the output.');
});