const mysql = require("mysql");
const util = require("util");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "library_db",
  });
}

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;
