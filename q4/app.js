// Alaa Ahmad

// Load environment variables from a .env file.
require('dotenv').config();

// Read the PORT from the environment, with a fallback to 3000.
const PORT = process.env.PORT || 3000;

console.log(`Listening on :${PORT}`);