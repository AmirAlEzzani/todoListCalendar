import sql from 'mssql'
const config = {

  user: "sqladmin",
  password: "xxx!",
  server: "amirtodocalendar.database.windows.net",
  
  database: "amirTodoCalendarDB",
  connectionTimeout: 3000,
  parseJSON: true,
  options: {
    encrypt: true,
    enableArithAbort: true
  },
  pool: {
    min: 0,
    idleTimeoutMillis: 3000
  }
};
const pool = new sql.ConnectionPool(config);

/* doRequest()
  .then(_ => { console.log("succeeded"); })
  .catch(e => { console.log("error", e); });

async function doRequest() {
  await pool.connect();
  let result = await pool.request().query("select 1 as number");
  console.log(result);
} */

import dotenv from 'dotenv'
import cors from 'cors'

export async function createTasks(userid, date, tasklist, checklist) {
  try {
      let check = await pool.request().query(`
      delete from tasks where userid=? AND date=?
      `, [userid, date])
      console.log(check)
  } catch (error) {
      console.error('Error executing SQL queries:', error);
      throw error;
  }
  await pool.request().query(`
      INSERT INTO tasks (userid, date, tasklist, checklist)
      VALUES (?, ?, ?, ?)
      `, [userid, date, tasklist, checklist])
}


///////////////////

export async function deleteTasks(userid, date, tasklist, checklist) {
  if (tasklist.includes(',')) {
      console.log(tasklist)
      console.log('multiple')
      await pool.request().query(`
      delete from tasks where userid=? AND date=?
      `, [userid, date])
  await pool.request().query(`
      INSERT INTO tasks (userid, date, tasklist, checklist)
      VALUES (?, ?, ?, ?)
      `, [userid, date, tasklist, checklist])

  }
  else {
      console.log(tasklist)
      console.log('singular')
      await pool.request().query(`
      delete from tasks where userid=? AND date=?
      `, [userid, date])
  }
}
/////////////////////

export async function importTasks(userid, yearAndMonth) {
  const [result] = await pool.request().query(`
  SELECT *
  FROM tasks
  WHERE userid=? AND date LIKE CONCAT(?, '%')`, [userid, yearAndMonth])
  console.log('imported tasks:')
  return result;
}

//import on load, prev, and next
//use split at '-' to make array and get index 0 and 1 to get year and month

// if num of tasks is greater than 1, use updateTasks, if only one task, use deleteTasks