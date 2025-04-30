const mongoose = require('mongoose')
const ROLES = require('../config/roles')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9._-]{5,15}$/.test(value)
            },
            message: props => `${props.value} is not a valid username `
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            },
            message: ({ value }) => {
                return `${value} is not a valid email`
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User