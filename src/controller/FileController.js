const fs = require("fs");

const createFile = (file, callback) => {
    fs.open(file, 'a', (err) => {
        if (err) {
            console.error(err);
            callback(false);
        } else {
            callback(true);
        }
    });
};
const writeToFile = (file, content, callback) => {
    fs.appendFile(file, content, (err) => {
        if (err) {
            callback(false);
        }
        callback(true);
    });
}

const readFile = (file, callback) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            callback(null);
        } else {
            callback(data);
        }
    });
}
const renameFile = (oldFile, newFile, callback) => {
    fs.rename(oldFile, newFile, (err) => {
        if (err) {
            console.error(err);
            callback(false);
        } else {
            callback(true);
        }
    });
}

const deleteFile = (file, callback) => {
    fs.unlink(file, (err) => {
        if (err) {
            console.error(err);
            callback(false);
        } else {
            callback(true);
        }
    });

}

module.exports = {createFile, writeToFile, readFile, deleteFile, renameFile}