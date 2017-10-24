const { timeOut } = require("$action");

exports.bird = async (req, res) => {
    res.render("index", { title: "测试11111" });
};

exports.about = async (req, res) => {
    console.log(req.query, req.body);
    res.send("About birds");
};

exports.error = async (req, res) => {
    throw new Error("error");
};
