const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const dbConnection = mysql.createConnection({
    host: process.env.DB_URL,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
dbConnection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});
module.exports = {dbConnection};