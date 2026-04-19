const app = require('./src/app')
const { connectMongoDB } = require('./src/config/db')

async function startServer() {
    await connectMongoDB()

    app.listen(5001, '0.0.0.0', () => {
        console.log('Blog Service is running on port 5001')
    })
}

startServer()
