import express from 'express'
import { createTasks, deleteTasks, importTasks } from './server.js'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())


app.post('/tasks', async (req, res) => {
    const { userid, date, tasklist, checklist } = req.body
    if (req.body.tasklist != null) {
    const task = await createTasks(userid, date, tasklist, checklist)
    res.status(201).send(task) 
    }
    if (req.body.tasklist == null) {
        let currentMonth = req.body.date
        let userid = req.body.userid
        let currentMonthSplit = currentMonth.split('-')
        let currMonth = currentMonthSplit[0]+'-'+currentMonthSplit[1]+'-'+currentMonthSplit[2];
        console.log(req.body.userid)
        console.log(currMonth)
        const tasks = await importTasks(userid, currMonth)
        
        res.status(201).send(tasks)
    }  
    
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