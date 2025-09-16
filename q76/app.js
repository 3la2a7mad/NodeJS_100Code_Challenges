// Alaa Ahmad

const { spawn } = require('child_process');

// For spawn the command and arguments are provided separately.
const command = 'node';
const args = ['-v']; // Argument to get the node version

console.log(`Spawning command: ${command} ${args.join(' ')}`);

// spawn() returns a ChildProcess object immediately.
const child = spawn(command, args);

// Pipe the stdout stream from the child directly to the parent's stdout.
child.stdout.pipe(process.stdout);

//good practice to also pipe stderr for any potential errors.
child.stderr.pipe(process.stderr);

// Handle cases where the command itself cannot be spawned.
child.on('error', (error) => {
    console.error(`Failed to start child process: ${error.message}`);
});

// Log the exit code when the child process completes.
child.on('close', (code) => {
    if (code !== 0) {
        console.log(`\nChild process exited with code: ${code}`);
    } else {
        console.log(`\nChild process completed successfully.`);
    }
});