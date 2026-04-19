const mongoose = require('mongoose') // importing orm to interact with db in this case which is mongodb 
const redis = require('redis')
let redisClient  // this is used to communicate with redis server as it is not native to node js 

async function connectMongoDB() {
    try {
        const mongoURI = process.env.MONGO_URI
        await mongoose.connect(mongoURI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1) // it will kill the app if db connection fail 
    }
}
async function connectRedis() {
    try {
        const redisHost = process.env.REDIS_HOST
        const redisPort = process.env.REDIS_PORT
        redisClient = redis.createClient({
            socket: {
                host: redisHost,
                port: redisPort
            }
        })
        redisClient.on('error', (err) => console.error('Redis Client Error', err))
        await redisClient.connect()
        console.log('Connected to Redis')
    } catch (error) {
        console.error('Error connecting to Redis:', error)
        process.exit(1) // it will kill the app if db connection fail 
    }
}
function getRedisClient() { // this is for the case when the redis client is not initialized and we are trying to use it (in auth controller)
    if (!redisClient) {
        throw new Error('Redis client is not initialized. Call connectRedis first.')
    }
    return redisClient
}
module.exports = {
    connectMongoDB,
    connectRedis,
    getRedisClient
}