const fs = require("fs");
const {FILE_PATH} = require("../constansts/constants")


const createFile = () => {
    console.log('Cron job executed at:', new Date().toLocaleString());
    fs.open(FILE_PATH, 'a', (err) => {
        if (err) {
            console.error('Error creating file-project:', err);
            return;
        }
        console.log('File created successfully');
    });
}
const writeResult = (result) => {
    fs.appendFile(FILE_PATH, result, (err) => {
        if (err) {
            console.error(`Error occurred while writing result = ${result} to file`, err);
            return;
        }
        console.log(`Wrote result = ${result} to file successfully.`);
    });
}

const readFile = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return data;
    } catch (err) {
        console.error("Error reading the file:", err);
        throw err;
    }
}

module.exports = {createFile, writeResult, readFile}