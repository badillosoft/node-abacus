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
        sql.close();
        return;
    }

    const ps = new sql.PreparedStatement();

    const query = `SELECT * FROM persona`;

    ps.prepare(query, err => {
        if (err) {
            console.log(`${err}`);
            sql.close();
            return;
        }

        ps.execute({}, (err, result) => {
            if (err) {
                console.log(`${err}`);
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