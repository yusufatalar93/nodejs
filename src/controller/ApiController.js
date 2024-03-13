const {dbConnection} = require("../config/DbConfig")

const save = (req, res) => {
    res.status(200).send({
        message: "save message"
    });
}

const get = (req, res) => {
    const sql = "insert into customer_agents values (1,100,101,'node js test');"
    dbConnection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
    res.status(200).send({
        message: "get message"
    });
}
module.exports = {get, save}