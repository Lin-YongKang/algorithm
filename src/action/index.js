const model = require("$model");
/**
 * Set the shoe's color.
 *
 * @param {SHOE_COLORS} color - The shoe color. Must be an enumerated
 * value of {@link SHOE_COLORS}.
 */
exports.timeOut = async second => {
    return await new Promise(resolve => {
        setTimeout(() => resolve(model), second * 1000);
    });
};
