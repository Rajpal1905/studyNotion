import React from 'react'
import {HighLightText} from "../components/core/HomePage/HighLightText"
import bannerimage1 from "../assets/Images/aboutus1.webp"
import bannerimage2 from "../assets/Images/aboutus2.webp"
import bannerimage3 from "../assets/Images/aboutus3.webp"
import { Quote } from '../components/core/AboutPage/Quote'
import Footer from "../components/common/Footer.jsx"


export const About = () => {
  return (
    <div>
        {/* section 1 */}
        <section className=' bg-richblack-700'>
            <div className=' relative mx-auto flex flex-col w-11/12 max-w-maxContent justify-between gap-10 text-center text-white '>
                <header className='mx-auto  py-20 text-4xl font-semibold lg:w-70%'>
                    Driving Innovation in online Education for About
                    <HighLightText text = " Brighter Future"/>
                    <p className='mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]'>
                      Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </header>
               
                <div className=' sm:h-[70px] lg:h-[150px]'>
                  <div className='absolute bottom-0 left-[50%] w-[100%] translate-x-[-50%] translate-y-[30%] grid grid-cols-3 gap-3 lg:gap-5'>
                  <img src={bannerimage1} alt=''/>
                  <img src={bannerimage2} alt=''/>
                  <img src={bannerimage3} alt=''/>
                </div>
                </div>
            </div>
        </section>


        <section className=' border-b border-richblack-700'>
          <div className=' mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
            <div className=' m-24 h-[100px]'>
              <Quote/>
            </div>
          </div>
        </section>

        <section>

        </section>

        <Footer/>
    </div>
  )
}
