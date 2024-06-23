const bcrypt = require('bcryptjs')
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
    gideon_deck: [{
        type: String,
        default: "Card 1"
    }],
    frostbloom_deck: [{
        type: String,
        default: "Card 1"
    }],
    logBattles: [{
        type: String,
        default: "Battle 1"
    }]
})

userSchema.pre('save', async function (next) {
    // if password is unmodified, move on
    if (!this.isModified('password')) {
        next();
    }

    // otherwise, generate salt from bcrypt to secure password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
userSchema.methods.matchPassword = async function (pwd) {
    return await bcrypt.compare(pwd, this.password);
} 

module.exports = mongoose.model('UserModel', userSchema)