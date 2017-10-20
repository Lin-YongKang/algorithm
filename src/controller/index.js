const { timeOut } = require('$action');

exports.bird = async (req, res) => {
    let text = await timeOut(3);
    res.send(text);
}

exports.about = async (req, res) => {
    console.log(req.query, req.body);
    res.send('About birds');
}

exports.error = async (req, res) => {
    throw new Error("error");
}