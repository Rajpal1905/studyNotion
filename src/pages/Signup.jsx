import React from 'react'
import { Templates } from '../../../../ReactIntermediate/react-router2/src/components/Templates'
import signupImg from '../assets/Images/signup.webp'

export const Signup = ({ formType}) => {
  return (
    <div>
      <Templates
      title="Join the millions learning to code with StudyNotion for free"
            des1="Build skills for today, tomorrow, and beyond."
            des2="Education to future-proof your career."
            image={signupImg}
            formType={formType}
      />
    </div>
  )
}
