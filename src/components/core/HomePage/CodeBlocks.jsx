import React from 'react'
import { CTAButton } from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

export const CodeBlocks = (props) => {
  return (
    <div className={`flex ${props.position} my-20 justify-between flex-col lg:gap-10 gap-10` }>
    {/* Section 1 */}
    <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
        {props.heading}
        <div className='text-richblack-300 text-base font-bold w-[85%] -mt-3'>
            {props.subHeading}
        </div>

        <div className='flex mt-7 gap-7'>
            <CTAButton active = {props.ctabtn1.active} linkto ={props.ctabtn1.linkto}>
                <div className=' flex gap-2 items-center'>
                {props.ctabtn1.btnText}
                <FaArrowRight/>
                </div>
            </CTAButton>

            <CTAButton active = {props.ctabtn2.active} linkto ={props.ctabtn2.linkto}>
                {props.ctabtn2.btnText}
            </CTAButton>
        </div>

    </div>
    {/*Section 2 */ }

    <div className=' h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>
        <div className=' text-center flex flex-col  w-[10%] select-none text-richblack-400 font-inter font-bold'>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>  
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
            
        </div>
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${props.codeColor} pr-2`}> 

        <TypeAnimation
            sequence={[props.codeblock, 5000, ""]}
            repeat={Infinity}
            style={{
                whiteSpace:"pre-line",
                display:"block"
            }}
            omitDeletionAnimation={true}
        />
        
        </div>
    </div>

    </div>
  )
}
