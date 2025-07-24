import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LeftsideSideMenuBar from '../LeftsideSideMenuBar'

const Dashboard = () => {
  const [sideBarMenuToggle, setSideBarMenuToggle] = useState(true)
  const [homePageContentData, setHomePageContentData] = useState<any>([])
  const [RightSideMenuToggle, setRightSideMenuToggle] = useState(false)



  useEffect(() => {
    axios.get('http://localhost:3001/challengeInfo')
      .then((respo) => {
        setHomePageContentData(respo.data)
        console.log(respo.data)
        console.log(Array.isArray(respo.data))
        console.log(typeof homePageContentData)
      })

  }, [])


  return (
    <div className="flex flex-row min-h-screen">

    <h1>dashboard</h1>

      {/* {!sideBarMenuToggle && (
        <div className="w-[5%] bg-[#563A9C] flex  pt-[10px] mr-[20px] justify-center">
          <button className="cursor-pointer border border-white rounded-[4px] h-[40px] w-[40px] flex justify-center items-center" onClick={() => { setSideBarMenuToggle(true) }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

      )}

      <div className="flex flex-col px-[20px] py-[20px] flex-1 bg-gray-100">

        {/* <div className="flex justify-between">
         
          {!RightSideMenuToggle && (
            <div className="flex items-center"> <p className="text-[16px] font-[700] mr-[20px]">Welcome Back to FED !</p>
              <button className="bg-[#563A9C] rounded-[4px] h-[40px] w-[40px] flex  justify-center items-center cursor-pointer"
                onClick={() => { setRightSideMenuToggle(true) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              </button>
            </div>
          )}

        </div> */}


      {/* {RightSideMenuToggle && (
        <RightSideMenuBar setRightSideMenuToggle={setRightSideMenuToggle} />
      )} */}



    </div>
  )
}

export default Dashboard
