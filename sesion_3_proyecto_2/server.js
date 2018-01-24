const http = require("http");
const express = require("express");
const db = require("./db");

const app = express();

db.connect();

app.get("/api/persons/new", (req, res) => {
    const nombre = req.query.nombre;
    const edad = Number(req.query.edad);
    const sexo = req.query.sexo;
    const salario = Number(req.query.salario);

    db.insert_person(nombre, edad, sexo, salario).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(400).send(err);
    });
});

app.get("/api/persons/", (req, res) => {
    db.get_persons().then(result => {
        res.send(result);
    }).catch(err => {
        res.status(500).send(err);
    })
});

http.createServer(app).listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});