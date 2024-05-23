const jwt = require('jsonwebtoken')
const Admin = require('../Models/adminModel')
const ErrorResponse = require('../utils/errorResponse')

const protect = async(req,res,next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        // Bearer biuesahuigweq133r
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return next(new ErrorResponse("Not authorized to access this route",401))
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Admin.findById(decoded.id)

        if(!user){
            return next(new ErrorResponse("No user found with this Id", 404))
        }

        req.user = user
        next()
    }
    catch(error){
        return next(new ErrorResponse("Not authorized to access this route,", 401))
    }
}

module.exports = {protect}