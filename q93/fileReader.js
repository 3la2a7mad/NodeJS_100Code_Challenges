// Alaa Ahmad

const fs = require('fs/promises');

async function getRawFileContent(filePath) {
  return fs.readFile(filePath, 'utf8');
}

module.exports = { getRawFileContent };