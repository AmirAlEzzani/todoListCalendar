

const app = express()
app.use(express.json())

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

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})