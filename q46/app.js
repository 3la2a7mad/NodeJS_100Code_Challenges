// Alaa Ahmad
//POST http://localhost:3000/tasks with body {"text": "New task"}
//GET http://localhost:3000/tasks
//GET http://localhost:3000/tasks/1
//PUT http://localhost:3000/tasks/2 with body {"completed": true}
//DELETE http://localhost:3000/tasks/1
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory data store for course tasks.
let tasks = [
  { id: 1, text: 'Review NodeJS Basics', completed: true, author: 'Alaa' },
  { id: 2, text: 'Finish Express Middleware section', completed: false, author: 'Alaa' },
];
let nextId = 3;

// CREATE a new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text field is required.' });

  const newTask = { id: nextId++, text, completed: false, author: 'Alaa' };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// READ all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// READ a single task by ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found.' });
  res.status(200).json(task);
});

// UPDATE a task
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found.' });

  const { text, completed } = req.body;
  if (text !== undefined) task.text = text;
  if (completed !== undefined) task.completed = completed;

  res.status(200).json(task);
});

// [D]ELETE a task
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found.' });

  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});