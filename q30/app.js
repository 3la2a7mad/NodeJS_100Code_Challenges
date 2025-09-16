// Alaa Ahmad
//node app.js --upper "Alaa Ahmad, Birzeit University"
// node app.js

// to command-line arguments whitout 'node' and the script name.
const args = process.argv.slice(2);

// Prints a help message
function printHelp() {
  console.log("-".repeat(40));
  console.log(`Usage: node cli.js --upper "your text here"`);
  console.log("-".repeat(40));
}

// Check for the '--upper' flag and the text that follows.
if (args[0] === '--upper' && args[1]) {
  const text = args[1];
  console.log(text.toUpperCase());
} else {
  // If the arguments are incorrect, print the help message.
  printHelp();
}