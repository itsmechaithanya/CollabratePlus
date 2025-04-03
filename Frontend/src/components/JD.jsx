import React from 'react'
import me from "../assets/me.png";

function JD() {
  return (
    <div className='text-white'>
        <div className="h-screen w-full bg-[#131313] p-[2vw] flex justify-between">
                  <div className="w-[65vw] h-full flex flex-col justify-between">
                    <div className="">
                      <h1>Programming And Tech.</h1>
                      <h1 className="text-[3vh] w-1/3">
                        Web Developer Needed for Business Project
                      </h1>
                    </div>
                    <div>
                      <p>
                        We are seeking a talented web developer to create simple and
                        clean websites for two business projects: a local news and
                        public information aggregator, and a mobile notary public
                        service. The ideal candidate should have experience in designing
                        user-friendly interfaces and providing responsive web solutions.
                        Your creativity and attention to detail will be crucial in
                        delivering functional and visually appealing websites that meet
                        our business needs. The implementation of AI solutions would be
                        extremely valuable.
                      </p>
                    </div>
                  </div>
                  <h1 className="px-[2vw] h-fit py-[1vh] border rounded-full mt-[1vh] bg-white text-black">
                      Apply
                    </h1>
                </div>
    </div>
  )
}

export default JD