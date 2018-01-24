const http = require("http");
const express = require("express");
const nunjucks = require("nunjucks");
const abacus = require("./abacus");

const app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app
});

app.get("/login", abacus.login);
app.get("/home", abacus.home);
// app.get("/api/posts", abacus.posts);

abacus.connect().then(() => {
    http.createServer(app).listen(3000, () => {
        console.log("Server started at http://localhost:3000/");
    });
});