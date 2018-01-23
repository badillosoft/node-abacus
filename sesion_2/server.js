const http = require("http");
const express = require("express");

const app = express();

// http://localhost:3000/hola
app.get("/hola", (request, response) => {
    console.log(request.query);
    response.send("Hola mundo");
}); 

app.get("/hola2", (request, response) => {
    const nombre = request.query.nombre;
    response.send(`Hola ${nombre}`);
});

app.get("/HolaN", (req, res) => {
    const n = Number(req.query.n);

    let text = "";

    for(let i = 0; i < n; i++) {
        text += "hola<br>";
    }

    res.send(text);
});

const nombres = ["Ana", "Beto", "Carla", "Daniel"];
const apellidos = ["Avila", "Benitez", "Camacho", "Dueñas"];

app.get("/nombres", (req, res) => {
    const n = Number(req.query.n);

    let text = "";

    for (let i = 0; i < n; i++) {
        let nombre = nombres[Math.floor(Math.random() * nombres.length)];
        let apellido_p = apellidos[Math.floor(Math.random() * apellidos.length)];
        let apellido_m = apellidos[Math.floor(Math.random() * apellidos.length)];

        text += `${nombre} ${apellido_p} ${apellido_m}<br>`;
    }

    res.send(text);
});

app.get("/nombres2", (req, res) => {
    const n = Number(req.query.n);

    let A = [];

    for (let i = 0; i < n; i++) {
        let nombre = nombres[Math.floor(Math.random() * nombres.length)];
        let apellido_p = apellidos[Math.floor(Math.random() * apellidos.length)];
        let apellido_m = apellidos[Math.floor(Math.random() * apellidos.length)];

        A.push(`${nombre} ${apellido_p} ${apellido_m}`);
    }

    res.send(A);
});

app.get("/nombres3", (req, res) => {
    const n = Number(req.query.n);

    let A = [];

    for (let i = 0; i < n; i++) {
        let nombre = nombres[Math.floor(Math.random() * nombres.length)];
        let apellido_p = apellidos[Math.floor(Math.random() * apellidos.length)];
        let apellido_m = apellidos[Math.floor(Math.random() * apellidos.length)];

        A.push({
            nombre,
            apellido_p,
            apellido_m,
            direccion: {
                calle: "Av Siempre Viva",
                num: 123
            }
        });
    }

    res.send(A);
});

http.createServer(app).listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000/");
});