const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../../config');

module.exports = function buildToken (user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, TOKEN_SECRET, options)
}