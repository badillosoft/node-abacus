const http = require("http");
const express = require("express");
const session = require("express-session");
const router = require("./router");

const app = express();

app.use(session({
    secret: "CAT-DOG",
    cookie: {}
}));

app.get("/empleado/producto/ingresar", router.empleado_ingresar_producto);
app.get("/empleado/producto/entregar", router.empleado_entregar_producto);

app.get("/proveedor/producto/registrar", router.proveedor_registrar_producto);
app.get("/proveedor/producto/modificar", router.proveedor_modificar_producto);
app.get("/proveedor/producto/eliminar", router.proveedor_eliminar_producto);

app.get("/proveedor/producto/entregar", router.proveedor_entregar_producto);
app.get("/proveedor/producto/recibir", router.proveedor_recibir_producto);

router.connect().then(() => {
    http.createServer(app).listen(3000, () => {
        console.log("Server started at http://localhost:3000/");
    });
}).catch(err => {
    console.log(`${err}`);
});