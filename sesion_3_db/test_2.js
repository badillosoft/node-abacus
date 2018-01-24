const sql = require("mssql");

const options = {
    server: "197.151.3.3",
    database: "nodeJS",
    user: "nodejsuser",
    password: "N@de!JS2",
};

sql.connect(options, err => {
    if (err) {
        console.log("No se puede conectar a la base de datos", err);
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
            console.log("No se puede preparar la instrucción", err);
            sql.close();
            return;
        }

        const data = {
            nombre: "Ana",
            edad: 23,
            sexo: "Mujer",
            salario: 12500.5
        };

        ps.execute(data, (err, result) => {
            if (err) {
                console.log("No se puede ejecturar la instrucción", err);
                sql.close();
                return;
            }

            console.log(result);
            ps.unprepare(err => {
                sql.close(); 
            });
        });
    });
});