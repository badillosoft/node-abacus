const rep = require("./modulo_reportador");

const matriz = rep.obtenerMatrizCSV("empleados.csv");

rep.generarReporte(matriz);

rep.generarReporte(matriz.filter(function (fila){
    return fila[1] >= 20 && fila[1] <= 30;
}));
rep.generarReporte(matriz.filter(function (fila){
    return fila[1] >= 31 && fila[1] <= 50;
}));