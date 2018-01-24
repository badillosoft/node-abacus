const sql = require("mssql");

const options = {
    server: "197.151.3.3",
    database: "nodeJS",
    user: "nodejsuser",
    password: "N@de!JS2",
};

sql.connect(options, err => {
    if (err) {
        console.log(`${err}`);
        return;
    }

    const ps = new sql.PreparedStatement();

    ps.input("nombre", sql.NVarChar);
    ps.input("edad", sql.Int);
    ps.input("sexo", sql.NVarChar);
    ps.input("salario", sql.Decimal);

    const query = `INSERT INTO persona (nombre, edad, sexo, salario)
        VALUES (@nombre, @edad, @sexo, @salario)`;

    ps.prepare(query, err => {
        if (err) {
            console.log(`${err}`);
            sql.close();
            return;
        }

        const data = {
            nombre: "Beto",
            edad: 32,
            sexo: "Hombre",
            salario: 18000
        };

        ps.execute(data, err => {
            if (err) {
                console.log(`${err}`);
                sql.close();
                return;
            }

            ps.unprepare(err => {
                if (err) {
                    console.log(`${err}`);
                    sql.close();
                    return;
                }

                sql.close();
            });
        });
    });
});