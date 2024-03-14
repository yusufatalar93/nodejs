const express = require("express");
const indexRouter = express.Router();
const apiRouter = require("./apiRouter");
const {API} = require("../util/endpoint");

indexRouter.use(API.BASE, apiRouter);
module.exports = indexRouter;