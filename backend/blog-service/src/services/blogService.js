const Post = require('../models/Post')

class BlogService {
  async createPost(author, data) {
    const { title, content_body, tags } = data
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 10000)
    const wordsPerMinute = 200
    const wordCount = content_body.split(/\s+/).length
    const read_time = Math.ceil(wordCount / wordsPerMinute)

    const newPost = new Post({
      author,
      title,
      content_body,
      tags,
      slug,
      read_time,
      status: 'published',
      publishedAt: new Date()
    })

    return await newPost.save()
  }

  async getAllPublishedPosts() {
    return await Post.find({ status: 'published' }).sort({ publishedAt: -1 })
  }

  async getPostBySlug(slug) {
    return await Post.findOne({ slug })
  }

  async updatePost(slug, author, updateData) {
    const post = await Post.findOne({ slug })
    if (!post) throw new Error('Post not found')
    if (post.author !== author) throw new Error('Unauthorized')

    return await Post.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true }
    )
  }

  async deletePost(slug, author) {
    const post = await Post.findOne({ slug })
    if (!post) throw new Error('Post not found')
    if (post.author !== author) throw new Error('Unauthorized')
    await Post.findOneAndDelete({ slug })
  }
}

module.exports = new BlogService()
