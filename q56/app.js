// Alaa Ahmad

const express = require('express');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// A route to create an unverified user to test with.
app.post('/users', async (req, res) => {
    const newUser = await prisma.user.create({ data: { email: req.body.email } });
    res.status(201).json(newUser);
});

// A route to see all users and their verification status.
app.get('/users', async (req, res) => {
    res.status(200).json(await prisma.user.findMany());
});

// The main route to update and verify a user by their ID.
// The main route to update and verify a user by their ID.
app.patch('/users/:id/verify', async (req, res) => {
    try {
        // REMOVED parseInt(). The id is now correctly a string.
        const { id } = req.params; 

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { verified: true },
        });
        res.status(200).json(updatedUser);
  } catch (err) {
    // THIS IS THE MOST IMPORTANT CHANGE FOR DEBUGGING
    console.error("AN UNEXPECTED ERROR OCCURRED:", err); 

    // Handle the case where the user ID does not exist.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
        return res.status(404).json({ error: 'User not found.' });
    }
    res.status(500).json({ error: 'An internal error occurred. See server logs for details.' });
}
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});