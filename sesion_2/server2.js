const http = require("http");
const express = require("express");

const app = express();

const users = {};

app.get("/users", (req, res) => {
    res.send(users);
});

app.get("/users/new", (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    const password = req.query.password;
    const confirm = req.query.confirm;

    if (!username || !email || !password || !confirm || password !== confirm) {
        res.send("error");
        return;
    }

    users[username] = {
        username,
        email,
        password
    };

    res.send("ok");
});

app.get("/users/login", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    const user = users[username];

    if (!user) {
        res.send("user is not exists");
        return;
    }

    if (password !== user.password) {
        res.send("invalid password");
        return;
    }

    const token = Math.random().toString(16).slice(2, 10);

    users[username].token = token;

    res.send(token);
});

http.createServer(app).listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000/");
});