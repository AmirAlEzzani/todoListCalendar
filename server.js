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


export async function createTasks(userid, date, tasklist, checklist) {
    try {
        let check = await pool.query(`
        delete from tasks where userid=? AND date=?
        `, [userid, date])
        console.log(check)
    } catch (error) {
        console.error('Error executing SQL queries:', error);
        throw error;
    }
    await pool.query(`
        INSERT INTO tasks (userid, date, tasklist, checklist)
        VALUES (?, ?, ?, ?)
        `, [userid, date, tasklist, checklist])
}


///////////////////

export async function deleteTasks(userid, date, tasklist, checklist) {
    if (tasklist.includes(',')) {
        console.log(tasklist)
        console.log('multiple')
        await pool.query(`
        delete from tasks where userid=? AND date=?
        `, [userid, date])
    await pool.query(`
        INSERT INTO tasks (userid, date, tasklist, checklist)
        VALUES (?, ?, ?, ?)
        `, [userid, date, tasklist, checklist])

    }
    else {
        console.log(tasklist)
        console.log('singular')
        await pool.query(`
        delete from tasks where userid=? AND date=?
        `, [userid, date])
    }
}

export async function importTasks(userid, yearAndMonth) {
    const [result] = await pool.query(`
    SELECT *
    FROM tasks
    WHERE userid=? AND date LIKE CONCAT(?, '%')`, [userid, yearAndMonth])
    console.log('imported tasks:')
    console.log(result)
}
//import on load, prev, and next
//use split at '-' to make array and get index 0 and 1 to get year and month

// if num of tasks is greater than 1, use updateTasks, if only one task, use deleteTasks