const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const generateToken = require('../util/generateToken')

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

    // const hashPwd = await bcrypt.hash(password,10)
    const hashPwd = password
    const defaultCharacter = "Sir Gideon Stormblade"
    const defaultCurrDeck = ["Divine Strike", "Guardians Shield", "Blade of Judgement", "Radiant Healing", "Storm of Vengeance"]
    const defaultGideonDeck = ["Divine Strike", "Guardians Shield", "Blade of Judgement", "Radiant Healing", "Storm of Vengeance"]
    const defaultFrostbloomDeck = ["Frostbite","Icy Veil", "Glacial Surge","Blade of Judgement", "Winters Embrace"]

    const defaultLog = []

    const userObject =
        {
            username,
            "password": hashPwd,
            "character": defaultCharacter,
            "curr_deck": defaultCurrDeck,
            "gideon_deck": defaultGideonDeck,
            "frostbloom_deck": defaultFrostbloomDeck,
            "logBattles": defaultLog
        }  // token and _id?
    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({message: `New user ${username} created`})
    } else{
        res.status(400).json({message: 'Invalid user data received'})
    }
})

const verifyUser = asyncHandler(async(req,res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            username: user.username,
            curr_deck: user.curr_deck,
            gideon_deck: user.gideon_deck,
            frostbloom_deck: user.frostbloom_deck,
            character: user.character,
            logBattles: user.logBattles
        })
    } else{
        res.status(400);
        throw new Error("invalid username or password")
    }
})

const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length) {
        return res.status(400).json({message: 'No users found.'})
    }
    res.json(users)
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found." });
    }
});

const updateUser = asyncHandler(async(req,res) => {
    const {id, username, character, deck} = req.body
    //confirm data
    if(!id || !username || !Array.isArray(deck) || !deck.length || !character){
        return res.status(400).json({message: 'All fields are required.'})
    }
    const user = await User.findById(req.params.id);
    console.log(user)
    if (!user) {
        return res.status(400).json({message: 'No user found.'})
    }
    user.character = character
    user.deck = deck
    const updatedUser = await user.save()
    res.json(updatedUser)
})

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
    getUser,
    getAllUsers,
    verifyUser,
    deleteUser
}