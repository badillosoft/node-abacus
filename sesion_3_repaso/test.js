// 1. Importar mssql
// 2. Realizar la conexión
// 3. Crear un sql.PreparedStatement
// 4. Definir entradas y el query
// 5. Iniciar la preparación para el query
// 6. Ejecutar el statement
// 7. Cerrar el statement

const sql = require("mssql");

const config = {
    "server": "197.151.3.3",
    "database": "nodeJS",
    "user": "nodejsuser",
    "password": "N@de!JS2"
};

sql.connect(config, err => {
    if (err) {
        console.log(`${err}`);
        sql.close();
        return;
    }

    const ps = new sql.PreparedStatement();

    ps.input("username", sql.NVarChar);
    ps.input("password", sql.NVarChar);

    const query = "SELECT * FROM users WHERE username=@username AND password=@password";

    ps.prepare(query, err => {
        if (err) {
            console.log(`${err}`);
            sql.close();
            return;
        }

        const data = {
            username: "batman",
            password: "robin"
        };

        ps.execute(data, (err, result) => {
            if (err) {
                console.log(`${err}`);
                sql.close();
                return;
            }
            
            console.log(result.recordset);

            ps.unprepare(err => {
                if (err) {
                    console.log(`${err}`);
                    sql.close();
                    return;
                }
            });
        });
    });
});