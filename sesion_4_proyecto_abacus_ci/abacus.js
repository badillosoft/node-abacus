const db = require("./db");

function producto_valido(producto) {
    return new Promise((resolve, reject) => {
        if (!producto || !producto.sku || !producto.proveedor || !producto.descripcion) {
            reject("Producto inválido");
            return;
        }

        if (!producto.dimensiones || !producto.dimensiones.tipo) {
            reject("Producto inválido");
            return;
        }

        resolve(producto);
    });
}

function registrar_producto(producto) {
    return producto_valido(producto).then(() => {
        return db.insertar_producto(producto);
    });
}

function modificar_producto(sku, descripcion) {
    return db.modificar_producto(sku, descripcion);
}

function eliminar_producto(sku, descripcion) {
    return db.existencias_producto(sku).then(n => {
        if (n > 0) {
            return Promise.reject("ERROR -002");
        }

        return db.eliminar_producto(sku);
    });
}

function agregar_existencia_producto(sku, id_empleado) {
    return db.existencias_producto(sku).then(n => {
        return db.registro_almacen(sku, id_empleado, "in", n).then(() => {
            return db.incrementar_existencias(sku);
        });
    });
}

function quitar_existencia_producto(sku, id_empleado) {
    return db.existencias_producto(sku).then(n => {
        if (n <= 0) {
            return Promise.reject("ERROR -00X No hay existencias");
        }

        return db.registro_almacen(sku, id_empleado, "out", n).then(() => {
            return db.decrementar_existencias(sku);
        });
    });
}

function buscar_por_proveedor(id_proveedor) {
    return db.producto_por_proveedor(id_proveedor).then(productos => {
        const promises = productos.map(prodcuto => {
            return db.existencias_producto(producto.sku).then(n => {
                producto.existencias = n;
                return producto;
            });
        });

        return Promise.all(promises);
    });
}

function buscar_por_sku(sku) {
    return db.producto_por_sku(sku).then(producto => {
        return db.existencias_producto(sku).then(n => {
            producto.existencias = n;
            return producto;
        });
    });
}

function buscar_por_descripcion(descripcion) {
    return db.producto_por_descripcion(descripcion).then(producto => {
        return db.existencias_producto(sku).then(n => {
            producto.existencias = n;
            return producto;
        });
    });
}

function validar_ingreso_producto(id_empleado, sku) {
    return db.validacion_empleado(id_empleado, sku, "in");
}

function validar_salida_producto(id_empleado, sku) {
    return db.validacion_empleado(id_empleado, sku, "out");
}

function ingresar_producto(id_empleado, sku) {
    return validar_ingreso_producto(id_empleado, sku).then(() => {
        return agregar_existencia_producto(sku);
    });
}

function entregar_producto(id_empleado, sku) {
    return validar_salida_producto(id_empleado, sku).then(() => {
        return quitar_existencia_producto(sku);
    });
}

function entregar_producto_proveedor(id_proveedor, id_empleado, sku) {
    return db.registro_proveedor(id_proveedor, id_empleado, sku, "entrego");
}

function recibir_producto_proveedor(id_proveedor, id_empleado, sku) {
    return db.registro_proveedor(id_proveedor, id_empleado, sku, "recibo");
}

module.exports = {
    connect: db.connect,
    producto_valido,
    registrar_producto,
    modificar_producto,
    eliminar_producto,
    agregar_existencia_producto,
    quitar_existencia_producto,
    validar_ingreso_producto,
    validar_salida_producto,
    ingresar_producto,
    entregar_producto,
    entregar_producto_proveedor,
    recibir_producto_proveedor
};