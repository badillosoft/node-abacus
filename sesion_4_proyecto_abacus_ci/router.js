const abacus = require("./abacus");

function empleado_ingresar_producto(req, res) {
    const id_empleado = req.query.id_empleado;
    const sku = req.query.sku;

    abacus.ingresar_producto(id_empleado, sku).then(() => {
        res.send({
            success: true,
            date: new Date()
        });
    }).catch(err => {
        res.send({
            error: true,
            info: err
        });
    });
}

function empleado_entregar_producto(req, res) {
    const id_empleado = req.query.id_empleado;
    const sku = req.query.sku;

    abacus.entregar_producto(id_empleado, sku).then(() => {
        res.send({
            success: true,
            date: new Date()
        });
    }).catch(err => {
        res.send({
            error: true,
            info: err
        });
    });
}

function proveedor_registrar_producto(req, res) {
    const sku = req.query.sku;
    const proveedor = req.query.proveedor;
    const descripcion = req.query.descripcion;
    const d_tipo = req.query.d_tipo;
    const d_alto = req.query.d_alto;
    const d_ancho = req.query.d_ancho;
    const d_profundidad = req.query.d_profundidad;

    if (req.session.rol !== "proveedor" && req.session.id_proveedor !== proveedor) {
        res.send({
            error: true,
            info: "Invalid Access"
        });
        return;
    }

    const producto = {
        sku,
        proveedor,
        descripcion,
        dimensiones: {
            tipo: d_tipo,
            alto: d_alto,
            ancho: d_ancho,
            profundidad: d_profundidad,
        }
    };

    abacus.registrar_producto(producto).then(() => {
        res.send({
            success: true,
            date: new Date()
        });
    }).catch(err => {
        res.send({
            error: true,
            info: err
        });
    });
}

function proveedor_modificar_producto(req, res) {
    const sku = req.query.sku;
    const descripcion = req.query.descripcion;

    abacus.modificar_producto(sku, descripcion).then(() => {
        res.send({
            success: true,
            date: new Date()
        });
    }).catch(err => {
        res.send({
            error: true,
            info: err
        });
    });
}

function proveedor_eliminar_producto(req, res) {
    const sku = req.query.sku;

    abacus.eliminar_producto(sku).then(() => {
        res.send({
            success: true,
            date: new Date()
        });
    }).catch(err => {
        res.send({
            error: true,
            info: err
        });
    });
}

function proveedor_entregar_producto(req, res) {
    const id_proveedor = req.query.id_proveedor;
    const id_empleado = req.query.id_empleado;
    const sku = req.query.sku;

    abacus.entregar_producto_proveedor(id_proveedor, id_empleado, sku).then(() => {
        res.send({
            success: true,
            date: new Date()
        });
    }).catch(err => {
        res.send({
            error: true,
            info: err
        });
    });
}

function proveedor_recibir_producto(req, res) {
    const id_proveedor = req.query.id_proveedor;
    const id_empleado = req.query.id_empleado;
    const sku = req.query.sku;

    abacus.recibir_producto_proveedor(id_proveedor, id_empleado, sku).then(() => {
        res.send({
            success: true,
            date: new Date()
        });
    }).catch(err => {
        res.send({
            error: true,
            info: err
        });
    });
}


module.exports = {
    connect: abacus.connect,
    empleado_ingresar_producto,
    empleado_entregar_producto,
    proveedor_registrar_producto,
    proveedor_modificar_producto,
    proveedor_eliminar_producto,
    proveedor_entregar_producto,
    proveedor_recibir_producto
}
