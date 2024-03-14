const fs = require("fs");

const createFile = async (file) => {
    fs.open(file, 'a', (err) => {
        if (err) {
            throw err;
        }
    });
};
const writeToFile = async (file, content, callback) => {
    fs.appendFile(file, content, (err) => {
        if (err) {
            throw err;
        }
    });
}

const readFile = async (file, callback) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error occurred while file is reading.Error = ${err}`);
            callback(null);
        } else {
            callback(data);
        }
    });
}
const renameFile= async (oldFile, newFile) => {
    fs.rename(oldFile, newFile, (err) => {
        if (err) {
            throw err;
        }
    });
}


const deleteFile = async (file) => {
    fs.unlink(file, (err) => {
        if (err) {
            throw err;
        }
    });

}

module.exports = {createFile, writeToFile, readFile, deleteFile, renameFile}