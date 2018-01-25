# Desplegar un servidor en Heroku

Necesitamos tener una cuenta de usuarios en https://github.com y otra cuenta en https://heroku.com

1. Crear un repositorio en github

2. Clonar el repositorio mediante Github Desktop / File / Clone Repository (buscar el nombre del repositorio)

3. Abrir la carpeta clonada del repositorio en Visual Code

4. Configurar un servidor (`server.js`)

~~~js
const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hola Abacus :)");
});

const port = process.env.PORT || 3000;

http.createServer(app).listen(port, () => {
    console.log(`Server started at http://XXXX:${port}`);
});
~~~

5. Crear un archivo de configuración de paquete (`package.json`)

~~~json
{
    "name": "abacus",
    "description": "Abacus Test Server in Heroku",
    "version": "1.0.0",
    "author": {
        "name": "Alan Badillo",
        "email": "badillo.soft@hotmail.com",
        "url": "https://github.com/badillosoft"
    }
}
~~~

6. Instalar los paquetes necesarios usando `--save` (`npm i --save express`)

7. Crear un archivo `.gitignore` para descartar archivos innecesarios

~~~git
node_modules/
~~~

8. Subir los archivos a github (hacer el add y commit)

--

9. Crear una aplicación en Heroku (abacus-test -> http://abacus-test.herokuapp.com)

10. Conectar Github al proyecto de heroku en la pestaña `deploy`

11. Habilitar el `deploy` automático