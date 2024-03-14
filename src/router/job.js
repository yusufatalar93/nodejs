const express = require('express');
const router = express.Router();
const cron = require("node-cron");
const {API} = require("../constants/endPoints");
const {createFile, renameAndCloseFile, renameFile} = require("../controller/FileController")
const {seekData} = require("../controller/ApiController");
const {API_1_FILE_NAME} = require("../constants/constants")


createFile(API_1_FILE_NAME).then(() => {
    console.log("First file successfully created")
}).catch((err) => {
    console.error(`Error occurred while first file creating. Err = ${err}`);
    throw err;
});
router.get(API.GET, (req, res) => {
    res.json({
        message: "my job api"
    });
});

cron.schedule('* * * * *', () => {
    const api1DoneFile = API_1_FILE_NAME.replace('.txt', '_done.txt');
    renameFile(API_1_FILE_NAME, api1DoneFile).then(() => {
        console.log("File successfully renamed");
        createFile(API_1_FILE_NAME).then(() => {
            console.log("File successfully created");
        }).catch((err) => {
            console.error(`Error occurred while creating  file. Err = ${err}`);
            throw err;
        });
    }).catch((err) => {
        console.error(`Error occurred while renaming/closing or creating file. Err = ${err}`);
        throw err;
    });

});

cron.schedule('*/25 * * * * *', () => {
    console.log(`Save data job start at = ${Date.now()}`)
    const api1DoneFile = API_1_FILE_NAME.replace('.txt', '_done.txt');
    seekData(api1DoneFile, "API_1").then(() => {
        console.log(`Save data job successfully finished at = ${Date.now()}`)
    }).catch((err) => {
        console.error(`Error occurred while saving file content. Err = ${err}`);
        throw err;
    });
});
module.exports = router;

