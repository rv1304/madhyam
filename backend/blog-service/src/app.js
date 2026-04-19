const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const blogRoutes = require('./routes/blogRoutes')
require('dotenv').config()

const app = express()

app.use(cors({
    origin: ['http://localhost', 'http://localhost:3000', 'http://192.168.1.28:3000'],
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())
app.use('/', blogRoutes)

module.exports = app
