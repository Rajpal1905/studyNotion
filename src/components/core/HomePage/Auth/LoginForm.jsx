import React from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../../services/operations/authApi';

export const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [formData, setformData] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)

  function changeHandler(event) {
    setformData((prevData) => (
      {
        ...prevData,
        [event.target.name]: event.target.value
      }
    )
    )
  }

  function submitHandler(event) {
    event.preventDefault(); 
    dispatch (login(formData.email,formData.password,navigate))

  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <label className='w-full'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className=' text-pink-200'> * </sup></p>
        <input
          required
          type='text'
          placeholder='Enter Email id'
          value={formData.email}
          onChange={changeHandler}
          name='email'
          className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
        />
      </label>

      <label className='w-full relative'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Password<sup className=' text-pink-200'> * </sup></p>
        <input
          required
          type={showPassword ? "text" : "password"}
          placeholder='Enter password'
          value={formData.password}
          onChange={changeHandler}
          name='password'
          className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
        />
        <span
          className='absolute right-3 top-[38px] cursor-pointer'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ?
            (<AiOutlineEye fontSize={24} fill='#AFB2BF' />) :
            (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />)}
        </span>
        <Link to="/forget-password">
          <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
            Forget Password
          </p>
        </Link>
      </label>
      <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
        Login
      </button>

    </form>
  )
}
