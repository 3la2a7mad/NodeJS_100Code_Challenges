// Alaa Ahmad

const { Transform } = require('stream');

class CsvToJsonTransform extends Transform {
    constructor(options) {
        super(options);
        this._lastLineData = ''; 
    }

    // Handles incoming chunks of data
    _transform(chunk, encoding, callback) {
        try {
            const data = this._lastLineData + chunk.toString();
            const lines = data.split('\n');

            // The last item might be a partial line, so i save it for the next chunk
            this._lastLineData = lines.pop();

            for (const line of lines) {
                if (line.trim()) {
                    this._processLine(line);
                }
            }
            callback();
        } catch (error) {
            callback(error);
        }
    }

    // Called when the source stream has no more data
    _flush(callback) {
        try {
            if (this._lastLineData.trim()) {
                this._processLine(this._lastLineData);
            }
            callback();
        } catch (error) {
            callback(error);
        }
    }

    // Helper method to parse a single CSV line and push JSON
    _processLine(line) {
        const [name, age] = line.split(',');
        if (name && age) {
            const jsonObject = {
                name: name.trim(),
                age: Number(age.trim())
            };
            const jsonLine = JSON.stringify(jsonObject) + '\n';
            this.push(jsonLine); // Push the JSON string to the output
        }
    }
}

module.exports = CsvToJsonTransform;