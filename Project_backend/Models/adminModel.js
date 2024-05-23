const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format',
        },
    },
    userName:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        select:false,
    },
    designation:{
        type:String,
    },
    address:{
        type:String,
    },
    contactNumber:{
        type:String,
    },
    isCreator:{
        type:Boolean,
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
},{ timestamps: true })

adminSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

adminSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
};

adminSchema.methods.getSignedToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,{ expiresIn : process.env.JWT_EXPIRE})
}

adminSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest("hex")

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    return resetToken
}

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin;