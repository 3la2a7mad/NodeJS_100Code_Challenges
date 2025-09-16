// Alaa Ahmad

const { exec } = require('child_process');

// Use the appropriate command for the current operating system.
const command = process.platform === 'win32' ? 'dir' : 'ls -la';

console.log(`Executing command: "${command}"`);

// Execute the command and handle the output in a callback.
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Execution error: ${error.message}`);
        return;
    }
    if (stderr) {
        // stderr  used for warnings or progress messages.
        console.error(`stderr: ${stderr}`);
    }

    console.log(`---------------------------------`);
    console.log(`Length of stdout: ${stdout.length}`);
    console.log(`---------------------------------`);
    console.log("Full stdout content:");
    console.log(stdout);
    console.log(`---------------------------------`);
});