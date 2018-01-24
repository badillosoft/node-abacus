const request = require("request");
const fs = require("fs");

// Descargar una imagen
const url = "https://cdn.vox-cdn.com/thumbor/1Evq57t9d53K2iHHjc6AkWRSKGA=/0x0:1280x960/1200x800/filters:focal(538x378:742x582)/cdn.vox-cdn.com/uploads/chorus_image/image/57601275/60861120_1280x960.0.0.jpg";
request(url).pipe(fs.createWriteStream('pikachu.png')).on("close", () => {
    console.log("Finalizado");
});