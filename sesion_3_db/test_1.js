const sql = require("mssql");

const config = {
    user: "nodejsuser",
    password: "N@de!JS2",
    server: "197.151.3.3",
    database: "nodeJS"
};

sql.connect(config).then(pool => {
    return pool.request();
}).then(conn => {
    console.log("Conexión establecida a la base de datos");
    return conn.query("SELECT * FROM personas;");
}).then(result => {
    console.log(result);
});