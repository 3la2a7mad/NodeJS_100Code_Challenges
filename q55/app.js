// Alaa Ahmad

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// A route to seed the database with test data.
app.post('/seed', async (req, res) => {
    await prisma.user.deleteMany({});
    await prisma.user.createMany({
        data: [
            { email: 'alaa.ahmad@example.com' },
            { email: 'test.user@bzu.edu' },
            { email: 'another.student@example.com' },
            { email: 'diana@gmail.com' },
        ],
    });
    res.status(201).json({ message: 'Database seeded successfully.' });
});

// The main query route.
app.get('/users/search', async (req, res) => {
    const { domain } = req.query;
    if (!domain) {
        return res.status(400).json({ message: 'The "domain" query parameter is required.' });
    }

    // Use findMany with a 'where' clause and 'endsWith' filter.
    const users = await prisma.user.findMany({
        where: { email: { endsWith: `@${domain}` } },
    });
    
    res.status(200).json(users);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});