import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import logoBlack from '../assets/LogoBlack.svg'
import details from '../assets/details.png'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

function Resume() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }
    };
    const uploadButton = (
      <button
        style={{
          border: 0,
          background: 'none',
        }}
        type="button"
      >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </button>
    );
  return (
    <div className='h-screen w-full relative'>
        <img className=' absolute top-[3vh] left-[4vh] h-[6vh]' src={logoBlack} alt="" />
        <div className='flex h-screen justify-evenly items-center ml-[3vw]'>
            <div className='h-[80vh] w-[35vw] bg-white border-[#CECECE] border rounded-[4vh] flex flex-col items-center relative'>
                <h1 className='text-[6.5vh] font-black mt-[7vh]'>Details</h1>
                <div className='mt-[9vh]'>
                    <h1>Upload your resume ( ATS Format )</h1>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader absolute top-[35vh]"
                        showUploadList={false}
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            className=""
                        />
                        ) : (
                        uploadButton
                        )}
                    </Upload>
                </div>
                <div className='flex gap-[1vw] mt-[7vh] absolute bottom-[10vh]'>
                    <button className='px-[2vw] py-[1vh] border rounded-[5vh] w-fit'>Skip</button>
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
