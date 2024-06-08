import express from 'express';
import { createTasks, deleteTasks, importTasks } from './public/server.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


import CircularJSON from 'circular-json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
const port = 3000;
let taskStore = [];

app.use(express.json());
app.use(cors());

// Serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/tasks', async (req, res) => {
    const { userid, date, tasklist, checklist } = req.body;
    if (tasklist != null) {
        try {
            const task = await createTasks(userid, date, tasklist, checklist);
            res.status(201).send(task);
        } catch (error) {
            console.error('Error creating tasks:', error);
            res.status(500).send('Failed to create tasks');
        }
    } else {
        try {
            let currentMonth = req.body.date;
            let userid = req.body.userid;
            let currentMonthSplit = currentMonth.split('-');
            let currMonth = `${currentMonthSplit[0]}-${currentMonthSplit[1]}-${currentMonthSplit[2]}`;
            let tasks = await importTasks(userid, currMonth);
            taskStore.splice(0, 1, tasks);
            res.status(200).send(CircularJSON.stringify(taskStore));
        } catch (error) {
            console.error('Error importing tasks:', error);
            res.status(500).send('Failed to import tasks');
        }
    }
});

app.get('/tasks', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    res.status(200).send(CircularJSON.stringify(taskStore));
});

app.delete('/tasks', async (req, res) => {
    const { userid, date, tasklist, checklist } = req.body;
    try {
        const task = await deleteTasks(userid, date, tasklist, checklist);
        res.status(201).send(task);
    } catch (error) {
        console.error('Error deleting tasks:', error);
        res.status(500).send('Failed to delete tasks');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unexpected error:', err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
