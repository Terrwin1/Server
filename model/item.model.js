const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },

    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },

    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },

    date: {
        type: String,
        default: () => new Date().toISOString().split('T')[0]
    }
}, {
    versionKey: false
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item