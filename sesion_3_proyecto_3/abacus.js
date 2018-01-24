const db = require("./db");

const users = {};

function login(req, res) {
    const username = req.query.username || "";
    const password = req.query.password || "";

    if (!username || !password) {
        res.render("login.html");
        return;
    }

    db.login(username, password).then(() => {
        users[username] = true;
        res.redirect(`/home?username=${username}`);
    }).catch(err => {
        res.redirect("/login");
    });
}

function home(req, res) {
    const username = req.query.username;

    if (!users[username]) {
        res.redirect("/login");
        return;
    }

    db.get_posts().then(posts => {
        res.render("home.html", {
            posts
        });
    }).catch(err => {
        res.render("home.html", {
            error: `${err}`
        })
    });
}

module.exports = {
    login,
    home,
    connect: db.connect
};