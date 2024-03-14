const cron = require("node-cron");
const {createFile, replaceFiles} = require("../controller/FileController")
const {seekData} = require("../controller/ApiController");
const {API_LIST} = require("../util/constant/constants")

console.log("Creating first files");
for (const api of API_LIST) {
    createFile(api.filePath).then(() => {
        console.log(`${api.apiName} first file successfully created`)
    }).catch((err) => {
        console.error(`Error occurred while ${api.apiName} first file creating. Err = ${err}`);
        throw err;
    });
}
console.log("Fist files successfully created");

const replaceFileJob = cron.schedule('* * * * *', async () => {
    try {
        for (const api of API_LIST) {
            await replaceFiles(api);
            console.log(`Replaced file for api = ${api.apiName}`);
        }
    } catch (err) {
        console.error(`Error occurred in replace files job. Error =  ${err}`);
    }
});


const saveJob = cron.schedule('*/25 * * * * *', async () => {
    try {
        console.log(`Save data job start at = ${Date.now()}`);
        const promises = API_LIST.map(async (api) => {
            const apiDoneFile = api.filePath.replace('.txt', '_done.txt');
            await seekData(apiDoneFile, api.apiName);
            console.log(`Saving ${api.apiName} data successfully finished at = ${Date.now()}`);
        });
        await Promise.all(promises);
        console.log(`Save data job successfully finished at = ${Date.now()}`);
    } catch (err) {
        console.error(`Error occurred in save job. Error = ${err}`);
    }
});

replaceFileJob.start();
saveJob.start();
