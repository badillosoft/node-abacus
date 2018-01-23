const http = require("http");
const express = require("express");

const app = express();

app.get("/images/:name", (req, res) => {
    const name = req.params.name;

    res.send(`Se ha solicitado la imagen ${name}`);
});

app.get("/users/profile/:username/pictures/:name", (req, res) => {
    const username = req.params.username;

    res.send(`Este es el perfil del usuario ${username}`);
});

http.createServer(app).listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});