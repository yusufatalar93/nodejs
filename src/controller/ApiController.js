const {writeToFile, readFile, deleteFile} = require("./FileController")
const {saveData} = require("../service/ApiService");
const {API_1_FILE_NAME, API_2_FILE_NAME} = require("../util/constant/constants");
const {logger} = require("../config/idex");

const api1 = async (req, res) => {
    const result = Math.random() < 0.5 ? "1" : "0";
    try {
        await writeToFile(API_1_FILE_NAME, result);
        res.json({
            message: `Result = ${result}`
        });
    } catch (err) {
        logger.error(`Error occurred while writing result to file. Error = ${err}`);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}

const api2 = async (req, res) => {
    const result = Math.random() < 0.5 ? "1" : "0";
    try {
        await writeToFile(API_2_FILE_NAME, result);
        res.json({
            message: `Result = ${result}`
        });
    } catch (err) {
        logger.error(`Error occurred while writing result to file. Error = ${err}`);
        res.status(500).json({
            error: "Internal server error"
        });
    }
}

const seekData = async (file, name) => {
    try {
        const data = await readFile(file);
        if (data != null) {
            await saveData(data, name);
            await deleteFile(file);
            logger.error(`File successfully deleted. File = ${file}`);
            logger.info(`Data for api ${name} successfully saved`);
        } else {
            logger.info("No insertion because no data exist");
        }
    } catch (err) {
        logger.error(`Error occurred while saving data process. Error =  ${err}`);
        throw err;
    }
}


module.exports = {api1, api2, seekData}