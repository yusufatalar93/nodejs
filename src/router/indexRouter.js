const express = require("express");
const indexRouter = express.Router();
const apiRouter = require("./apiRouter");
const {API} = require("../constants/endPoints");

indexRouter.use(API.BASE, apiRouter);
module.exports = indexRouter;