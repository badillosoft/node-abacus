const fs = require("fs");

const content = fs.readFileSync("archivo.txt", "utf-8");

console.log(content);