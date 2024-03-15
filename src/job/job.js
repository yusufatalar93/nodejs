const cron = require("node-cron");
const {createFile, replaceFiles, createDirectory} = require("../controller/FileController")
const {seekData} = require("../controller/ApiController");
const {API_LIST} = require("../util/constant/constants");
const {FILE_BASE_PATH} = require('../util/constant/constants')
const {logger} = require("../config/idex");

logger.info("Creating first files");
createDirectory(FILE_BASE_PATH);

for (const api of API_LIST) {
    createFile(api.filePath).then(() => {
        logger.info(`${api.apiName} first file successfully created`)
    }).catch((err) => {
        logger.error(`Error occurred while ${api.apiName} first file creating. Err = ${err}`);
        throw err;
    });
}
logger.info("Fist files successfully created");

const createNewFilesJob = cron.schedule('* * * * *', async () => {
    logger.info(`Create new files job start at = ${Date.now()}`);
    try {
        for (const api of API_LIST) {
            await replaceFiles(api);
            logger.info(`Replaced files for api = ${api.apiName}`);
        }
        logger.info(`Files successfully created at = ${Date.now()}`);
    } catch (err) {
        logger.error(`Error occurred in create files job. Error =  ${err}`);
    }
});


const saveFilesDataJob = cron.schedule('*/25 * * * * *', async () => {
    logger.info(`Save data job start at = ${Date.now()}`);
    try {
        for (const api of API_LIST) {
            const apiDoneFile = api.filePath.replace('.txt', '_done.txt');
            await seekData(apiDoneFile, api.apiName);
            logger.info(`Saving ${api.apiName} data successfully finished at = ${Date.now()}`);
        }
        logger.info(`All data successfully saved at = ${Date.now()}`);
    } catch (err) {
        logger.error(`Error occurred in save job. Error = ${err}`);
    }
});

createNewFilesJob.start();
saveFilesDataJob.start();
