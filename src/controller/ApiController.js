const {writeToFile, renameFile, readFile, deleteFile} = require("./FileController")
const {saveData} = require("../service/ApiService");
const {API_1_FILE_NAME, API_2_FILE_NAME} = require("../constants/constants")
const save = (req, res) => {
    res.json({message: "save message"});
}

const get = (req, res) => {
    const result = Math.random() < 0.5 ? "1" : "0";
    writeToFile(API_1_FILE_NAME, result).then(() =>
        res.json({
            message: `Result = ${result}`
        })).catch((err) => {
        console.log(`Error occurred while writing result to file. Error = ${err}`);
        throw err;
    });
}

const seekData = async (file, name) => {
    await readFile(file, async (data) => {
        if (data != null) {
            saveData(data, name).then(() => {
                deleteFile(file).then(() => {
                    console.error(`File successfully deleted. File = ${file}`);
                }).catch((err) => {
                    console.error(`Error occurred while deleting file. Err = ${err}`);
                    throw err;
                });
            }).catch((err) => {
                console.error(`Error occurred while saving file content results. Err = ${err}`)
            });
        } else {
            console.log("No insertion because no data exist")
        }
    });
}
module.exports = {get, save, seekData}