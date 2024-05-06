import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getTasks() {
    const [rows] = await pool.query('SELECT * FROM tasks')
    return rows
}

export async function getTask(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM tasks
    WHERE id = ?
    `, [id])
    return rows
}

export async function createTask(date, tasklist, checklist) {
    const [result] = await pool.query(`
    INSERT INTO tasks (date, tasklist, checklist)
    VALUES (?, ?, ?)
    `, [date, tasklist, checklist])
    return {
        id: result.insertId,
        date,
        tasklist,
        checklist
    }
}

const result = await createTask('2024-05-01', 'drive', 'true')
console.log(result)