const fs = require("fs");
const util = require('util');

const fsOpen = util.promisify(fs.open);
const fsAppendFile = util.promisify(fs.appendFile);
const fsRename = util.promisify(fs.rename);
const fsUnlink = util.promisify(fs.unlink);
const fsReadFile = util.promisify(fs.readFile);
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

const readFile = async (file) => {
    try {
        const data = await fsReadFile(file, 'utf8');
        console.log(`File = ${file} read successfully:`, data);
        return data;
    } catch (err) {
        console.error('Error occurred while reading file:', err);
        return null;
    }
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
    try {
        const filePath = api.filePath;
        const apiDoneFile = filePath.replace('.txt', '_done.txt');
        await renameFile(filePath, apiDoneFile);
        console.log("File successfully renamed");
        await createFile(filePath);
        console.log(`File successfully created for api = ${api.apiName}`);
    } catch (err) {
        console.error(`An error occurred: ${err}`);
        throw err;
    }
}

const createDirectory = (path) => {
    try {
        fs.mkdirSync(path, { recursive: true });
        console.log(`Directory ${path} already exist or successfully created.`);
    } catch (err) {
        console.error(`Error occurred while creating directory ${path}. Err = ${err}`);
        throw err;
    }
};

module.exports = {createFile, writeToFile, readFile, deleteFile, renameFile, replaceFiles, createDirectory}