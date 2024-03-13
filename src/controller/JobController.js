const  fs = require("fs");
const {filePath} = require("../constansts/constants")

const createFile = () => {
    console.log('Cron job executed at:', new Date().toLocaleString());
    fs.open(filePath, 'a', (err) => {
        if (err) {
            console.error('Error creating file-project:', err);
            return;
        }
        console.log('File created successfully');
    });
}

module.exports = {createFile}