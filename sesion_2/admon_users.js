const users = {};

function validate_new_user(username, email, password, confirm) {
    if (!username || !email || !password || !confirm) {
        return true;
    }

    if (password !== confirm) {
        return true;
    }

    if (!email.match(/@/)) {
        return false;
    }

    return false;
}

function storage_new_user(username, email, password) {
    if (users[username]) {
        return true;
    }

    users[username] = {
        username,
        email,
        password
    };

    return false;
}

function create_new_user(username, email, password, confirm) {
    if (validate_new_user(username, email, password, confirm)) {
        return "user is not valid";
    }

    if (storage_new_user(username, email, password)) {
        return "user can not be storage";
    }

    return "ok";
}

function get_user(username) {
    return users[username];
}

function validate_login(user, username, password) {
    if (!user) {
        return true;
    }

    return !(user.username === username && user.password === password);
}

function login_user(username, password) {
    const user = get_user(username);

    if (validate_login(user, username, password)) {
        return "invalid access";
    }

    return "ok";
}

module.exports = {
    create_new_user,
    login_user
};