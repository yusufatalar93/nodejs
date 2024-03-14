const {dbConfig} = require("../config/idex");
const dbConnection = dbConfig.dbConnection;

const saveData = async (data, apiName) => {
    console.log("Saving data start");
    const date = new Date().getTime();
    const {success, fail} = extractResults(data);
    const sql = 'INSERT INTO api_results (api_name, date, success, fail) VALUES (?, ?, ?, ?)';
    await new Promise((resolve, reject) => {
        dbConnection.query(sql, [apiName, date, success, fail], (err) => {
            if (err) {
                console.error(`Error occurred while saving data for ${apiName}. Err = ${err}`);
                reject(err);
            } else {
                console.log(`Data successfully saved for ${apiName}`);
                resolve();
            }
        });
    });
};

const extractResults = (data) => {
    let fail = 0;
    let success = 0;
    if (data) {
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
