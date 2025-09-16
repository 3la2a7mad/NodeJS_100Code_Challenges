// Alaa Ahmad

import { fileURLToPath } from 'url';
import path from 'path';

//using 'import.meta.url' get full path'.
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the full file path.
const __dirname = path.dirname(__filename);

console.log(`Emulated __dirname: ${__dirname}`)