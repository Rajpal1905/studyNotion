import React, { useState } from 'react'
import { Tab } from '../../../common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { ACCOUNT_TYPE } from '../../../../utils/constant'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setSignupData } from '../../../../Slices/Authslice'
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../../../../services/operations/authApi'



export const SignupForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const { firstName, lastName, email, password, confirmPassword } = formData

    const onChangeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))

    }

    const submitHandler = (e)=>{
       e.preventDefault();
       if(password !== confirmPassword){
        toast.error("Password Do Not Match")
       }

       const signupForm = {
        ...formData,
        accountType
       }

       //here store data in browser for later access
       dispatch(setSignupData(signupForm));

       //hit send otp and navigate to /verify email page
       dispatch(sendOtp(email,navigate))


       //reset 
       setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
       })
       setAccountType(ACCOUNT_TYPE.STUDENT)
    } 

    const TabData = [
        {
            id:1,
            tabName: "Student",
            type:ACCOUNT_TYPE.STUDENT
        },
        {
            id:2,
            tabName: "Instructor",
            type:ACCOUNT_TYPE.INSTRUCTOR
        },
    ]

    return (
        <div>
            <Tab tabData = {TabData} field ={accountType} setField={setAccountType}/>
            <form onSubmit={submitHandler} className='flex w-full flex-col  gap-y-4'>
                <div className=' flex gap-x-4'>
                    <label >
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                            First Name <sup className=' text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={onChangeHandler}
                            placeholder='Enter first name'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                    </label>
                    <label >
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                            Last Name <sup className=' text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type='text'
                            name='lastName'
                            value={lastName}
                            onChange={onChangeHandler}
                            placeholder='Enter last name'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                    </label>
                </div>
                <label>
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        Email Address <sup className=' text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type='email'
                        name='email'
                        value={email}
                        onChange={onChangeHandler}
                        placeholder='Enter email address'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    />
                </label>
                <div className='flex gap-x-4'>
                    <label className=' relative'>
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                            Create Password<sup className=' text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={onChangeHandler}
                            placeholder='Enter your password'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />

                        <span
                            onClick={() => setShowPassword((prev) => (!prev))}
                            className=' absolute right-3 top-[38px] z-[10] cursor-pointer'
                        >
                            {showPassword ? <AiOutlineEye fontSize={23} fill='AFB2Bf' /> : <AiOutlineEyeInvisible fontSize={23} fill='AFB2Bf' />}
                        </span>
                    </label>
                    <label className=' relative'>
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                            Confirm Password<sup className=' text-pink-200'>*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "test" : 'password'}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={onChangeHandler}
                            placeholder='confirm your password'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                        <span
                            onClick={()=>setShowConfirmPassword((prev)=>(!prev))}
                            className=' absolute right-3 top-[38px] z-[10] cursor-pointer'
                        > 
                        {showConfirmPassword ? <AiOutlineEye fontSize={23} fill='AFB2Bf' /> : <AiOutlineEyeInvisible fontSize={23} fill='AFB2Bf' />}

                        </span>
                    </label>
                </div>
                <button type="submit"
                    className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'>
                    Create Account
                </button>
            </form>
        </div>
    )
}
