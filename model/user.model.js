const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    login: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    }

}, {
    versionKey: false
})


const User = mongoose.model('User', userSchema)


module.exports = User