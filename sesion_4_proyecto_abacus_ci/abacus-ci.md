# Control de Inventario

Este sistema se encarga de adminstrar la entra y salida de productos para un almacén. Con empleados autorizados para realizar dichas operaciones y proveedores de dichos artículos.

## Actores

* __Producto__: Un conjunto de datos que describen un objeto almacenable por el almacén.
* __Almacén__: Una colección de productos.
* __Empleado__: Es el operador del almacén (se encarga de realizar las tareas de almacenamiento).
* __Proveedor Entrada__: Es el operador de productos que serán almacenados.
* __Proveedor Salida__: Es el operador de productos que serán entregados por el almacén.

### Producto

El producto tendrá la siguiente estructura de datos:

~~~json
{
    "sku": "KVXH-72",
    "proveedor": "coca-cola",
    "descripcion": "Paquete 24x Coca-Cola 600ml",
    "dimensiones": {
        "tipo": "caja",
        "alto": "20 cm",
        "ancho": "40 cm",
        "profundidad": "60 cm"
    }
}
~~~

### Almacén

Operaciones:

* __Registrar Producto__: Dar de alta los datos de un nuevo producto
* __Modificar Producto__: Sólo aplica a su descripción (ERROR -001)
* __Eliminar Producto__: Sólo aplica si no hay existencias (ERROR -002)
* __Agregar Existencia__: Incrementar la existencia de un producto (sólo SKU)
* __Quitar Existencia__: Sólo aplica si hay existencias (ERROR -003)
* __Busquedas__: (descripción, SKU, proveedor, tipo dimensión)

### Empleado

* __Validar ingreso Producto__: El proveedor solicita almacenar un producto y el empleado valida si el producto puede ingresar
* __Opera Almacén__: (Agregar Existencia, Quitar Existencia, Busquedas)
* __Ingresar Producto__: Marca el ingreso del producto de tal proveedor
* __Validar salida Producto__
* __Entregar Producto__: Marca la entrega de un producto a tal proveedor

### Proveedor Entrada

* __Operar Almacén__: (Registrar Producto, Modificar Producto, Eliminar Producto, Busquedas*)
* __Entregar Producto__: Entrega producto al empleado

### Proveedor Salida

* __Operar Almacén__: (Buscar*)
* __Recibir Producto__: Recibir producto del empleado

## Base de Datos

Tabla **Productos** (*productos*)

- sku
- proveedor
- descripcion
- d_tipo
- d_alto
- d_ancho
- d_profundidad

Tabla **Almacen** (*almacen*)

- sku
- existencias

Tabla **Registro Almacen** (*registro_almacen*)

- id_empleado
- sku
- operacion
- fecha
- balance

Tabla **Empleados** (*empleados*)

- id_empleado
- nombre
- telefono
- picture
- ultima_con

Tabla **Validaciones Empleados** (*validaciones_empleado*)

- id_empleado
- sku
- fecha
- operacion

Tabla **Proveedores** (*proveedores*)

- id_proveedor
- rol
- contacto_nombre
- contacto_telefono
- logo

Tabla **Registro Proveedores** (*registro_proveedores*)

- id_proveedor
- id_empleado
- sku
- operacion
- fecha

# Software

## Operaciones

> abacus-ci.js

~~~js
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
~~~

> db.js

~~~js
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

        const quey = `INSERT INTO productos
            (sku, proveedor, descripcion, d_tipo, d_alto, d_ancho, d_profundidad)
            VALUES (@sku, @proveedor, @descripcion, @d_tipo, @d_alto, @d_ancho, @d_profundidad)
        `;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            ps.execute(producto, (err, result) => {
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

        const quey = `UPDATE productos
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

function existencias_producto(sku) {
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

function eliminar_producto(sku) {
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

function registro_almacen(sku, id_empleado, operacion, balance) {
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

function incrementar_existencias(sku) {
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

function decrementar_existencias(sku) {
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

function validacion_empleado(id_empleado, sku, operacion) {
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

function registro_proveedor(id_proveedor, id_empleado, sku, operacion) {
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
~~~