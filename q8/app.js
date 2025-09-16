// Alaa Ahmad

const fs = require('fs');
const filePath = 'out.txt';

console.log('Initiating file write and append operations');

// write Hello to the file.
fs.writeFile(filePath, 'Hello', 'utf8', (err) => {
    if (err) {
        return console.error('Error writing file:', err);
    }
    console.log('Successfully wrote "Hello" to out.txt');

    // append World
    fs.appendFile(filePath, ' World', 'utf8', (appendErr) => {
        if (appendErr) {
            return console.error('Error appending to file:', appendErr);
        }
        console.log('Successfully appended " World".');
    });
});