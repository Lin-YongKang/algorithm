const { demo } = require("$action");

exports.api = {
    async params(req, res) {
        let { query, body } = req;
        let result = await demo.assign(query, body);
        res.send(result);
    }
};

exports.view = async (req, res) => {
    res.render("demo", { title: "demo view" });
};

exports.error = async (req, res) => {
    throw new Error("error");
};
