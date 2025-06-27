import React, { useEffect, useState } from 'react'
import { Link, matchPath, NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'

import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { ProfileDropDown } from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/ApiConnecter'
import { categories } from '../../services/Apis'
import { BsChevronDown } from 'react-icons/bs'
import {AiOutlineMenu} from 'react-icons/ai'

export const Navbar = (props) => {

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation();
  const [subLinks, setSublinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const { data } = await apiConnector("GET", categories.CATEGORY_API);


      if (data?.allCatagorys) {
        // setSublinks(data.allCatagorys.map(cat => cat.name)); 
        setSublinks(data.allCatagorys);
      } else {
        console.warn("No categories found in API response");
      }
    } catch (error) {
      console.error("Error occurred while fetching sublinks:", error);
    }
  };

  useEffect(() => {
    fetchSublinks()
  }, [])



  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className='flex justify-between w-11/12 gap-8 items-center mx-auto max-w-[1160px] py-4 '>
        <Link to='/'>
          <img src={logo} alt='Logo' width={160} height={32} loading='lazy' />

        </Link>
        <nav>
          <ul className=' flex gap-x-6 text-white '>
            {
              NavbarLinks.map((link, index) => (
                <li key={index}>
                  {
                    link.title == 'Catalog' ? (
                      <>
                        <div
                          className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? " text-yellow-25" : "text-richblack-25 "}
            
                      }`}>
                          <p>{link.title}</p>
                          <BsChevronDown />

                          <div className=' invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] '>
                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                            {subLinks?.length > 0 ? (
                              <>
                                {[
                                  ...new Map(subLinks.map((subLink) => [subLink.name, subLink])).values()
                                ].map((subLink) => (
                                  <Link
                                    to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                    key={subLink._id}
                                  >
                                    <p>{subLink.name}</p>
                                  </Link>
                                ))}
                              </>
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )}




                          </div>
                        </div>
                      </>
                    ) :
                      <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? " text-yellow-25" : "text-richblack-25 "}`}>
                          {link.title}
                        </p>
                      </Link>
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        <div className=' flex gap-x-4 items-center'>
          {
            user && user?.acountType != "Instructor" && (
              <Link to={'/dashboard/card'} className=' relative'>
                <AiOutlineShoppingCart />
                {
                  totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }

          {
            token === null && (
              <Link to={'/login'}>
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  sign in
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to={'/signup'}>
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            )
          }

          {
            token !== null && <ProfileDropDown />
          }
        </div>
<button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}
