import mysql from 'mysql2'
import dotenv from 'dotenv'
import cors from 'cors'

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
const tasks = await getTask(18)
console.log(await getTask(18))


export async function createTasks(userid, date, tasklist, checklist) {
    const [result] = await pool.query(`
    INSERT INTO tasks (userid, date, tasklist, checklist)
    VALUES (?, ?, ?, ?)
    `, [userid, date, tasklist, checklist])
    return {
        userid,
        date,
        tasklist,
        checklist
    }
}

export async function deleteTasks(date) {
    const [result] = await pool.query(`
    delete from tasks where date=(?)
    `, [date])
    return {

    }
}