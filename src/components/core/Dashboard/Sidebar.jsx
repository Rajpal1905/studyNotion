import { VscSignOut } from "react-icons/vsc"
import {sidebarLinks} from "../../../data/dashboard-links"
import { SidebarLink } from "./SidebarLink"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../../services/operations/authApi"
import { useNavigate } from "react-router-dom"
import { ConfirmationModal } from "../../common/ConfirmationModal"

export const Sidebar = () => {
  const [confirmModal, setConfirmModal] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
        <div  className=' flex h-[calc(100vh -3.5rem)] min-w-[220px] flex-col border-r-[1px] border-richblack-700 bg-richblack-800 py-10'>
          <div className=' flex flex-col'>
          {
            sidebarLinks.map((link)=>(
              <SidebarLink link={link} iconName = {link.icon} key={link.id}/>
            ))
          }
          </div>
          <div className=" mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700">
          <div className=" flex flex-col">
          {/*thode code is pending here */}
            <button
            onClick={()=>{
              setConfirmModal({
                text1:"Are you sure?",
                text2:"You will be logged out of your account.",
                btn1Text:"logout",
                btn2Text:"cancel",
                btn1Handler : () => dispatch(logout(navigate)),
                btn2Handler : () => setConfirmModal(null)
              })
            }}
            >
           <div className=" flex items-center gap-x-2">
            <VscSignOut className="text-lg"/>
             <span>Logout</span>
           </div>
            </button>
          </div>
          </div>
        </div>
        confirmModal && <ConfirmationModal modelData = {confirmModal}/>
    </>
  )
}
