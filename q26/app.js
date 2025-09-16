// Alaa Ahmad

// Create separate buffers
const buffer1 = Buffer.from('Alaa ');
const buffer2 = Buffer.from('Ahmad ');
const buffer3 = Buffer.from('Computer Engineering');

// Combine the buffers into a new one using Buffer.concat
const combinedBuffer = Buffer.concat([buffer1, buffer2, buffer3]);

// Convert the combined buffer to a string to see result.
const finalString = combinedBuffer.toString();


console.log('Combined Buffer as String:');
console.log(finalString);