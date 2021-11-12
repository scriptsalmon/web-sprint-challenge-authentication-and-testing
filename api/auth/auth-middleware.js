module.exports = {
    validRegistration
}


function validRegistration (req, res, next) {
    const { username, password } = req.body;

    if(!username || !password) {
        next({ status: 400, message: "username and password pls" })
    } else if (username.length < 3) {
        next({ status: 400, message: "username must be longer than 3 chars" })
    } else if (password.length < 6) {
        next({ status: 400, message: "password must be longer than 3 chars" })
    } else {
        next()
    }
}