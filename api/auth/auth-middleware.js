const User = require('../users/users-model.js');

module.exports = {
    validRegistration,
    isUsernameTaken
}


function validRegistration (req, res, next) {
    const { username, password } = req.body;

    if(!username || !password) {
        next({ status: 400, message: "username and password required" })
    } else if (username.length < 3) {
        next({ status: 400, message: "username must be longer than 3 chars" })
    } else if (password.length < 6) {
        next({ status: 400, message: "password must be longer than 3 chars" })
    } else {
        next()
    }
}

async function isUsernameTaken (req, res, next) {
    const usernameCheck = await User.findBy(req.body.username)
    if(usernameCheck) {
        next({ status: 401, message: "username taken"})
    } else {
        next()
    }
}