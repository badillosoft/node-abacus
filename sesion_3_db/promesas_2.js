const request = require("request");
const fs = require("fs");

// Descargar una imagen
function download(url, filename) {
    return new Promise((resolve, reject) => {
        const evt = request(url).pipe(fs.createWriteStream(filename));
        
        evt.on("error", () => {
            reject();
        });

        evt.on("close", () => {
            resolve();
        });
    });
}

const url_1 = "https://vignette.wikia.nocookie.net/es.pokemon/images/7/77/Pikachu.png/revision/latest/scale-to-width-down/350?cb=20150621181250";
const url_2 = "https://vignette.wikia.nocookie.net/animeme/images/d/d8/Ash_Ketchum_Based_On.png/revision/latest?cb=20160709053243";

download(url_1, "pikachu2.png").then(() => {
    return download(url_2, "ash.png");
});