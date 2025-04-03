import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function Profile() {
  return (
    <div className="min-h-screen bg-black text-white px-12 py-8 font-sans">
      {/* Header: Back Button + Title */}
      <div className="flex items-center space-x-4">
        <FaArrowLeft className="text-xl cursor-pointer" />
        <h1 className="text-2xl font-semibold">Profile Settings</h1>
      </div>

      {/* User Information */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold">User Information</h2>
        <p className="text-gray-400 mt-2">
          Here you can edit and update public information about yourself, making
          it more personalized.
        </p>
      </div>

      {/* Main Content: Form (Left) & Profile Picture (Right) */}
      <div className="flex flex-row mt-8 space-x-8">
        {/* Left Section: Form Container */}
        <div className="bg-[#1E1E1E] p-6 rounded-lg w-2/3">
          <div className="grid grid-cols-2 gap-6">
            {/* Resume (full width in the grid) */}
            <div className="col-span-2">
              <label className="block mb-2 font-medium">Resume</label>
              <div className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Drag &amp; Drop or Browse</span>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none"
                placeholder="example@domain.com"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block mb-2 font-medium">Designation</label>
              <select className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none">
                <option>Student</option>
                <option>Working Professional</option>
              </select>
            </div>

            {/* Year Of Pass Out */}
            <div>
              <label className="block mb-2 font-medium">Year Of Pass Out</label>
              <select className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none">
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>

            {/* Field Of Interest */}
            <div>
              <label className="block mb-2 font-medium">
                Field Of Interest
              </label>
              <select className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none">
                <option>Programming and tech</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Section: Profile Picture & Info */}
        <div className="w-1/3">
          <h3 className="text-xl font-bold mb-4">Profile Picture</h3>
          <div className="bg-[#1E1E1E] p-6 rounded-lg flex flex-col items-center">
            {/* Replace src with your image URL */}
            <img
              src="https://via.placeholder.com/150"
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
      <div className="mt-8 flex justify-end">
        <button className="bg-white text-black px-6 py-3 rounded-full font-medium">
          Save
        </button>
      </div>
    </div>
  );
}

export default Profile;
