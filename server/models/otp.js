const mongoose = require('mongoose')
const course = require('./course')
const { mailSender } = require('../utility/emailSender')
const emailtemplate  = require("../mail/template/emailVerificationTemplate")

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        requied:true    
    },
    otp:{
        type:String,
        requied:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires: 5*60
    } 
})

async function sendVerificationEmail (email,otp){
    try {
        const mailResponse = await mailSender(email , "Verification Email from LearnJet",emailtemplate(otp))
        console.log("Mail done ---> Response: => ",mailResponse);
        
    } catch (error) {
        console.error("error occured in sendVerificationCode",error)
    }
}

otpSchema.pre("save", async function (next) {
    if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	} 
    next();
})

module.exports = mongoose.model("OTP",otpSchema)