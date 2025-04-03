import React from 'react';
import { FaTrash } from 'react-icons/fa';

function Job() {
  return (
    <div className="min-h-screen bg-black text-white px-12 py-8 font-sans">
      {/* Provide Job Heading */}
      <h1 className="text-2xl font-semibold">Provide Job</h1>

      {/* Job Information */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold">Job Information</h2>
        <p className="text-gray-400 mt-2">
          Here you can edit and update public information about all the job posting.
        </p>
      </div>

      {/* Main Content: Form (Left) & Previous Posts (Right) */}
      <div className="flex flex-row mt-8 space-x-8">
        {/* Left Section: Form Container */}
        <div className="bg-[#1E1E1E] p-6 rounded-lg w-2/3">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column: Title, Reward, Category */}
            <div>
              {/* Title */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none"
                />
              </div>

              {/* Reward */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Reward</label>
                <input
                  type="text"
                  className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none"
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Category</label>
                <select className="w-full p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none">
                  <option>Select Category</option>
                </select>
              </div>
            </div>

            {/* Right Column: Description */}
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <input
                  type="text"
                  className="w-full h-[31vh] p-3 bg-[#2C2C2C] rounded-lg border border-gray-700 focus:outline-none"
                />
            </div>
          </div>
        </div>

        {/* Right Section: Previous Posts */}
        <div className="w-1/3">
          <h3 className="text-xl font-bold mb-4">Previous Posts</h3>
          <div className="space-y-4">
            {[1, 2].map((post, index) => (
              <div
                key={index}
                className="bg-[#1E1E1E] p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg font-semibold">
                    Web Developer Needed For Business Project
                  </h4>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-white text-black px-4 py-2 rounded-lg">
                    Edit
                  </button>
                  <button className="text-white text-xl">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
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

export default Job;
