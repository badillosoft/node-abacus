const personas = [
    {
        nombre: "Ana",
        edad: 21,
        sexo: "Mujer",
        salario: 12000
    },
    {
        nombre: "Beto",
        edad: 13,
        sexo: "Hombre",
        salario: 15000
    },
    {
        nombre: "Carla",
        edad: 34,
        sexo: "Mujer",
        salario: 13000
    }
];

const salarios = personas.map(function(p) {
    console.log(p);
    return p.salario;
});

console.log(salarios);