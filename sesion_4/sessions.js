const http = require("http");
const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({
    secret: "CAT-DOG",
    cookie: {}
}));

app.get("/", (req, res) => {
    if (!req.session.contador) {
        req.session.contador = 0;
    }

    req.session.contador++;

    res.send(req.session);
});

http.createServer(app).listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});