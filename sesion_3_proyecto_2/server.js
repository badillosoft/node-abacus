const http = require("http");
const express = require("express");
const nunjucks = require("nunjucks");
const db = require("./db");

const app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    db.get_persons().then(result => {
        res.render("index.html", {
            personas: result
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get("/persona/nueva", (req, res) => {
    res.render("form_new_person.html");
});

app.get("/api/persons/new", (req, res) => {
    const nombre = req.query.nombre;
    const edad = Number(req.query.edad);
    const sexo = req.query.sexo;
    const salario = Number(req.query.salario);
    const redirect = req.query.redirect;

    db.insert_person(nombre, edad, sexo, salario).then(result => {
        if (redirect) {
            res.redirect(redirect);
            return;
        }

        res.send(result);
        // res.redirect("/persona/nueva");
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

db.connect().then(() => {
    http.createServer(app).listen(3000, () => {
        console.log("Server started at http://localhost:3000/");
    });
}).catch(err => {
    console.log(err);
});