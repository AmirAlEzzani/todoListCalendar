const sql = require('mssql')
const config = {

  user: "sqladmin",
  password: "xxx",
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

doRequest()
  .then(_ => { console.log("succeeded"); })
  .catch(e => { console.log("error", e); });

async function doRequest() {
  await pool.connect();
  let result = await pool.request().query("select 1 as number");
  console.log(result);
}