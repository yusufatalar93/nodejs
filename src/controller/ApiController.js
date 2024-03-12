const save = (req, res) => {
    res.status(200).send({
        message: "save message"
    });
}

const get = (req, res) => {
    res.status(200).send({
        message: "get message"
    });
}
module.exports = {get, save}