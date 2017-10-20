const model = require('$model');

exports.timeOut = async (second) => {
    return await new Promise((resolve) => {
        setTimeout(() => resolve(model), second * 1000)
    });

}