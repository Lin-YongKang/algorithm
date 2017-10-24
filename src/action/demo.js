const model = require("$model");

exports.assign = (query, body) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Object.assign({}, query, body));
        }, 1000);
    });
};
