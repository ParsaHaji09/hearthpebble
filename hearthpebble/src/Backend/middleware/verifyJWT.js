const jwt = require('jsonwebtoken')
const User = require("../models/UserModel")
const asyncHandler = require("express-async-handler")

const verifyJWT = asyncHandler( async (req,res,next) => {
    const authHeader = req.headers.authorization
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        console.log('here')
        try{
            token = authHeader.split(' ') [1]
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decodeToken.id).select("-password")
            next()
        }
        catch (error){
            res.status(401);
            throw new Error("Not authorized, token mismatch 1.");
        }
    }
    if(!token) {
        res.status(401);
        throw new Error("Not authorized, token mismatch 2.");
    }
})
module.exports = verifyJWT