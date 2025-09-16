// Alaa Ahmad
import { fileURLToPath } from 'url';
import path from 'path';
//ESM way to get __filename and __dirname.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function greet(name) {
    return `my name is ${name}! This is an ESM module.`;
}
const message = greet('Alaa Ahmad');
console.log(message);
console.log(`Current directory: ${__dirname}`);
