const express = require('express');
const router = express.Router();
const cron = require("node-cron");
const fs = require("fs");
const {API} = require("../constansts/endPoints");
const {createFile} = require("../controller/JobController")

router.get(API.GET, (req, res) => {
    res.status(200).send({
        message: "my job list"
    });
});

cron.schedule('* * * * *', () => {
    createFile();
});

module.exports = router;

