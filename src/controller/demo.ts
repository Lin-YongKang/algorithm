import action = require("$action/index");

let api = {
    async params(req, res) {
        let { query, body } = req;
        let result = await action.demo.assign(query, body);
        res.send(result);
    }
};

let view = async (req, res) => {
    res.render("demo", { title: "demo view" });
};

let error = (req, res) => {
    throw new Error("error");
};

export = { api, view, error };
