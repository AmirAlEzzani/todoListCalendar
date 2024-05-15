import express from 'express'
import { getTasks, getTask, createTasks, deleteTasks, updateTasks, importTasks } from './server.js'
import cors from 'cors'

const currentMonth = localStorage.getItem('currentMonth')


const app = express()
app.use(express.json())
app.use(cors())

app.get('/tasks', async (req, res) => {
    const tasks = await getTasks()
    res.send(tasks)
})

app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const task = await getTask(id)
    res.send(task)
})

app.post('/tasks', async (req, res) => {
    const { userid, date, tasklist, checklist } = req.body
    const task = await createTasks(userid, date, tasklist, checklist)
    res.status(201).send(task)
})
//NEED TO GET ARGUMENTS USERID AND EXTRACTEDID AND MAKE QUERY TO GET MATCHING DATA
app.get('/tasks', async (req, res) => {
    const { userid, yearAndMonth } = req.body
    const tasks = await importTasks(userid, yearAndMonth)
    res.send(tasks)
})

app.delete('/tasks', async (req, res) => {
    const { userid, date, tasklist, checklist } = req.body
    const task = await deleteTasks(userid, date, tasklist, checklist)
    res.status(201).send(task)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8000, () => {
    console.log('server is running on port 8000')
})
const notes = await getTask(1)
console.log(notes)