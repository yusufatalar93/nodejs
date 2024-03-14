const cron = require("node-cron");
const {createFile, replaceFiles, createDirectory} = require("../controller/FileController")
const {seekData} = require("../controller/ApiController");
const {API_LIST} = require("../util/constant/constants");
const {FILE_BASE_PATH} = require('../util/constant/constants')

console.log("Creating first files");
createDirectory(FILE_BASE_PATH);

for (const api of API_LIST) {
    createFile(api.filePath).then(() => {
        console.log(`${api.apiName} first file successfully created`)
    }).catch((err) => {
        console.error(`Error occurred while ${api.apiName} first file creating. Err = ${err}`);
        throw err;
    });
}
console.log("Fist files successfully created");

const createNewFilesJob = cron.schedule('* * * * *', async () => {
    console.log(`Create new files job start at = ${Date.now()}`);
    try {
        for (const api of API_LIST) {
            await replaceFiles(api);
            console.log(`Replaced files for api = ${api.apiName}`);
        }
        console.log(`Files successfully created at = ${Date.now()}`);
    } catch (err) {
        console.error(`Error occurred in create files job. Error =  ${err}`);
    }
});


const saveFilesDataJob = cron.schedule('*/25 * * * * *', async () => {
    console.log(`Save data job start at = ${Date.now()}`);
    try {
        for (const api of API_LIST) {
            const apiDoneFile = api.filePath.replace('.txt', '_done.txt');
            await seekData(apiDoneFile, api.apiName);
            console.log(`Saving ${api.apiName} data successfully finished at = ${Date.now()}`);
        }
        console.log(`All data successfully saved at = ${Date.now()}`);
    } catch (err) {
        console.error(`Error occurred in save job. Error = ${err}`);
    }
});

createNewFilesJob.start();
saveFilesDataJob.start();
