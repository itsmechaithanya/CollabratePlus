import React from 'react'
import logoBlack from '../assets/Logowhite.png'
import student from '../assets/student.png'
import faculty from '../assets/faculty.png'

function Designation() {
  return (
    <div className='bg-black text-white w-screen h-screen relative'>
        <img className=' absolute top-[3vh] left-[4vh] h-[6vh] z-10' src={logoBlack} alt="" />
        <h1 className='text-[6.9vh] capitalize font-black leading-[8vh] absolute top-[30vh] left-[5vw]'>Please <br /> select your <br /> designation</h1>
        <h1 className='text-[2.3vh] font-light left-[5vw] absolute top-[57vh]'>Join the Woxsen-exclusive platform <br /> to explore job opportunities.</h1>
        <button className='px-[2vw] py-[1vh] border rounded-[5vh] bg-white text-black absolute left-[5vw] bottom-[23vh] w-fit'>Continue <i className="ri-arrow-right-long-line"></i></button>
        <div className='flex flex-row-reverse gap-[2vw] absolute top-[20vh] right-[7vw]'>
            <button><img src={student} alt="" /></button>
            <button><img src={faculty} alt="" /></button>
        </div>
    </div>
  )
}

export default Designation
