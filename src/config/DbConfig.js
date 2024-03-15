const mysql = require('mysql2');
const dotenv = require('dotenv');
const logger = require("./winston-logger")
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
    logger.info("Connected to database");
});
module.exports = {dbConnection};