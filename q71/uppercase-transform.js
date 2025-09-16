// Alaa Ahmad

const { Transform } = require('stream');

//class extends the built-in Transform stream.
class UppercaseTransform extends Transform {
    
    _transform(chunk, encoding, callback) {
        try {
            const outputString = chunk.toString().toUpperCase();

            // Push the transformed data to the stream's output.
            this.push(outputString);
            callback();
        } catch (error) {
            callback(error);
        }
    }
}

module.exports = UppercaseTransform;