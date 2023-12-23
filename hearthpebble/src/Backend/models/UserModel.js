const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    character: {
        type: String,
        required: true
    },
    deck: [{
        type: String,
        default: "Card 1"
    }],
    logBattles: [{
        type: String,
        default: "Battle 1"
    }]
})

module.exports = mongoose.model('UserModel', userSchema)