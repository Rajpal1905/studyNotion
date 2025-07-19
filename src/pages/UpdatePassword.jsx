import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ResetPassword } from '../services/operations/authApi'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'


export const UpdatePassword = () => {
    const {loading}  = useSelector((state)=>state.auth)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate =  useNavigate()
    
    const [formData, setFormData] = useState({
        password :"",
        confirmPassword:""
    })

    const[showPassword, setShowPassword] = useState(false)
    const[showConfirmPassword, setShowConfirmPassword] = useState(false)
 
    const {password , confirmPassword} =  formData 

    
    const handleOnChange = (e) =>{
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value
        }))
    }
    const handleOnSubmit = (e)=>{ 
        e.preventDefault();
        if (password !== confirmPassword) {
             toast.error("Password Do Not Match")
             return
        }
        const token = location.pathname.split("/").at(-1) 
        console.log("token...........",token)
        dispatch(ResetPassword(password, confirmPassword, token, navigate))
    }
  return (
    <div className=' grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {
            loading 
            ? 
            (
                <div className='spinner'></div>
            )
            :
            (
                <div className=' max-w-[500px] p-4 lg:p-8'>
                    <h1 className=' text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Choose  new password</h1>
                    <p className=' text-richblack-5'>Almost done. Enter your new password and youre all set.</p>
                    <form onSubmit={handleOnSubmit}>

                        <label className=' relative mt-4 block'>
                            <p className=' text-richblack-5'>New Password <sup className=' text-pink-200'>*</sup></p>
                            <input
                                required
                                type = {showPassword ? "text": "password" }
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                className='form-style w-full border-amber-50 border rounded p-2 text-richblack-5'
                            />
                            <span 
                            onClick={()=>setShowPassword((prev)=> !prev)}
                            className=' absolute right-3 top-[36px] cursor-pointer z-[10]'>
                                {showPassword ?
                                    <AiOutlineEye fontSize={24} fill='#AFB2BF'/>: <AiOutlineEyeInvisible fontSize={24}  fill='#AFB2BF'/>
                                }
                            </span>
                        </label>


                        <label className=' relative mt-4 block'>
                            <p className=' text-richblack-5'>Confirm New Password <sup className=' text-pink-200'>*</sup></p>
                            <input
                                required
                                type = {showConfirmPassword ? "text" : "password"}
                                name= "confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                className='form-style w-full border-amber-50 border rounded p-2 text-richblack-5
                                '
                            />
                            <span
                            onClick={ ()=> setShowConfirmPassword((prev)=> !prev)}
                             className=' absolute right-3 top-[36px] cursor-pointer z-[10]'>
                                {showConfirmPassword ?
                                    <AiOutlineEye fontSize={24} fill='#AFB2BF'/> : <AiOutlineEyeInvisible fontSize={24}  fill='#AFB2BF'/>
                                }
                            </span>
                        </label>
                        
                        <button type= "submit"
                        className=' mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblue-900'
                        >
                            Reset Password
                        </button>
                    </form>
                    <div className='  mt-6 flex items-center justify-between'>
                        <Link to='/login'>
                            <p className='flex items-center text-richblack-5 gap-x-2'>
                                <MdOutlineKeyboardBackspace/>Back to Login
                            </p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}
