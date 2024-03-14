const {dbConnection} = require("../config/DbConfig")

const saveData = async (data, apiName) => {
    console.log("Saving data start")
    const date = new Date().getTime();
    const {success, fail} = extractResults(data);
    const sql = 'INSERT INTO api_results (api_name, date, success, fail) VALUES (?, ?, ?, ?)';
    dbConnection.query(sql, [apiName, date, success, fail], function (err) {
        if (err) throw err;
    });
}
const extractResults = (data) => {
    let fail = 0;
    let success = 0;
    if (data){
        for (let i = 0; i < data.length; i++) {
            if (data[i] === '0') {
                fail++;
            } else if (data[i] === '1') {
                success++;
            }
        }
    }
    return {success: success, fail: fail};
}

module.exports = {saveData}