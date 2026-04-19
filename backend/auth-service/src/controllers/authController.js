const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { generateAccessToken, generateRefreshToken, hashPassword, comparePasswords } = require('../services/authService')
const { getRedisClient } = require('../config/db')

async function registerUser(req, res) {
    try {
        // const username = req.body.username
        // const email = req.body.email
        // const password = req.body.password
        const { username, email, password } = req.body // this is destructuring assignment 
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All field are required" }) // sending the response code and response in json which is easier to handle in frontend 
        }
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashedPassword = await hashPassword(password)
        const user = new User({ username, email, password: hashedPassword })
        await user.save()
        res.status(201).json({ message: 'User registered successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function loginUser(req, res) {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username }).select('+password')
        if (user == null) {
            return res.status(400).json({ message: 'Invalid username' })
        }
        if (await comparePasswords(password, user.password)) {
            const payload = { name: user.username }
            const accessToken = generateAccessToken(payload)
            const refreshToken = generateRefreshToken(payload)
            const redisClient = getRedisClient()
            await redisClient.set(`refresh:${refreshToken}`, user.username, {
                EX: 7 * 24 * 60 * 60 // 7 days
            })
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
        } else {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

async function refreshAccessToken(req, res) {
    const refreshToken = req.body.token
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' })
    try {
        const redisClient = getRedisClient()
        const storedUser = await redisClient.get(`refresh:${refreshToken}`)
        if (!storedUser) return res.status(403).json({ message: 'Invalid refresh token' })

        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken })
    } catch (err) {
        console.error(err)
        return res.status(403).json({ message: 'Token verification failed' });
    }
}

async function logoutUser(req, res) {
    const refreshToken = req.body.token
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' })
    try {
        const redisClient = getRedisClient()
        await redisClient.del(`refresh:${refreshToken}`) // Remove the token from Redis
        return res.status(200).json({ message: 'Logged out successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

async function userProfile(req, res) {
    try {
        const user = await User.findOne({ username: req.user.name }).select('-password')
        if (!user) return res.status(404).json({ message: 'User not found' })
        res.json(user)
    } catch (err) {
        console.error('Profile Fetch Error:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

async function updateProfile(req, res) {
    try {
        const { displayName, bio, profilePic, website, email, username, password } = req.body
        const user = await User.findOne({ username: req.user.name })
        if (!user) return res.status(404).json({ message: 'User not found' })

        if (username || email) {
            const existingUser = await User.findOne({
                $or: [{ username }, { email }]
            })
            if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                return res.status(400).json({ message: 'Username or Email already exists' })
            }
        }

        if (displayName) user.displayName = displayName
        if (bio !== undefined) user.bio = bio
        if (profilePic) user.profilePic = profilePic
        if (website) user.website = website
        if (email) user.email = email
        if (username) user.username = username
        if (password) user.password = await hashPassword(password)

        await user.save()

        const redisClient = getRedisClient()
        await redisClient.del(`user:profile:${req.user.name}`)

        const updatedUser = user.toObject()
        delete updatedUser.password

        return res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        })

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Username or Email already exists' })
        }
        console.error(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    updateProfile,
    userProfile,
}
