const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'yourDatabaseName'
});
module.exports = connection;