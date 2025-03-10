import React from 'react'
import logoBlack from '../assets/LogoBlack.svg'
import signup from '../assets/Signup.png'

function Signup() {
  return (
    <div className='bg-[#EBF2F2] h-screen w-full relative'>
        <img className=' absolute top-[3vh] left-[4vh] h-[6vh]' src={logoBlack} alt="" />
        <div className='flex h-screen justify-evenly items-center ml-[3vw]'>
            <div className='h-[80vh] w-[35vw] bg-white border-[#CECECE] border rounded-[4vh] flex flex-col items-center'>
                <h1 className='text-[6.5vh] font-black mt-[7vh]'>Sign up</h1>
                <div className='mt-[5vh]'>
                    <div className='flex gap-2'>
                        <div>
                            <h1>First Name</h1>
                            <input type="text" className='bg-[#F6F6F6] w-[9.5vw] mt-[1vh] px-[2vh] h-[5vh]' />
                        </div>
                        <div>
                            <h1>Last Name</h1>
                            <input type="text" className='bg-[#F6F6F6] w-[9.5vw] mt-[1vh] px-[2vh] h-[5vh]' />
                        </div>
                    </div>
                    <h1 className='mt-[3vh]'>Woxsen Email ID</h1>
                    <input type="text" className='bg-[#F6F6F6] w-[20vw] mt-[1vh] px-[2vh] h-[5vh]'/>
                    <h1 className='mt-[3vh]'>Password</h1>
                    <input type="text" className='bg-[#F6F6F6] w-[20vw] mt-[1vh] px-[2vh] h-[5vh]'/>
                </div>
                <button className='px-[2vw] py-[1vh] border rounded-[5vh] mt-[5vh] w-fit'>Create Account</button>
                <h1 className='mt-[3vh]'><span className='text-[#7a7a7a] '>Already have an account?</span> Log in </h1>
            </div>
            <div className='h-[80vh] w-[40vw] bg-red-20'>
                <div className='flex flex-col text-center'>
                    <h1 className='text-[4vh] font-semibold'>Collabrate +</h1>
                    <h1 className='text-[2.3vh] mt-[5vh] font-light'>Join the Woxsen-exclusive platform <br /> to explore job opportunities.</h1>
                </div>
                <img className='mt-[1vh]' src={signup} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Signup
