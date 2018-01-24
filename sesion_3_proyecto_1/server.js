const http = require("http");
const express = require("express");
const nunjucks = require("nunjucks");
const recipes = require("./recetas");

const app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app
});

app.get("/", (req, res) => {
    res.render("index.html", {
        recipes: recipes.get_recipes()
    });
});

http.createServer(app).listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});