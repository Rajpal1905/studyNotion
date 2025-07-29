import React from 'react'
import { HighLightText } from '../HomePage/HighLightText'

export const Quote = () => {
  return (
    <div className=' text-xl md:text-4xl font-semibold ms-auto py-5 pb-20 text-center text-white'>
        We are passionate about revolutionzing the way we learn. Our innovative platform <HighLightText text = " combines technology"/>
        <span className=' bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>
        {" "}
        expertise
        </span>
        , and community to create an 
        <span className='  bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>
            { " "}
            unparalleled educational experience.
        </span>
    </div>
  )
}
