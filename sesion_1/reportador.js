const fs = require("fs");

const getfile = require("./mi_modulo");

const arreglo = getfile.readLines("empleados.csv");
let matriz = getfile.readCols(arreglo);
//console.log(arreglo);

matriz.splice(0, 1);//eliminar el indice 0, y solo eliminará 1
matriz.splice(matriz.length - 1, 1);//elimina el último indice

//Convertir los números a tipo de dato numerico
matriz = matriz.map(function (fila) {
    //return [fila[0],Number(fila[1]),fila[2],Number(fila[3])];
    fila[1] = Number(fila[1]);
    fila[3] = Number(fila[3]);
    return fila;
});

/*console.log("--------------------Matriz--------------------------");
console.log(matriz);
*/
//reporte total hombres y mujeres, y porcentaje

const hombres = matriz.filter(function (fila) {
    if (fila[2] == "H") {
        return true;
    }
})
const mujeres = matriz.filter(function (fila) {
    if (fila[2] == "M") {
        return true;
    }
})
/*console.log("--------------------Hombres--------------------------");
console.log(hombres);
console.log("--------------------Mujeres--------------------------");
console.log(mujeres);
*/
const T = matriz.length;
const TH = hombres.length;
const TM = mujeres.length;

const PH = 100 * TH / T;
const PM = 100 * TM / T;
/*
console.log("--------------------Reporte 1--------------------------");
console.log(`Total: ${T}`);
console.log(`Hombres: ${TH} ${PH.toFixed(1)}%`);//Interpolación de cadenas
console.log(`Mujeres: ${TM} ${PM.toFixed(1)}%`);//Inyección de cadenas
*/
//Ordenar listas con sort
console.log("--------------------Reporte 2--------------------------");

matriz = matriz.sort(function (filaA, filaB) {
    return filaB[3] - filaA[3];
})

const top3 = matriz.slice(0, 3);

console.log("Top 3 Mejor Salario:");
for (let line of top3) {
    console.log(`${line[0]}: $ ${line[3]}`);
}

