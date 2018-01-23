const fs = require("fs");

const content = fs.readFileSync("archivo.txt", "utf-8");

const lines = content.split("\n"); // windows: \r\n

console.log(lines);