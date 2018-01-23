const http = require("http");
const express = require("express");

const adm_usr = require("./admon_users");

const app = express();

app.get("/users/new", (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    const password = req.query.password;
    const confirm = req.query.confirm;

    res.send(adm_usr.create_new_user(username, email, password, confirm));
});

app.get("/users/login", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    res.send(adm_usr.login_user(username, password));
});

http.createServer(app).listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});