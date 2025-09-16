// Alaa Ahmad

const fs = require('fs/promises');
const filePath = 'result.json';

const content = {
  ok: true,
  author: "Alaa Ahmad",
  major: "Computer Engineering",
  university: "Birzeit University"
};

// JavaScript object into a readable JSON format.
const jsonString = JSON.stringify(content, null, 2);

async function writeJsonFile() {
  console.log(`Writing JSON data to ${filePath}`);
  try {
    // 'await' the function until the file is successfully written.
    await fs.writeFile(filePath, jsonString);
    console.log('Successfully wrote data to result.json');
  } catch (err) {
    console.error('Error writing the file:', err);
  }
}

writeJsonFile();