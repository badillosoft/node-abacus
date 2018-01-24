const sql = require("mssql");
const config = require("./db.config.json");

function connect() {
    return new Promise((resolve, reject) => {
        sql.connect(config, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

function login(username, password) {
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        ps.input("username", sql.NVarChar);
        ps.input("password", sql.NVarChar);

        const query = `SELECT * FROM users 
            WHERE username=@username AND password=@password`;

        ps.prepare(query, err => {
            if (err) {
                reject(err);
                return;
            }

            const data = { username, password };

            ps.execute(data, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                ps.unprepare(() => {
                    if (result.recordset.length === 0) {
                        reject("invalid user");
                        return;
                    }
                    resolve(result.recordset[0]);
                });
            });
        });
    });
}

function get_posts() {
    return new Promise((resolve, reject) => {
        const ps = new sql.PreparedStatement();

        const query = `SELECT * FROM posts`;

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

                ps.unprepare(() => {
                    resolve(result.recordset);
                });
            });
        });
    });
}

module.exports = {
    connect,
    login,
    get_posts
};