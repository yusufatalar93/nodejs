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

const renameFile = async (oldFile, newFile) => {
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

const replaceFiles = async (api) => {
    const filePath = api.filePath;
    const apiDoneFile = filePath.replace('.txt', '_done.txt');
    renameFile(filePath, apiDoneFile).then(() => {
        console.log("File successfully renamed");
        createFile(filePath).then(() => {
            console.log(`File successfully created for api = ${api.apiName}`);
        }).catch((err) => {
            console.error(`Error occurred while creating api = ${api.apiName} file. Err = ${err}`);
            throw err;
        });
    }).catch((err) => {
        console.error(`Error occurred while renaming api = ${api.apiName} file. Err = ${err}`);
        throw err;
    });
}

module.exports = {createFile, writeToFile, readFile, deleteFile, renameFile, replaceFiles}