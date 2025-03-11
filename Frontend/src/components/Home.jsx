import React from 'react'
import logoBlack from '../assets/Logowhite.png'
import search from '../assets/search.png'
import Group1 from '../assets/Group1.png'
import Group2 from '../assets/Group2.png'
import Group3 from '../assets/Group3.png'
import Group6 from '../assets/Group6.png'
import Group7 from '../assets/Group7.png'
import me from '../assets/me.png'

function Home() {
  return (
    <div className='bg-black text-white h-fit w-full overflow-hidden'>
      <div className='fixed z-10 flex items-center justify-between backdrop-blur-sm bg-[#00000053] w-[98vw] px-[5vw] h-[10vh] rounded-[2vh] mt-[2vh] ml-[1vw]'>
        <img className='h-[6vh] z-10' src={logoBlack} alt="" />
        <div className='flex gap-[2vw] items-center'>
            <h1>Chats</h1>
            <h1 >Provide Job</h1>
            <div className='h-[5vh] w-[5vh] bg-zinc-300 rounded-full'>
            <img src={me} alt="" />
            </div>
        </div>
      </div>
      <div className='flex justify-center text-center items-center h-fit'>
        <h1 className=' text-[6vh] font-medium pt-[25vh] leading-[9vh]'>Grow your team with flexible <br /> freelance experts.</h1>
      </div>
      <div className='flex justify-center items-center gap-[.5vw] relative'>
        <input type="text" className='bg-[#2B2B2B] h-[8vh] w-[45vw] rounded-full px-[3vw] mt-[5vh]' rela />
        <img className=' absolute right-[27.5vw] top-[5.5vh]' src={search} alt="" />
      </div>
      <div className='h-[10vh] w-full mt-[20vh] ml-[5vw] mb-[5vh]'>
        <h1 className='text-[3.5vh]'>Make it all happen <br />with freelancers.</h1>
      </div>
      <div className='flex overflow-auto pl-[5vw] gap-[1.5vw]'>
        <img className='h-[75vh]' src={Group1}  alt="" />
        <img className='h-[75vh]' src={Group2}  alt="" />
        <img className='h-[75vh]' src={Group3}  alt="" />
        <img className='h-[75vh]' src={Group6}  alt="" />
        <img className='h-[75vh]' src={Group7}  alt="" />
      </div>
      <div className='h-[7vh] w-full mt-[15vh] ml-[5vw] '>
        <h1 className='text-[3.5vh]'>Jobs you might like.</h1>
      </div>
      <div className='ml-[5vw] flex gap-[5vw]'>
        <h1 className='text-[3vh] border-b-2'>Most recent</h1>
        <h1 className='text-[3vh]'>Saved Jobs</h1>
      </div>
      <div className='w-screen flex justify-center mt-[5vh]'>
        <div className='h-[43vh] w-[90vw] bg-[#131313] p-[2vw] rounded-[2vh] flex justify-between'>
          <div className='w-[65vw] h-full flex flex-col justify-between'>
            <div className=''> 
              <h1>Programming And Tech.</h1>
              <h1 className='text-[3vh] w-1/3'>Web Developer Needed for Business Project</h1>
            </div>
            <div>
              <p>We are seeking a talented web developer to create simple and clean websites for two business projects: a local news and public information aggregator, and a mobile notary public service. The ideal candidate should have experience in designing user-friendly interfaces and providing responsive web solutions. Your creativity and attention to detail will be crucial in delivering functional and visually appealing websites that meet our business needs. The implementation of AI solutions would be extremely valuable.</p>
            </div>
          </div>
          <div className='h-[36vh] w-[15vw] bg-[#232323] flex flex-col items-center rounded-[2vh]'>
            <h1 className='mt-[2vh]'>Paid</h1>
            <div className='h-[6vh] w-[6vh] bg-zinc-300 rounded-full my-[1vh]'>
              <img src={me} alt="" />
            </div>
            <h1 className='text-[2.5vh]'>Chaithanya</h1>
            <h1 className='text-[1.5vh]'>2025 BTech</h1>
            <h1 className='px-[2vw] py-[1vh] border rounded-full mt-[3vh]'>Save</h1>
            <h1 className='px-[2vw] py-[1vh] border rounded-full mt-[1vh] bg-white text-black'>Chat</h1>
          </div>
        </div>
      </div>
      <div className='flex flex justify-between items-center px-[8vh]'>
        <div className=' h-[60vh] w-full flex justify-between items-center'>
          <div className=''>
            <h1 className='text-[#A3A3A3] text-[3vh]'>Collabrate +</h1>
            <h1 className=' capitalize text-[7vh] font-semibold leading-[8.3vh] mt-[2vh]'>good things <br /> will happen <br /> when you say <br /> “hello!”</h1>
          </div>
        </div>
        <div>
          <h1>We would love to connect on LinkedIn</h1>
          <h1>designed and developed by</h1>
        </div>
      </div>

    </div>
  )
}

export default Home
