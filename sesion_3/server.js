const http = require("http");
const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    res.render("index.html", {
        message: "Hola mundo",
        items: ["A", "B", "C"]
    });
});

app.get("/hola", (req, res) => {
    res.render("index.html", {
        message: "jeje",
        items: ["X", "Y", "Z", "W"]
    });
});

http.createServer(app).listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});