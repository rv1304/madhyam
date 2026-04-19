const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const tokenFromCookie = req.cookies?.accessToken

    const authHeader = req.headers['authorization']
    const tokenFromHeader = authHeader && authHeader.split(' ')[1]

    const token = tokenFromCookie || tokenFromHeader
    
    // CHANGED: Uniform JSON responses
    if (token == null) {
        return res.status(401).json({ message: 'Token is missing' })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' })
        }
        req.user = user
        next()
    })
}

module.exports = authenticateToken