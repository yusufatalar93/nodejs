const  fs = require("fs");
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

module.exports = {createFile}