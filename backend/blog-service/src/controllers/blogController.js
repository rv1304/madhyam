const BlogService = require('../services/blogService')

async function createPost(req, res) {
    try {
        const { title, content_body, tags } = req.body
        if (!title || !content_body) {
            return res.status(400).json({ message: 'Title and content are required' })
        }
        const author = req.user.name
        const savedPost = await BlogService.createPost(author, { title, content_body, tags })
        return res.status(201).json(savedPost)
    } catch (err) {
        console.error('Error creating post:', err)
        return res.status(500).json({ message: 'Failed to create post' })
    }
}

async function getAllPosts(req, res) {
    try {
        const posts = await BlogService.getAllPublishedPosts()
        return res.status(200).json(posts)
    } catch (err) {
        console.error('Error fetching posts:', err)
        return res.status(500).json({ message: 'Failed to fetch posts' })
    }
}

async function getPostBySlug(req, res) {
    try {
        const post = await BlogService.getPostBySlug(req.params.slug)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        return res.status(200).json(post)
    } catch (err) {
        console.error('Error fetching post:', err)
        return res.status(500).json({ message: 'Failed to fetch post' })
    }
}

async function updatePost(req, res) {
    try {
        const { title, content_body, tags, status } = req.body
        const allowedUpdates = {}
        if (title) allowedUpdates.title = title
        if (content_body) allowedUpdates.content_body = content_body
        if (tags) allowedUpdates.tags = tags
        if (status) allowedUpdates.status = status

        const result = await BlogService.updatePost(req.params.slug, req.user.name, allowedUpdates)
        return res.status(200).json(result)
    } catch (err) {
        console.error('Error updating post:', err)
        if (err.message === 'Post not found') {
            return res.status(404).json({ message: 'Post not found' })
        }
        if (err.message === 'Unauthorized') {
            return res.status(403).json({ message: 'You can only edit your own posts' })
        }
        return res.status(500).json({ message: 'Failed to update post' })
    }
}

async function deletePost(req, res) {
    try {
        await BlogService.deletePost(req.params.slug, req.user.name)
        return res.status(200).json({ message: 'Post deleted successfully' })
    } catch (err) {
        console.error('Error deleting post:', err)
        if (err.message === 'Post not found') {
            return res.status(404).json({ message: 'Post not found' })
        }
        if (err.message === 'Unauthorized') {
            return res.status(403).json({ message: 'You can only delete your own posts' })
        }
        return res.status(500).json({ message: 'Failed to delete post' })
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostBySlug,
    updatePost,
    deletePost
}