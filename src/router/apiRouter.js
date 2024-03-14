const express = require("express");
const router = express.Router();

const {API} = require("../constants/endPoints");
const {api1, api2} = require("../controller/ApiController.js")
router.get(API.API1, api1);
router.get(API.API2, api2);
module.exports = router;