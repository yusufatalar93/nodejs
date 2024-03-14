const dotenv = require('dotenv');
const dbConfig = require("./DbConfig")
dotenv.config();
module.exports = {
    port: process.env.PORT,
    dbConfig: dbConfig
};