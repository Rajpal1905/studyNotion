import React from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SignupForm = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [accountType,setAccountType] = useState("student")

  // Handle form input changes
  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  // Handle form submission
  function submitHandler(event) {
    event.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password Not Matched");
      return;
    }

    // Set user as logged in and navigate to dashboard
    setIsLoggedIn(true); 
    toast.success("Account Created");

    // Log account data (Optional)
    const accountData = { ...formData };
    console.log(accountData);

    // Redirect to dashboard
    navigate("/dashboard");
  }

  return (
    <div>
      <div className='flex bg-richblack-700 p-1 gap-x-1 rounded-full my-6 max-w-max '>
        <button
        onClick={()=>setAccountType('student')}
        className={`${accountType === "student" ? 
        " bg-richblack-900 text-richblack-5" : 
        " bg-transparent text-richblack-200" }  py-2 px-5 rounded-full transition-all duration-200`}

        >Student</button>

        <button
         className={`${accountType === "instructor" ? 
        " bg-richblack-900 text-richblack-5" : 
        " bg-transparent text-richblack-200" }  py-2 px-5 rounded-full transition-all duration-200`}
        onClick={()=>setAccountType("instructor")}
        >Instructor</button>
      </div>
      <form 
      className='  gap-4 mt-[20px]'
      onSubmit={submitHandler}>
        <div className='flex gap-x-4'>

          <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
            <input
              required
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={changeHandler}
              value={formData.firstName}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
          </label>
          <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className=' text-pink-200'>*</sup></p>
            <input
              required
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={changeHandler}
              value={formData.lastName}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
          </label>
        </div>

        <label className='w-full'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email<sup className=' text-pink-200'>*</sup></p>
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            onChange={changeHandler}
            value={formData.email}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
        </label>

        <div className='flex gap-x-4 ' >
          <label className=' w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className=' text-pink-200'>*</sup></p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={changeHandler}
              value={formData.password}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
            <span 
            className='absolute right-3 top-[38px] cursor-pointer' 
            onClick={() => setShowPassword((prev) => !prev)}>

              {showPassword ? <AiOutlineEye  fontSize={24} fill='#AFB2BF'/> : <AiOutlineEyeInvisible  fontSize={24} fill='#AFB2BF'/>}
            </span>
          </label>

          <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className=' text-pink-200'> *</sup></p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={changeHandler}
              value={formData.confirmPassword}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
            
            <span 
            className='absolute right-3 top-[38px] cursor-pointer' 
            onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? <AiOutlineEye  fontSize={24} fill='#AFB2BF'/> : <AiOutlineEyeInvisible  fontSize={24} fill='#AFB2BF'/>}  
            </span>
          </label>
        </div>

        <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>Create Account</button>
      </form>
    </div>
  );
};
