import toast from "react-hot-toast"
import { setToken, setLoading } from "../../Slices/Authslice"
import { apiConnector } from "../ApiConnecter"
import { setUser } from "../../Slices/profileSlice"

import {endPoints } from "../Apis"

const { LOGIN_API ,
    SIGNUP_API
} = endPoints




export function signup(firstName, lastName, email,password, confirmPassword,accountType, contactNumber, navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName, lastName, email,password, confirmPassword,accountType, contactNumber
            })
            console.log("signup - Api response...... : ", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success(" OTP successfully Send")
            
            
            navigate("/login")
        }
        catch (error) {
            console.log("LOGIN API ERROR............", error)
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

