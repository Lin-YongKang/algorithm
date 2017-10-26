import action = require("$action/index");
import types = require("$controller/types");

const api: types.API = {
    async params(req, res) {
        let { query, body } = req;
        let result = await action.demo.assign(query, body);
        res.send(result);
    }
};

const view: types.RequestHandler = async (req, res) => {
    res.render("demo", { title: "demo view" });
};

const error: types.RequestHandler = (req, res) => {
    throw new Error("error");
};

export = { api, view, error };
