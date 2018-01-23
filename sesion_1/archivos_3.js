const fs = require("fs");

function readlines(filename) {
    const content = fs.readFileSync(filename, "utf-8");
    const lines = content.split("\n");
    return lines;
}

console.log(readlines("archivo.txt"));
console.log(readlines("archivo.1.txt"));