import React from 'react'
import logoBlack from '../assets/Logowhite.png'
import welcome from '../assets/welcome.png'

function Welcome() {
  return (
    <div className=' relative'>
    <img className='w-screen h-screen object-cover relative z-0' src={welcome} alt="" />
    <img className=' absolute top-[3vh] left-[4vh] h-[6vh] z-10' src={logoBlack} alt="" />
    <h1 className=' absolute top-[10vh] right-[5vw] text-white z-10 text-end text-[2.5vh] font-extralight'>Before we move on, <br />We have a quick choice for you.</h1>
    <button className='px-[2vw] py-[1vh] border absolute top-[20vh] right-[5vw] z-10 rounded-[5vh] font-semibold bg-white'>Continue <i className="ri-arrow-right-long-line"></i></button>
    </div>
  )
}

export default Welcome
