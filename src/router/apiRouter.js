const express = require("express");
const router = express.Router();

const {API} = require("../constants/endPoints");
const {get, save} = require("../controller/ApiController.js")
router.get(API.GET, get);
router.post(API.SAVE, save);
module.exports = router;