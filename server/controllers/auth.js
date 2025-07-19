const User = require("../models/user")
const OTP = require("../models/otp")
const otpGenerator = require('otp-generator')
const Profile = require("../models/profile")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { mailSender } = require("../utility/emailSender")
require("dotenv").config()
//Send OTP

exports.sendOtp = async (req, res) => {
    try {
        //fetch data 
        const { email } = req.body;
        //check user exist or not
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(401).json({
                success: false,
                msg: "User already Exist with this Email"
            })
        }
        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })
        

        let result = await OTP.findOne({ otp: otp })

        while (result) {
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({ otp: otp })
        }
        const otpPayload = {
            email,
            otp
        }

        const otpBody = await OTP.create(otpPayload)

       

        return res.status(200).json({
            success: true,
            msg: "OTP sent successfully. Please check your email and verify."
        });

    } catch (error) {
        console.error("Error in sending otp:", error.message);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
}

//SignUp
exports.signup = async (req, res) => {
    try {
        // Fetching data from request body
        const {
            firstName, lastName, email,
            password, confirmPassword,
            accountType, contactNumber, otp
        } = req.body;

        // Perform validations
        if (!firstName || !lastName || !email || !password || !otp) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }

        console.log("bhuhbnjnnj", password , "jjjjj",confirmPassword)
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                msg: "Password and confirm password do not match"
            });
        }

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                msg: "User already exists"
            });
        }

        // Retrieve the most recent OTP
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        

        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                msg: "OTP not found"
            });
        }

        // Validate OTP
       

        if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                msg: "OTP does not match"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        let approved = ""
        approved === "Instructor" ? (approved = false) : (approved = true)

        // Create a new user profile
        const profile = await Profile.create({
            gender: null,
            dob: null,
            about: null,
            contactNumber: contactNumber || null // Use the contact number if provided
        });

        // Create the user
        const NewUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(201).json({
            success: true,
            msg: "Registration successful",
            NewUser
        });

    } catch (error) {
        console.error("An error occurred during sign-up:", error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"

        });
    }
};


//signin
exports.login = async (req, res) => {
    try {
        //fetch data
        const { email, password } = req.body

        //validations
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required, Please try again"
            })
        }

        // userExist
        const user = await User.findOne({ email }).populate("additionalDetails")
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            })
        }
        //generate token
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: '2h'
            })
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,

            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                user,
                msg: "User logged in successfully"

            })
        }
        else {
            return res.status(401).json({
                success: false,
                msg: "Incorrect password"
            })
        }

    } catch (error) {
        console.error("An error occurred during sign-in:", error);
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
}


// change Passwword
exports.changePassword = async (req, res) => {
    try {
        // fetch data 
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body
        // Validation for missing fields
        if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(404).json({
                success: false,
                msg: "All fields are required"
            })
        }

        // Find user by email
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        const userPass = await bcrypt.compare(oldPassword, user.password)

        if (!userPass) {
            return res.status(401).json({
                success: false,
                msg: "Incorrect credentials"
            })
        }
        if (newPassword !== confirmNewPassword) {

            return res.status(401).json({
                success: false,
                msg: "New password not matched"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()

        //sending email
        const emailTitle = "Password Change Confirmation"

        const emailBody = `
         <h1>Password Change Confirmation</h1>
        <p>Dear ${user.firstName},</p>
        <p>Your password has been successfully changed. If you did not make this change, please contact support immediately.</p>
    `;

        const mailResponse = await mailSender(user.email, emailTitle, emailBody)
        

        return res.status(200).json({
            success: true,
            msg: "Password changed successfully, and a confirmation email has been sent."
        });

    } catch (error) {
        console.error("An error occurd in change password", error)
        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }
}