import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import { HighLightText } from '../components/core/HomePage/HighLightText'
import { CTAButton } from '../components/core/HomePage/CTAButton'
import Banner from '../assets/Images/banner.mp4'
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks'
import { TimelineSection } from '../components/core/HomePage/TimelineSection'
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection'
import { InstructorSection } from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import { ExploreMore } from '../components/core/HomePage/ExploreMore'

export const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white'>
        <Link to={'/signup'}>
          <div className='group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none '>
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold">
          Empower Your Future with
          <HighLightText text={" Coding Skills"} />
        </div>

        <div className='-mt-3 lg:w-[70%] text-center text-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className='flex flex-row gap-7 mt-8 '>
          <CTAButton active={true} linkto={'/signup'}>
            learn More
          </CTAButton>
          <CTAButton active={false} linkto={'/login'}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            autoPlay
            muted
            loop>
            <source src={Banner} type='video/mp4' />

          </video>
        </div>

        <CodeBlocks position={"lg:flex-row"}
          heading={
            <div className='text-4xl font-semibold'>
              Unlock your
              <HighLightText text={' Coding potential '} />
              with our online courses
            </div>
          }
          subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
          ctabtn1={{
            linkto: "/signup",
            active: true,
            btnText: "Try it yourself",
          }}
          ctabtn2={{
            linkto: "/signup",
            active: false,
            btnText: "Learn more",
          }}
          codeColor={"text-yellow-25"}
          codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          backgroundGradient={<div className="codeblock1 absolute"></div>}
        />

        <CodeBlocks position={"lg:flex-row-reverse"}
          heading={
            <div className='text-4xl font-semibold'>
              Start
              <HighLightText text={' Coding in seconds '} />
            </div>
          }
          subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
          ctabtn1={{
            linkto: "/signup",
            active: true,
            btnText: "Continue lesson ",
          }}
          ctabtn2={{
            linkto: "/signup",
            active: false,
            btnText: "Learn more",
          }}
          codeColor={"text-yellow-25"}
          codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          backgroundGradient={<div className="codeblock1 absolute"></div>}
        />
        {/* {explore more section} */}
        <ExploreMore/>
      </div> 


      {/* section 2 */}
      <div className=' bg-pure-greys-5 text-richblack-700 '>
        <div className='homepage_bg h-[310px] '>
          <div className='h-[140px]'></div>
            <div className='flex gap-7 flex-row justify-center text-white mt-7  mb-10' >
            <CTAButton active={true} linkto={'/signup'}>
              <div className='flex items-center gap-3'>
                Explore Full Catalog
                <FaArrowRight />
              </div>
            </CTAButton>

            <CTAButton active={false} linkto={'/login'}>
              <div>
                Learn more
              </div>
            </CTAButton>
          </div>
        </div>

        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-6 '>
          <div className=' mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0 '>
            <div className='text-4xl font-semibold lg:w-[45%]'>
            Get the skills you need for a 
            <HighLightText text={' Job that is in demand'}/>
            </div>
            <div className='flex flex-col gap-10 w-[40%] lg:items-start md:item-center'>
            <div className='text-[16px]'>
              The modern studyNotion is the dictates its own terms. Today, be a competitive specialist requires more than professional skills.
            </div>
              <CTAButton active={true} linkto={'/signup'}>
                Learn more
              </CTAButton>
          </div>
        </div>
        <TimelineSection/>
        <LearningLanguageSection/>
        </div>

      </div>

      {/* section 3 */}
            <div className=' mx-auto w-11/12 max-w-screen flex flex-col items-center bg-richblack-900 text-white justufy-center gap-8'>
            {/* become instructor */}
              <InstructorSection/>
              {/* review section */}
               
              <h2 className=' text-center text-4xl font-semibold mt-8'>
            Review from another learners
              </h2>
              {/* here review section pending.......... */}
              <div>

              </div>
            </div>

      {/* Footer  */}
      <Footer/>

    </div>
  )
}
