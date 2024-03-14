const FILE_BASE_PATH = './resources/';

const API_LIST = [
    {
        apiName: "API_1",
        filePath: FILE_BASE_PATH + 'api1.txt'
    },
    {
        apiName: "API_2",
        filePath: FILE_BASE_PATH + 'api2.txt'
    },
]
const API_1_FILE_NAME = FILE_BASE_PATH + 'api1.txt'
const API_2_FILE_NAME = FILE_BASE_PATH + 'api2.txt'

module.exports = {API_1_FILE_NAME, API_2_FILE_NAME, API_LIST}
