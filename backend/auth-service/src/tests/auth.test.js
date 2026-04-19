const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const { connectMongoDB, connectRedis, getRedisClient } = require('../config/db')
const User = require('../models/User')

describe('Authentication API Integration Tests', () => {
    let accessToken
    let refreshToken
    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!'
    }

    beforeAll(async () => {
        await connectMongoDB()
        await connectRedis()
        await User.deleteMany({
            $or: [
                { email: testUser.email },
                { email: 'another@example.com' }
            ]
        })
    }, 15000)

    afterAll(async () => {
        await User.deleteMany({
            $or: [
                { email: testUser.email },
                { email: 'another@example.com' }
            ]
        })

        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close()
        }

        try {
            const redis = getRedisClient()
            if (redis && redis.isOpen) {
                await redis.quit()
            }
        } catch (err) {
            console.log('Redis cleanup skipped')
        }
    }, 15000)

    describe('POST /users - User Registration', () => {
        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/users')
                .send(testUser)

            expect(res.statusCode).toBe(201)
            expect(res.body.message).toBe('User registered successfully')
        })

        it('should reject duplicate user registration', async () => {
            const res = await request(app)
                .post('/users')
                .send(testUser)

            expect(res.statusCode).toBe(400)
            expect(res.body.message).toBe('User already exists')
        })

        it('should reject registration with missing fields', async () => {
            const res = await request(app)
                .post('/users')
                .send({ username: 'incomplete' })

            expect(res.statusCode).toBe(400)
            expect(res.body.message).toBe('All field are required')
        })
    })

    describe('POST /login - User Login', () => {
        it('should login with valid credentials and return tokens', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    username: testUser.username,
                    password: testUser.password
                })

            expect(res.statusCode).toBe(200)
            expect(res.body.message).toBe('Login successful')
            expect(res.body.accessToken).toBeDefined()
            expect(res.body.refreshToken).toBeDefined()

            accessToken = res.body.accessToken
            refreshToken = res.body.refreshToken
        })

        it('should reject login with invalid username', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    username: 'wronguser',
                    password: testUser.password
                })

            expect(res.statusCode).toBe(400)
            expect(res.body.message).toBe('Invalid username')
        })

        it('should reject login with invalid password', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    username: testUser.username,
                    password: 'wrongpassword'
                })

            expect(res.statusCode).toBe(401)
            expect(res.body.message).toBe('Invalid credentials')
        })
    })

    describe('GET /profile - Get User Profile', () => {
        it('should get profile with valid token in Authorization header', async () => {
            const res = await request(app)
                .get('/profile')
                .set('Authorization', `Bearer ${accessToken}`)

            expect(res.statusCode).toBe(200)
            expect(res.body.username).toBe(testUser.username)
            expect(res.body.email).toBe(testUser.email)
            expect(res.body).not.toHaveProperty('password')
        })

        it('should reject request without token', async () => {
            const res = await request(app)
                .get('/profile')

            expect(res.statusCode).toBe(401)
        })

        it('should reject request with invalid token', async () => {
            const res = await request(app)
                .get('/profile')
                .set('Authorization', 'Bearer invalid_token')

            expect(res.statusCode).toBe(403)
        })
    })

    describe('PUT /profile - Update User Profile', () => {
        it('should update profile fields', async () => {
            const updates = {
                displayName: 'Test User',
                bio: 'Software Developer',
                website: 'https://example.com'
            }

            const res = await request(app)
                .put('/profile')
                .set('Authorization', `Bearer ${accessToken}`)
                .send(updates)

            expect(res.statusCode).toBe(200)
            expect(res.body.message).toBe('Profile updated successfully')
            expect(res.body.user.displayName).toBe(updates.displayName)
            expect(res.body.user.bio).toBe(updates.bio)
        })

        it('should reject update without authentication', async () => {
            const res = await request(app)
                .put('/profile')
                .send({ displayName: 'Hacker' })

            expect(res.statusCode).toBe(401)
        })

        it('should reject email update to existing email', async () => {
            await User.create({
                username: 'anotheruser',
                email: 'another@example.com',
                password: 'hashedpass'
            })

            const res = await request(app)
                .put('/profile')
                .set('Authorization', `Bearer ${accessToken}`)
                .send({ email: 'another@example.com' })

            expect(res.statusCode).toBe(400)
            expect(res.body.message).toBe('Username or Email already exists')
        })
    })

    describe('POST /token - Refresh Access Token', () => {
        it('should refresh access token using refreshToken from body', async () => {
            const res = await request(app)
                .post('/token')
                .send({ token: refreshToken })

            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty('accessToken')

            accessToken = res.body.accessToken
        })

        it('should reject refresh without token', async () => {
            const res = await request(app)
                .post('/token')
                .send({})

            expect(res.statusCode).toBe(401)
        })

        it('should reject refresh with invalid token', async () => {
            const res = await request(app)
                .post('/token')
                .send({ token: 'invalid_refresh_token' })

            expect(res.statusCode).toBe(403)
        })
    })

    describe('POST /logout - User Logout', () => {
        it('should logout successfully using refreshToken from body', async () => {
            const res = await request(app)
                .post('/logout')
                .send({ token: refreshToken })

            expect(res.statusCode).toBe(200)
            expect(res.body.message).toBe('Logged out successfully')
        })

        it('should reject logout without token', async () => {
            const res = await request(app)
                .post('/logout')
                .send({})

            expect(res.statusCode).toBe(400)
        })

        it('should not refresh token after logout', async () => {
            const res = await request(app)
                .post('/token')
                .send({ token: refreshToken })

            expect(res.statusCode).toBe(403)
        })
    })
})