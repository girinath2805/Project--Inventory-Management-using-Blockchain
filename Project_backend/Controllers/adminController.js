const Admin = require('../Models/adminModel')
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')

const register = async (req, res, next) => {
    const { email, userName, password } = req.body;

    try {
        const user = await Admin.create({
            email,
            userName,
            password,
        })

        sendToken(user, 201, res)
    } catch (error) {
        next(error)
    }
}

const adminLogin = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400))
    }

    try {
        const user = await Admin.findOne({ email }).select("+password")

        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 401))
        }

        const isMatch = await user.matchPasswords(password)

        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 404))
        }

        sendToken(user, 201, res)
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const forgotPassword = async (req, res, next) => {
    const { email } = req.body

    try {
        const user = await Admin.findOne({ email })
        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404))
        }

        const resetToken = user.getResetPasswordToken()
        await user.save()
        const resetUrl = `http://localhost:5173/passwordreset/${resetToken}`

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            })

            res.status(200).json({
                success: true,
                data: "Email sent"
            })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()

            return next(new ErrorResponse("Email could not be sent", 500))
        }
    }

    catch (error) {
        next(error)
    }
}

const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex")
    try {
        const user = await Admin.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400))
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()
        res.status(201).json({
            success:true,
            data:"Password Reset success"
        })
    } catch (error) {
        next(error)
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({ success: true, token })
}

const addAdmin = async(req,res,next) => {
    const { email, username, password } = req.body
    const user = await Admin.findOne({ email })
    if (user) {
        
    }
}

module.exports = { adminLogin, forgotPassword, resetPassword, register }
