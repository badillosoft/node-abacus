const sql = require("mssql");

function connect() {
    return new Promise((resolve, reject) => {
        const config = require("./db.config.json");
        sql.connect(config, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve("ok");
        })
    });
}

function insertar_producto(producto) {
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        ps.input("sku", sql.NVarChar);
        ps.input("proveedor", sql.NVarChar);
        ps.input("descripcion", sql.NVarChar);
        ps.input("d_tipo", sql.NVarChar);
        ps.input("d_alto", sql.NVarChar);
        ps.input("d_ancho", sql.NVarChar);
        ps.input("d_profundidad", sql.NVarChar);

        const query = `INSERT INTO productos
            (sku, proveedor, descripcion, d_tipo, d_alto, d_ancho, d_profundidad)
            VALUES (@sku, @proveedor, @descripcion, @d_tipo, @d_alto, @d_ancho, @d_profundidad)
        `;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            const data = {
                sku: producto.sku,
                proveedor: producto.proveedor,
                descripcion: producto.descripcion,
                d_tipo: producto.dimensiones.tipo,
                d_alto: producto.dimensiones.alto,
                d_ancho: producto.dimensiones.ancho,
                d_profundidad: producto.dimensiones.profundidad,
            }

            ps.execute(data, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(() => {
                    resolve(result);
                });
            });
        });
    });
}

function modificar_producto(sku, descripcion) {
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        ps.input("sku", sql.NVarChar);
        ps.input("descripcion", sql.NVarChar);

        const query = `UPDATE productos
            SET descripcion=@descripcion
            WHERE sku=@sku
        `;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            ps.execute({sku, descripcion}, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(() => {
                    resolve(result);
                });
            });
        });
    });
}

function existencias_producto(sku) {r
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        ps.input("sku", sql.NVarChar);

        const quey = `SELECT * FROM almacen WHERE sku=@sku`;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            ps.execute({sku}, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(() => {
                    if (result.recordset.length === 0) {
                        reject("SKU no existe");
                        return;
                    }
                    resolve(result.recordset[0].EXISTENCIAS);
                });
            });
        });
    });
}

function eliminar_producto(sku) {r
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        ps.input("sku", sql.NVarChar);

        const quey = `DELETE FROM productos
            WHERE sku=@sku
        `;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            ps.execute({sku}, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(() => {
                    resolve(result);
                });
            });
        });
    });
}

function registro_almacen(sku, id_empleado, operacion, balance) {r
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        ps.input("id_empleado", sql.NVarChar);
        ps.input("sku", sql.NVarChar);
        ps.input("operacion", sql.NVarChar);
        ps.input("balance", sql.Int);

        const quey = `INSERT INTO registro_almacen
            (id_empleado, sku, operacion, fecha, balance)
            VALUES (@id_empleado, @sku, @operacion, GETDATE(), @balance)
        `;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            ps.execute({ sku, id_empleado, operacion, balance }, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(() => {
                    resolve(result);
                });
            });
        });
    });
}

function incrementar_existencias(sku) {r
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        ps.input("sku", sql.NVarChar);
        
        const quey = `UPDATE almacen
            SET existencias=existencias+1
            WHERE sku=@sku
        `;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            ps.execute({ sku }, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(() => {
                    resolve(result);
                });
            });
        });
    });
}

function decrementar_existencias(sku) {r
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        ps.input("sku", sql.NVarChar);
        
        const quey = `UPDATE almacen
            SET existencias=existencias-1
            WHERE sku=@sku
        `;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            ps.execute({ sku }, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(() => {
                    resolve(result);
                });
            });
        });
    });
}

function validacion_empleado(id_empleado, sku, operacion) {r
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        ps.input("id_empleado", sql.NVarChar);
        ps.input("sku", sql.NVarChar);
        ps.input("operacion", sql.NVarChar);
        
        const quey = `INSERT INTO validaciones_empleado
            (id_empleado, sku, fecha, operacion)
            VALUES (@id_empleado, @sku, GETDATE(), @operacion)
        `;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            ps.execute({ id_empleado, sku, operacion }, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(() => {
                    resolve(result);
                });
            });
        });
    });
}

function registro_proveedor(id_proveedor, id_empleado, sku, operacion) {r
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        ps.input("id_proveedor", sql.NVarChar);
        ps.input("id_empleado", sql.NVarChar);
        ps.input("sku", sql.NVarChar);
        ps.input("operacion", sql.NVarChar);
        
        const quey = `INSERT INTO registro_proveedores
            (id_proveedor, id_empleado, sku, fecha, operacion)
            VALUES (@id_proveedor, @id_empleado, @sku, GETDATE(), @operacion)
        `;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            ps.execute({ id_proveedor, id_empleado, sku, operacion }, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(() => {
                    resolve(result);
                });
            });
        });
    });
}

module.exports = {
    connect,
    insertar_producto,
    modificar_producto,
    existencias_producto,
    eliminar_producto,
    registro_almacen,
    incrementar_existencias,
    decrementar_existencias,
    validacion_empleado,
    registro_proveedor
};