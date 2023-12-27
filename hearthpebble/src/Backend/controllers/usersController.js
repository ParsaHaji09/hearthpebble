const User = require('../models/UserModel')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc get all users

// @route Get /users

// @access Private

const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length) {
        return res.status(400).json({message: 'No users found.'})
    }
    res.json(users)
})

// @desc create new user

const createNewUser = asyncHandler(async(req,res) => {
    const {username, password} = req.body
    //confirm data
    if(!username || !password){
        return res.status(400).json({message: 'All fields are required.'})
    }
    const duplicate = await User.findOne({username}).lean().exec()
    if (duplicate){
        return res.status(409).json({message: 'Duplicate username'})
    }

    const hashPwd = await bcrypt.hash(password,10)
    const defaultCharacter = "Sir Gideon Stormblade"
    const defaultDeck = ["Gideon's Valor", 'Stormbreaker', 'Knight\'s Rally', 'Gideon\'s Shieldwall', 'Thunderstrike']

    const userObject = {username, "password": hashPwd, "character": defaultCharacter, "deck": defaultDeck}
    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({message: `New user ${username} created`})
    } else{
        res.status(400).json({message: 'Invalid user data received'})
    }
})

// @desc update a user

const updateUser = asyncHandler(async(req,res) => {
    const {id, username, password, character, deck} = req.body
    //confirm data
    if(!id || !username || !password || !Array.isArray(deck) || !deck.length || !character){
        return res.status(400).json({message: 'All fields are required.'})
    }
    const user = await User.findByID(id).exec()
    if (!user) {
        return res.status(400).json({message: 'No user found.'})
    }
    const duplicate = await User.findOne({username}).lean().exec()
    if (duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate username'})
    }
    user.username = username
    user.character = character
    user.deck = deck
    if(password) {
        user.password = await bcrypt.hash(password, 10)
    }
    const updatedUser = await user.save()
    res.json({message: `${updatedUser.username} is updated`})
})

// @desc delete a user

const deleteUser = asyncHandler(async(req,res) => {
    const {id} = req.body
    if(!id){
        return res.status(400).json({message: 'User ID Required.'})
    }
    const user = await User.findByID(id).exec()
    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    const result = await user.deleteOne()
    const reply = `Username ${result.username} with ID ${result._id} deleted`
    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}