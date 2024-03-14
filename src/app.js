const express = require("express");
const app = express();
const {port} = require('./config/config');
const router = require("./router/indexRouter");
const job = require("./router/job")

app.use("/api", router);
app.listen(port, () => {
    console.log(`Api running in port ${port}`);
});

