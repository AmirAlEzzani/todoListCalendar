const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'tododb'
})

app.post('/create', (req, res) => {
    const date = req.body.date;
    const tasklist = req.body.tasklist;
    const checklist = req.body.checklist;

    db.query('INSERT INTO TODOCALENDARDB (date, tasklist, checklist) VALUES (?,?,?)', 
    [date, tasklist, checklist], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Values inserted')
        }
    })
})

app.listen(3001, ()=> {
    console.log('Running')
})