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

sql.connect(config).then(pool => {
    pool.input("username", sql.NVarChar);
    pool.input("password", sql.NVarChar);

    const query = "SELECT * FROM users WHERE username=@username AND password=@password";

    return pool.query(query);
}).then(result => {
    console.log(result);
});