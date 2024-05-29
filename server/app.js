import express from 'express'
import { createTasks, deleteTasks, importTasks } from './server.js'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())
console.log('test')
let taskStore = [];


app.post('/tasks', async (req, res) => {
    console.log('test1')
    const { userid, date, tasklist, checklist } = req.body;
    if (req.body.tasklist != null) {
        const task = await createTasks(userid, date, tasklist, checklist);
        res.status(201).send(task);
    }
    if (req.body.tasklist == null) {
        console.log('test2')
        let currentMonth = req.body.date;
        let userid = req.body.userid;
        let currentMonthSplit = currentMonth.split('-');
        let currMonth = currentMonthSplit[0]+'-'+currentMonthSplit[1]+'-'+currentMonthSplit[2];
        console.log(req.body.userid);
        console.log(currMonth);
        let tasks = await importTasks(userid, currMonth);
        taskStore.splice(0, 1, tasks);
        console.log(taskStore)
    }  
});

app.get('/tasks', async (req, res) => {
    console.log('test3')
    console.log('this is id');
    await new Promise(resolve => setTimeout(resolve, 100));
    res.status(201).send(taskStore);
});


app.delete('/tasks', async (req, res) => {
    const { userid, date, tasklist, checklist } = req.body
    const task = await deleteTasks(userid, date, tasklist, checklist)
    res.status(201).send(task)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

const PORT = process.env.PORT || 3306

app.listen(PORT, () => {
    console.log("Server is running....")
})