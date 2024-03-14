const express = require("express");
const router = express.Router();
const {API} = require("../util/endpoint");
const {api1, api2} = require("../controller/ApiController.js");

router.get(API.API1, api1);
router.get(API.API2, api2);
module.exports = router;