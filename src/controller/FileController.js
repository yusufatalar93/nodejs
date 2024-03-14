const fs = require("fs");
const util = require('util');

const fsOpen = util.promisify(fs.open);
const fsAppendFile = util.promisify(fs.appendFile);
const fsRename = util.promisify(fs.rename);
const fsUnlink = util.promisify(fs.unlink);

const createFile = async (file) => {
    try {
        await fsOpen(file, 'a');
        console.log(`File ${file} successfully created.`);
    } catch (err) {
        console.error(`Error occurred while creating file ${file}. Err = ${err}`);
        throw err;
    }
};

const writeToFile = async (file, content) => {
    try {
        await fsAppendFile(file, content);
        console.log(`Content successfully appended to file ${file}.`);
    } catch (err) {
        console.error(`Error occurred while writing to file ${file}. Err = ${err}`);
        throw err;
    }
};

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
    try {
        await fsRename(oldFile, newFile);
        console.log(`File ${oldFile} successfully renamed to ${newFile}.`);
    } catch (err) {
        console.error(`Error occurred while renaming file ${oldFile} to ${newFile}. Err = ${err}`);
        throw err;
    }
};

const deleteFile = async (file) => {
    try {
        await fsUnlink(file);
        console.log(`File ${file} successfully deleted.`);
    } catch (err) {
        console.error(`Error occurred while deleting file ${file}. Err = ${err}`);
        throw err;
    }
};

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