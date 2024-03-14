const express = require("express");
const app = express();
const {port} = require('./config/idex');
const router = require("./router/indexRouter");
const job = require("./job/job")

app.use("/api", router);
app.listen(port, () => {
    console.log(`Api running in port ${port}`);
});

