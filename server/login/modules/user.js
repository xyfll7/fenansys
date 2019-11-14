const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
    set(password) {
      return bcrypt.hashSync(password, 10)
    }
  },

  avatar: {
    type: String
  },
  roles: {
    type: Array,
    default: ['user']
  },
  date: {
    type: String,
    default: Date.now
  }
})
module.exports = mongoose.model('users', UserSchema)
