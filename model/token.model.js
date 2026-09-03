const mongoose = require('mongoose')


const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    versionKey: false
})

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token