const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateAccessToken(user) {
    if (!user || !user.name) throw new Error('Invalid user object')
    return jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}
function generateRefreshToken(user) {
    if (!user || !user.name) throw new Error('Invalid user object')
    return jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET)
}
async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}
async function comparePasswords(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword)
}
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    hashPassword,
    comparePasswords
}