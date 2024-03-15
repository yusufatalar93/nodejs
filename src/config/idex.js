const dotenv = require('dotenv');
const dbConfig = require("./DbConfig")
const logger = require("./winston-logger");
dotenv.config();
module.exports = {
    port: process.env.PORT,
    dbConfig: dbConfig,
    logger: logger
};