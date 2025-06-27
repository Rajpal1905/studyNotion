import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimeLineImage from '../../../assets/Images/TimeLineImage.png'
export const TimelineSection = () => {
    const timeLine = [
        {
            logo: Logo1,
            heading:"Leadership",
            Description: "Fully commited to the success company" 
        } ,
        {
            logo: Logo2,
            heading:"Responsibility",
            Description: "Students will always be our top priority" 
        } ,
        {
            logo: Logo3,
            heading:"Flexibility",
            Description: "The ability to switch is an important skill" 
        } ,
        {
            logo: Logo4,
            heading:"Solve the problem",
            Description: "Code to way to a solution" 
        } 
    ]
  return (
    <div>
        <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>
        {/* leftbox */}
        <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>
            {
                timeLine.map((elem,index)=>{
                    return (
                            <div className='flex flex-col lg:gap-3' key ={index}>
                            <div className='flex gap-3'>
                                <div className='flex items-center rounded-full justify-center w-[50px] h-[50px] bg-white'>
                                    <img src={elem.logo}/>
                                </div>
                                <div>
                                    <h2 className='text-[18px] font-semibold'>{elem.heading}</h2>
                                    <p className='text-base'> {elem.Description }</p>
                                </div>
                            </div>   
                            </div>
                    )
                })
            }
        </div>
            <div className=' relative shadow-blue-200'>
            <img src={TimeLineImage}
                alt='timeLineImage'
                className=' object-cover h-fit shadow-white'
            />
            <div className=' absolute flex flex-row bg-caribbeangreen-700 text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className=' flex flex-row border-r border-caribbeangreen-300 gap-5 items-center px-6 '>
                    <p className='text-3xl font-bold'>10</p>
                    <p className=' text-sm text-caribbeangreen-300'>Years of Experience</p>
                </div>
                <div className=' flex flex-row border-r border-caribbeangreen-300 gap-5 items-center px-6'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className=' text-sm text-caribbeangreen-300'>Types of Courses</p>
                </div>
                <div>

                </div>
            </div>  

            </div>
        </div>
    </div>
  )
}
