const mongoose = require('mongoose')
async function connectMongoDB() {
    try {
        const mongoURI = process.env.MONGO_URI
        await mongoose.connect(mongoURI)
        console.log('Connected to MongoDB (Blog Service)')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    }
}
module.exports = { connectMongoDB }
