const fs = require("fs");

module.exports = function (filename) {
    const content = fs.readFileSync(filename, "utf-8");
    const lines = content.split("\n");
    return lines;
};