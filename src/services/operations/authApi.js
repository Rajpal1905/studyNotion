import toast from "react-hot-toast"
import { setToken, setLoading } from "../../Slices/Authslice"
import { apiConnector } from "../ApiConnecter"
import { setUser } from "../../Slices/profileSlice"

import {endPoints } from "../Apis"
import { retry } from "@reduxjs/toolkit/query"

const { LOGIN_API ,
    SIGNUP_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API,
    SENDOTP_API
} = endPoints



export function signup(accountType, firstName,lastName,email,password,confirmPassword,otp,navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName, lastName, email,password, confirmPassword,accountType,otp
            })
            console.log("signup - Api response...... : ", response)
            if (!response.data.success) {
                throw new Error(response.data.message)  
            }
            toast.success("OTP successfully Send")
            
            
            navigate("/login")
        }
        catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}
export function login(email, password, navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            })
            console.log("login - Api response...... : ", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success(" Login successfully")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image ? response.data.user.image :
                `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({ ...response.data.user, image: userImage }))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
        }
        catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function sendOtp(email , navigate){
    return async (dispatch)=>{
          const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try {
            const {data} = await apiConnector("POST", SENDOTP_API,{email})
            if(!data.success){
                throw new error(data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate('/verify-email')
        } catch (error) {
            console.log("SEND OTP ERROR............", error)
            toast.error("ERROR WHILE SENDING OTP ")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}
export function logout( navigate){
    return async (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate('/')

    }
}


export function getPasswordResetToken(email , setSendEmail) {
    return async(dispatch) => {
        dispatch(setLoading(true))
        try {
            const {data} =  await apiConnector("POST",RESETPASSWORDTOKEN_API, {email})
            console.log("RESET PASSWORD TOKEN RESPONSE.........",data)

            if(!data.success){
                throw new Error(data.message);
            }
            toast.success("Reset Email Sent")
            setSendEmail(true)

        }  catch (error) {
            console.log("RESET PASSWORD TOKEN  ERROR............", error)
            toast.error("RESET PASSWORD TOKEN ")
        }
        dispatch(setLoading(false))
        
    }
}

export function ResetPassword(password, confirmPassword, token, navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try {
            const {data} = await apiConnector("POST",RESETPASSWORD_API,{password, confirmPassword,token})
             console.log("RESET PASSWORD  RESPONSE.........",data)
             if(!data.success){
                throw new error(data.message)
             }
             toast.success("Password Changed Successfully ")
             navigate('/login')
        }  catch (error) {
            console.log("RESET PASSWORD API ERROR............", error)
            toast.error("Reset Password Failed")
        }
        dispatch(setLoading(false))
    }
}