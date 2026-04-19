const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minLength: [3, 'Username must be at least 3 characters'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },

    displayName: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        maxLength: [160, 'Bio cannot exceed 160 characters'],
        default: ""
    },
    profilePic: {
        type: String,
        default: "https://via.placeholder.com/150"
    },
    website: {
        type: String,
        trim: true
    },

    // 3. Account Status (For future features)
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'editor'],
        default: 'user'
    },

    followerCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 }

}, {

    timestamps: true
})

userSchema.index({ username: 1, email: 1 })

module.exports = mongoose.model('User', userSchema)