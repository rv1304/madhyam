const express = require('express')
const { registerUser, loginUser, refreshAccessToken, logoutUser, userProfile, updateProfile } = require('../controllers/authController')
const authenticateToken = require('../middlewares/authMiddleware')

const router = express.Router()

// Public routes 
router.post('/users', registerUser)
router.post('/login', loginUser)
router.post('/token', refreshAccessToken)
router.post('/logout', logoutUser)

// Protected routes 
router.get('/profile', authenticateToken, userProfile)
router.put('/profile', authenticateToken, updateProfile)


router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "Protected data", user: req.user })
})

module.exports = router