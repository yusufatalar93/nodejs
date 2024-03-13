const {writeToFile, renameFile, readFile, deleteFile} = require("./FileController")
const {saveData} = require("../service/ApiService");
const {API_1_FILE_NAME, API_2_FILE_NAME} = require("../constants/constants")
const save = (req, res) => {
    res.status(200).send({
        message: "save message"
    });
}

const get = (req, res) => {
    const result = Math.random() < 0.5 ? "1" : "0";
    writeToFile(API_1_FILE_NAME, result, (success) => {
        if (success) {
            console.log(`Result = ${result} successfully registered to file`)
        } else {
            console.log(`Error occurred while result = ${result} registering to file`)
        }
    });
    res.status(200).send({
        message: `Result = ${result}`
    });
}

const seekData = (file) => {
    readFile(file, (data) => {
        if (data) {
            saveData(data,file);
            deleteFile(file, (success) => {
                if (success) {
                    console.log(`File = ${file} successfully deleted`)
                } else {
                    console.log(`Error occurred while deleting file`)
                }
            })
        } else {
            console.log("No insertion because no data exist")
        }
    });
}
module.exports = {get, save, seekData}