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

export async function createTasks(uid, date, tasklist, checklist) {
    const [result] = await pool.query(`
    INSERT INTO tasks (userid, date, tasklist, checklist)
    VALUES (?, ?, ?, ?)
    `, [uid, date, tasklist, checklist])
    return result;
}

export async function removeTask(uid, date) {
    const [result] = await pool.query(`
    DELETE FROM tasks WHERE userid=(?) AND date=(?)`, [uid, date])
    return result;
}

export async function updateTasks(uid, date, tasklist, checklist) {
    const [result] = await pool.query(`
    replace from tasks where  userid=(?) AND date=(?), replace tasklist and checklist
    (?, ?)`, [uid, date, tasklist, checklist])
}

// get id of matching user id and date, replace tasklist and checklist with new
