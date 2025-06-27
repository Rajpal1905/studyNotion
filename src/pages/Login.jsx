import React from 'react'
import loginImg from '../assets/Images/login.webp'
import {Templates} from '../components/core/HomePage/Auth/Templates'

export const Login = ({ formType}) => {
  return (
    <div>
        <Templates
          title="Welcome Back"
          des1="Build skills for today, tomorrow, and beyond."
          des2="Education to future-proof your career."
          image={loginImg}
          formType={formType}
        />
        </div>
  )
}
