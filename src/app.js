const express = require("express");
const app = express();
const {port, logger} = require('./config/idex');
const router = require("./router/indexRouter");
const job = require("./job/job")

app.use("/api", router);
app.listen(port, () => {
    logger.info(`Api running in port ${port}`);
});

