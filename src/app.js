const express = require("express");
const app = express();
const { port } = require('./config/config');
const router = require("./router/indexRouter");

app.use("/api", router);
app.listen(port, () => {
    console.log(`Api running in port ${port}`);
});


