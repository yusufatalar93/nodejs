const cron = require("node-cron");
const {createFile, replaceFiles} = require("../controller/FileController")
const {seekData} = require("../controller/ApiController");
const {API_LIST} = require("../constants/constants")


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

const createFileJob = cron.schedule('* * * * *', () => {
    for (const api of API_LIST) {
        replaceFiles(api).then(() => {
            console.log(`Replaced file for api = ${api.apiName}`)
        }).catch((err) => {
            console.error(`Replace file for api = ${api.apiName} failed`)
            throw err;
        })
    }
});

const saveJob = cron.schedule('*/25 * * * * *', () => {
    console.log(`Save data job start at = ${Date.now()}`);
    for (const api of API_LIST) {
        const api1DoneFile = api.filePath.replace('.txt', '_done.txt');
        seekData(api1DoneFile, api.apiName).then(() => {
            console.log(`Saving ${api.apiName} data successfully finished at = ${Date.now()}`)
        }).catch((err) => {
            console.error(`Error occurred  while saving ${api.apiName} data. Error = ${err}`);
            throw err;
        });
    }
    console.log(`Save data job successfully finished at = ${Date.now()}`)
});

createFileJob.start();
saveJob.start();
