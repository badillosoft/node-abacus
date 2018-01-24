const sql = require("mssql");
const config = require("./db.config.json");

let is_connected = false;

function connect() {
    return new Promise((resolve, reject) => {
        sql.connect(config, err => {
            if (err) {
                reject(err);
                return;
            }
    
            is_connected = true;

            resolve();
        });
    });
}

function insert_person(nombre, edad, sexo, salario) {
    return new Promise((resolve, reject) => {
        if (!is_connected) {
            reject("No hay conexión");
            return;
        }

        const ps = new sql.PreparedStatement();

        ps.input("nombre", sql.NVarChar);
        ps.input("edad", sql.Int);
        ps.input("sexo", sql.NVarChar);
        ps.input("salario", sql.Decimal);

        const query = `INSERT INTO persona
            (nombre, edad, sexo, salario)
            VALUES (@nombre, @edad, @sexo, @salario)
        `;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            const data = {
                nombre,
                edad,
                sexo,
                salario
            };

            ps.execute(data, err => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(err => {
                    resolve("ok");
                });
            });
        });
    });
}

function get_persons() {
    return new Promise((resolve, reject) => {
        if (!is_connected) {
            reject("No hay conexión");
            return;
        }

        const ps = new sql.PreparedStatement();

        const query = `SELECT * FROM persona`;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            ps.execute({}, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(err => {
                    resolve(result.recordset);
                });
            });
        });
    });
}

module.exports = {
    connect,
    insert_person,
    get_persons
};