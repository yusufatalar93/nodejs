const {dbConnection} = require("../config/DbConfig")
const {writeResult, readFile} = require("./FileController")

const save = (req, res) => {
    res.status(200).send({
        message: "save message"
    });
}

const get = (req, res) => {
    const success = Math.random() < 0.5;
    if (success) {
        writeResult("1");
        res.status(200).send({
            message: "success get request response"
        });
    } else {
        writeResult("0");
        res.status(500).send({
            message: "fail get request response"
        });
    }
}

const seekData = () => {
    const data = readFile();
    const id = new Date().getTime();
    const sql = `INSERT INTO customer_agents VALUES (${id}, 0, 0, ${data});`;
    dbConnection.query(sql, function (err, result) {
        if (err) throw err;
    });
}
module.exports = {get, save, seekData}