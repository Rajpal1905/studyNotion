
const User = require("../models/user") 
const { mailSender } = require("../utility/emailSender")  
const bcrypt = require("bcrypt")  
const crypto = require("crypto")  

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body 

        // Check if email is provided in the request body
        if (!email) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            })
        }

        // Check if a user with the provided email exists in the database
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found with this Email"
            })
        }

        // Generate a secure random token for the password reset link
        const token = crypto.randomBytes(20).toString('hex')  

        // Update the user record with the generated token and set an expiration time for the token (5 minutes)
        await User.findOneAndUpdate({ email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000  // Token expires in 5 minutes
        }, { new: true })

        // Set up the email title and URL for the password reset link
        const emailTitle = "Password reset link"
        const url = `http://localhost:5173/update-password/${token}`

        // Send the password reset email to the user
        await mailSender(email, emailTitle, `To reset your password, click the link below: ${url}`)

        // Send a success response back to the client
        return res.status(200).json({
            success: true,
            msg: "Email sent successfully, Please check email and change password"
        })

    } catch (error) {
        // Log and send a failure response if an error occurs
        console.error(error)
        res.status(500).json({
            success: false,
            msg: "Some error occurred while sending mail for reset password"
        })
    }
}

// Handler for resetting the password using the provided token
exports.resetPassword = async(req, res) => {
    try {
        const { password, confirmPassword, token } = req.body  // Extract data from request body

        // Check if both password and confirmPassword are provided
        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            })
        }

        // Check if the provided passwords match
        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                msg: "Password not matching"
            })
        }

        // Find the user with the provided token in the database
        const userDetails = await User.findOne({ token: token })

        // If the token is not found, it means the token is invalid
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                msg: "Token is invalid"
            })
        }

        // Check if the token has expired
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                msg: "Token is expired, Please regenerate your token"
            })
        }

        // Hash the new password before saving it to the database
        const hashedPass = await bcrypt.hash(password, 10)

        // Update the user's password in the database with the new hashed password
        await User.findOneAndUpdate(
            { token: token },  // Match the user by the reset token
            { password: hashedPass },  // Set the new hashed password
            { new: true },  // Return the updated user document
        )

        // Send a success response back to the client
        return res.status(200).json({
            success: true,
            msg: "Password Reset Successfully"
        })
    } catch (error) {
        // Log and send a failure response if an error occurs
        console.error(error)
        res.status(500).json({
            success: false,
            msg: "Some error occurred while resetting password"
        })
    }
}
