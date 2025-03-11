import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import logoBlack from '../assets/LogoBlack.svg'
import details from '../assets/details.png'
import { Link } from 'react-router-dom';

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};


function Resume() {
  return (
    <div className='h-screen w-full relative'>
        <img className=' absolute top-[3vh] left-[4vh] h-[6vh]' src={logoBlack} alt="" />
        <div className='flex h-screen justify-evenly items-center ml-[3vw]'>
            <div className='h-[80vh] w-[35vw] bg-white border-[#CECECE] border rounded-[4vh] flex flex-col items-center relative'>
                <h1 className='text-[6.5vh] font-black mt-[7vh]'>Details</h1>
                <div className='mt-[9vh]'>
                    <h1 className='mb-[3vh]'>Upload your resume ( ATS Format )</h1>
                    <Dragger {...props} >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  </Dragger>
                </div>
                <div className='flex gap-[1vw] mt-[7vh] absolute bottom-[10vh]'>
                    <Link to="/"><button className='px-[2vw] py-[1vh] border rounded-[5vh] w-fit'>Skip</button></Link>
                    <button className='px-[2vw] py-[1vh] border rounded-[5vh] w-fit'>Continue <i className="ri-arrow-right-long-line"></i></button>
                </div>
            </div>
            <div className='h-[80vh] w-[40vw] bg-red-20'>
                <div className='flex flex-col text-center'>
                    <h1 className='text-[4vh] font-semibold'>Collabrate +</h1>
                    <h1 className='text-[2.3vh] mt-[5vh] font-light'>We recommend uploading your <br /> resume in ATS format, as it is widely <br /> accepted and ensures better <br /> compatibility.</h1>
                </div>
                <img className='mt-[5vh]' src={details} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Resume
