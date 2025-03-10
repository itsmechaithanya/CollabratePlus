import React from 'react'
import logoBlack from '../assets/Logowhite.png'
import search from '../assets/search.png'

function Home() {
  return (
    <div className='bg-black text-white h-[200vh] w-full'>
      <div className='fixed z-10 flex items-center justify-between backdrop-blur-sm w-[98vw] px-[5vw] h-[10vh] rounded-[2vh] mt-[2vh] ml-[1vw]'>
        <img className='h-[6vh] z-10' src={logoBlack} alt="" />
        <div className='flex gap-[2vw] items-center'>
            <h1>Chats</h1>
            <h1 >Provide Job</h1>
            <div className='h-[5vh] w-[5vh] bg-red-300 rounded-full'></div>
        </div>
      </div>
      <div className='flex justify-center text-center items-center h-fit'>
        <h1 className=' text-[6vh] font-medium pt-[25vh] leading-[9vh]'>Grow your team with flexible <br /> freelance experts.</h1>
      </div>
      <div className='flex justify-center items-center gap-[.5vw] relative'>
        <input type="text" className='bg-[#2B2B2B] h-[8vh] w-[45vw] rounded-full px-[3vw] mt-[5vh]' rela />
        <img className=' absolute right-[27.5vw] top-[5.5vh]' src={search} alt="" />
      </div>
    
    </div>
  )
}

export default Home
