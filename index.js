import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'; 

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "todocalendar"
})

app.use(express.json())
app.use(cors());
app.post('/', (req,res) => {
    const query = 'INSERT INTO tasks (`date`, `tasklist`, `checklist`) VALUES (?)'
    const values = [
        req.body.date,
        req.body.tasklist,
        req.body.checklist
    ]

    db.query(query, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json('task has been created')
    })
})

app.get('/tasks', (req, res) => {
    const query = "SELECT * FROM tasks"
    db.query(query,(err,data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=> {
    console.log('Connected to backend')
})


