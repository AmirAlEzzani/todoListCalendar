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
    console.log(rows)
}

export async function getTask(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM tasks
    WHERE id = ?
    `, [id])
    console.log(rows)
}


export async function createTasks(userid, date, tasklist, checklist) {
    try {
        await pool.query(`
        delete from tasks where userid=? AND date=?
        `, [userid, date])
    } catch (error) {
        console.error('Error executing SQL queries:', error);
        throw error;
    }
    await pool.query(`
        INSERT INTO tasks (userid, date, tasklist, checklist)
        VALUES (?, ?, ?, ?)
        `, [userid, date, tasklist, checklist])
}

export async function deleteTasks(userid, date, tasklist, checklist) {
    const [result] = await pool.query(`
    delete from tasks where userid=? AND date=?
    `, [userid, date])
    const [result2] = await pool.query(`
    INSERT INTO tasks (userid, date, tasklist, checklist)
    VALUES (?, ?, ?, ?)
    `, [userid, date, tasklist, checklist])
    console.log(result)
    console.log(result2)
}

export async function updateTasks(userid, date, tasklist, checklist) {
    const [result] = await pool.query(`
    update tasks set tasklist = _, set checklist = _
    `, [userid, date, tasklist, checklist])
    console.log(result)
}

export async function importTasks(userid, yearAndMonth) {
    const [result] = await pool.query(`
    SELECT *
    FROM tasks
    WHERE userid=? AND date LIKE ?
    `, [userid, `${yearAndMonth}%`])
    console.log(result)
}
//import on load, prev, and next
//use split at '-' to make array and get index 0 and 1 to get year and month

// if num of tasks is greater than 1, use updateTasks, if only one task, use deleteTasks