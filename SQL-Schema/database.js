const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "filmsdb",
  password: "Redoctopus353",
});

module.exports = pool.promise()