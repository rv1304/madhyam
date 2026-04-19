const app = require('./src/app')
const { connectMongoDB, connectRedis } = require('./src/config/db')

async function startServer() {
    // 1. Connect to DBs first
    await connectMongoDB()
    await connectRedis()

    // 2. Start listening on 0.0.0.0 (important for Docker)
    app.listen(3001, '0.0.0.0', () => {
        console.log('Server is running on port 3001')
    })
}

startServer()