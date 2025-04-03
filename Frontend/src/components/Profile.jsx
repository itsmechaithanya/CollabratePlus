import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
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

function Profile() {
  return (
    <div className="h-screen bg-black text-white px-12 py-8 font-sans">
        <div className='flex items-center gap-[2vw]'>
            <Link to="/"><i class="ri-arrow-left-line text-black bg-white text-xl font-bold px-[1vh] py-[1vh] rounded-full"></i></Link>
        <h1 className="text-2xl font-semibold">Profile settings </h1>
        </div>
      <div className="mt-8">
        <h2 className="text-[6vh] font-bold">User information</h2>
        <p className="text-gray-400 mt-2">
          Here you can edit and update public information about yourself, making
          it more personalized.
        </p>
      </div>

      {/* Main Content: Form (Left) & Profile Picture (Right) */}
      <div className="flex flex-row mt-8 space-x-8 w-[80vw]">
        {/* Left Section: Form Container */}
        <div className="bg-[#1E1E1E] p-6 rounded-lg w-[60vw]">
          <div className="grid grid-cols-2 gap-6">
            {/* Resume (full width in the grid) */}
            <div className="col-span-2">
              <label className="block mb-2 font-medium">Resume</label>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p 
                style={{ color:'white'}}
                className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
            </div>
            {/* Designation */}
            <div>
              <label className="block mb-2 font-medium mt-[5vh]">Designation</label>
              <select className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none">
                <option>Student</option>
                <option>Higher Authority</option>
              </select>
            </div>

            {/* Year Of Pass Out */}
            <div>
              <label className="block mb-2 font-medium mt-[5vh]">Year Of Pass Out</label>
              <input
                type="number"
                className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none"
              />
            </div>

            {/* Field Of Interest */}
            <div>
              <label className="block mb-2 font-medium">
                Field Of Interest
              </label>
              <select className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none">
                <option>Programming and Tech</option>
                <option>Research and Content Writer.</option>
                <option>Graphic and Design.</option>
                <option>Video and Animation</option>
                <option>Assignments and Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Section: Profile Picture & Info */}
        <div className=" absolute top-[25vh] right-[5vw] w-[30vw]">
          <h3 className="text-xl font-bold mb-4">Profile Picture</h3>
          <div className="bg-[#1E1E1E] p-6 rounded-lg flex flex-col items-center">
            {/* Replace src with your image URL */}
            <img
              src="https://images.unsplash.com/photo-1584008167170-4b0265fed5f9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />

            {/* Username */}
            <div className="w-full mb-4">
              <label className="block mb-2 font-medium">Username</label>
              <input
                type="text"
                className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none"
                defaultValue="ohnochaithanya"
              />
            </div>

            {/* Password (or some secure field) */}
            <div className="w-full mb-4">
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none"
                placeholder="•••••••"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button (Bottom Right) */}
      <div className="mt-8 flex justify-end absolute bottom-[5vh] right-[10vh]">
        <button className="bg-white text-black px-6 py-3 rounded-full font-medium">
          Save
        </button>
      </div>
    </div>
  );
}

export default Profile;
