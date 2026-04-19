const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/posts', authMiddleware, blogController.createPost)
router.get('/posts', blogController.getAllPosts)
router.get('/posts/:slug', blogController.getPostBySlug)
router.put('/posts/:slug', authMiddleware, blogController.updatePost)
router.delete('/posts/:slug', authMiddleware, blogController.deletePost)

module.exports = router
