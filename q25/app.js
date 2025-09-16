// Alaa Ahmad

const myString = 'Alaa Ahmad';

// Create a Buffer from the string.
const myBuffer = Buffer.from(myString, 'utf8');

// Convert the Buffer to its hexadecimal string.
const hexString = myBuffer.toString('hex');

console.log(`Original String:\n${myString}`);
console.log('-'.repeat(20));

console.log("Buffer Representation:");
console.log(myBuffer);
console.log('-'.repeat(20));

console.log(`Hex Representation:\n${hexString}`);
console.log('-'.repeat(20));