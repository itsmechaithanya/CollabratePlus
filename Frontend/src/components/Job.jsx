import React from "react";
import { FaTrash } from "react-icons/fa";
import { Input, DatePicker, Select } from "antd";
import "./job.css";

const { TextArea } = Input;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};

const fieldOfInterestOptions = [];
fieldOfInterestOptions.push({
  value: "Programming And Tech",
  label: "Programming And Tech",
});
fieldOfInterestOptions.push({
  value: "Research And Content Writer",
  label: "Research And Content Writer",
});
fieldOfInterestOptions.push({
  value: "Graphic And Design",
  label: "Graphic And Design",
});
fieldOfInterestOptions.push({
  value: "Video And Animation",
  label: "Video And Animation",
});
fieldOfInterestOptions.push({
  value: "Assignments And Other",
  label: "Assignments And Other",
});

function Job() {
  return (
    <div className="h-screen bg-black text-white px-12 py-8 font-sans">
      <div className="flex items-center gap-[2vw]">
        <i
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
          class="ri-arrow-left-line text-black bg-white text-xl font-bold px-[1vh] py-[.5vh] rounded-full"
        ></i>
        <h1 className="text-2xl font-semibold">Provide Job</h1>
      </div>
      <div className="mt-8">
        <h2 className="text-[6vh] font-bold">Job Information</h2>
        <p className="text-gray-400 mt-2">
          Here you can edit and update public information about <br /> all the
          job posting.
        </p>
      </div>
      <div className="flex flex-row mt-8 space-x-8">
        <div className="bg-[#131313]  h-[55vh] px-[5vw] flex items-center justify-center rounded-lg w-[60vw]">
          <div className="grid grid-cols-2 gap-6 w-full h-fit">
            <div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  className="w-full p-2 bg-black rounded-lg border border-gray-700 focus:outline-none px-[1vw]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Reward</label>
                <input
                  type="text"
                  className="w-full p-2 bg-black rounded-lg border border-gray-700 focus:outline-none px-[1vw]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Category</label>
                <Select
                  mode="tags"
                  className="bg-[#131313] w-[20vw] mt-[1vh] px-[2vh] h-[5vh] "
                  onChange={(value) => handleChange(value, "fot")}
                  style={{ backgroundColor: "black", color: "white" }}
                  tokenSeparators={[","]}
                  options={fieldOfInterestOptions}
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <TextArea
                showCount
                className="dateee"
                maxLength={100}
                onChange={onChange}
                placeholder="disable resize"
                style={{
                  height: 120,
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "#374151",
                  resize: "none",
                }}
              />
              <label className="block mb-1 font-medium mt-[3vh]">Date</label>
              <DatePicker
                onChange={onChange}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "#374151",
                }}
              />
            </div>
          </div>
        </div>
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
      <div className="mt-8 flex gap-[1vw] justify-end absolute bottom-[12vh] right-[10vw]">
        <button className="bg-white text-black px-6 py-3 rounded-full font-medium">
          Save
        </button>
        <button className="bg-white text-black px-6 py-3 rounded-full font-medium">
          Get recommendations
        </button>
      </div>
    </div>
  );
}

export default Job;
