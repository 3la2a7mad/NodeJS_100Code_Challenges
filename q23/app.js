// Alaa Ahmad

const os = require('os');

// Get the operating system platform.
const platform = os.platform();
// Get the number of CPU cores.
const cpuCount = os.cpus().length;
// Get total system memory and convert it from bytes to megabytes.
const totalMemoryMB = Math.round(os.totalmem() / 1024 / 1024);

// Log the collected information.
console.log(`OS Platform: ${platform}`);
console.log(`CPU Cores: ${cpuCount}`);
console.log(`Total System Memory: ${totalMemoryMB} MB`);
console.log(`System run by: Alaa Ahmad`);