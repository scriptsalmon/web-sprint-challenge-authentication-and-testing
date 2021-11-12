module.exports = {
    PORT: process.env.PORT || 3300,
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 6,
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'shush'
}