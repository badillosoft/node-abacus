const recipes = require("./recetas.json");

function get_recipes() {
    return recipes;
}

module.exports = {
    get_recipes
};