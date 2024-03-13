const express = require('express');
const router = express.Router();
const cron = require("node-cron");
const {API} = require("../constants/endPoints");
const {createFile, fileRenameAndCreate, renameFile} = require("../controller/FileController")
const {seekData} = require("../controller/ApiController");
const {API_1_FILE_NAME} = require("../constants/constants")


createFile(API_1_FILE_NAME, (success) => {
    console.log("CreatingFile beginning of jobs")
    if (success) {
        console.log("File successfully created");
    } else {
        console.log("Error occurred while file creating");
    }
});
router.get(API.GET, (req, res) => {
    res.status(200).send({
        message: "my job list"
    });
});

cron.schedule('* * * * *', () => {
    const api1DoneFile = API_1_FILE_NAME.replace('.txt', '_done.txt');
    renameFile(API_1_FILE_NAME, api1DoneFile, (success) => {
        if (success) {
            console.log("File successfully renamed");
            createFile(API_1_FILE_NAME, (success) => {
                if (success) {
                    console.log("File successfully created");
                } else {
                    console.log("Error occurred while file creating");
                }
            });
        } else {
            console.log("Error occurred while file renaming");
        }
    });

});

cron.schedule('*/25 * * * * *', () => {
    const api1DoneFile = API_1_FILE_NAME.replace('.txt', '_done.txt');
    seekData(api1DoneFile);
});

module.exports = router;

