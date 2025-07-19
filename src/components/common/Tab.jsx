import React from 'react'

export const Tab = ({tabData, field, setField}) => {
  return (
    <div
      style={ {
        boxShadow : "inset 0px -1px 0px rgba(255,255,255,0.18)"
      }}
     className = ' flex bg-richblack-800 max-w-max p-1 gap-x-1 rounded-full my-16'>
      {tabData.map((tab) => (
        <button key={tab.id}
        onClick={()=>setField(tab.type)}
        className= {`${field == tab.type ? 
        " bg-richblack-900 text-richblack-5" : 
        " bg-transparent text-richblack-200"} py-2 rounded-full px-5 transition-all duration-200
        `}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  )
}
