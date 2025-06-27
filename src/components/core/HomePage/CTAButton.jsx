import React from 'react'
import { Link } from 'react-router-dom'

export const CTAButton = (props) => {
  return (
    <Link to={props.linkto}>
    <div className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
          props.active ? "bg-yellow-50 text-black " : "bg-richblack-800"
        } hover:shadow-none hover:scale-95 transition-all duration-200 `}>
        {props.children}
    </div>
    </Link>
  )
}
