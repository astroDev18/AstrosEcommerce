import mongoose from 'mongoose'
//
// const validator = require('validator')
// const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String, required: true, unique: true, trim: true, lowercase: true,
    validate (value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is valid')
      }
    }
  },
  password: {
    type: String, required: true, trim: true, minLength: 6,
    validate (value) {
      if (value.isStrongPassword(value)) {
        throw new Error('Password is not strong enough')
      }
    }
  },
  isAdmin: { type: Boolean, default: false, required: true },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]
}, {
  timestamp: true
})

const User = mongoose.model('User', userSchema)
export default User

