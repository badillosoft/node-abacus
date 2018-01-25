const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/home", (req, res) => {
    res.send({
        method: "GET",
        query: req.query
    });
});

app.post("/home", (req, res) => {
    console.log(req.body);
    res.send({
        method: "POST",
        query: req.query,
        body: req.body
    });
});

http.createServer(app).listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});