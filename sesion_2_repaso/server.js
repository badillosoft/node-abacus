const http = require("http");
const express = require("express");

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    res.send({
        message: "Hola mundo"
    });
});

http.createServer(app).listen(3000, "197.151.3.63", () => {
    console.log("Servidor iniciado en http://197.151.3.63:3000/");
});