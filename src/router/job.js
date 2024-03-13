const express = require('express');
const router = express.Router();
const cron = require("node-cron");
const fs = require("fs");
const {API} = require("../constansts/endPoints");
const {createFile} = require("../controller/FileController")
const {seekData}= require("../controller/ApiController")

router.get(API.GET, (req, res) => {
    res.status(200).send({
        message: "my job list"
    });
});

cron.schedule('* * * * *', () => {
    createFile();
});

cron.schedule('*/5 * * * * *', () => {
    seekData();
});

module.exports = router;

