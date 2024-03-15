const fs = require("fs");
const util = require('util');
const fsOpen = util.promisify(fs.open);
const fsAppendFile = util.promisify(fs.appendFile);
const fsRename = util.promisify(fs.rename);
const fsUnlink = util.promisify(fs.unlink);
const fsReadFile = util.promisify(fs.readFile);
const {logger} = require("../config/idex");

const createFile = async (file) => {
    try {
        await fsOpen(file, 'a');
        logger.info(`File ${file} successfully created.`);
    } catch (err) {
        logger.error(`Error occurred while creating file ${file}. Err = ${err}`);
        throw err;
    }
};

const writeToFile = async (file, content) => {
    try {
        await fsAppendFile(file, content);
        logger.info(`Content successfully appended to file ${file}.`);
    } catch (err) {
        logger.error(`Error occurred while writing to file ${file}. Err = ${err}`);
        throw err;
    }
};

const readFile = async (file) => {
    try {
        const data = await fsReadFile(file, 'utf8');
        logger.info(`File = ${file} read successfully:`, data);
        return data;
    } catch (err) {
        logger.error('Error occurred while reading file:', err);
        return null;
    }
}

const renameFile = async (oldFile, newFile) => {
    try {
        await fsRename(oldFile, newFile);
        logger.info(`File ${oldFile} successfully renamed to ${newFile}.`);
    } catch (err) {
        logger.error(`Error occurred while renaming file ${oldFile} to ${newFile}. Err = ${err}`);
        throw err;
    }
};

const deleteFile = async (file) => {
    try {
        await fsUnlink(file);
        logger.info(`File ${file} successfully deleted.`);
    } catch (err) {
        logger.error(`Error occurred while deleting file ${file}. Err = ${err}`);
        throw err;
    }
};

const replaceFiles = async (api) => {
    try {
        const filePath = api.filePath;
        const apiDoneFile = filePath.replace('.txt', '_done.txt');
        await renameFile(filePath, apiDoneFile);
        logger.info("File successfully renamed");
        await createFile(filePath);
        logger.info(`File successfully created for api = ${api.apiName}`);
    } catch (err) {
        logger.error(`An error occurred: ${err}`);
        throw err;
    }
}

const createDirectory = (path) => {
    try {
        fs.mkdirSync(path, { recursive: true });
        logger.info(`Directory ${path} already exist or successfully created.`);
    } catch (err) {
        logger.error(`Error occurred while creating directory ${path}. Err = ${err}`);
        throw err;
    }
};

module.exports = {createFile, writeToFile, readFile, deleteFile, renameFile, replaceFiles, createDirectory}