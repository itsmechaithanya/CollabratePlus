import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Input, DatePicker, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { AuthContext } from "./auth/Auth-context";
import { useNavigate } from "react-router-dom";
const props = {
  action: "//jsonplaceholder.typicode.com/posts/",
  listType: "picture",
  previewFile(file) {
    console.log("Your upload file:", file);
    // Your process logic. Here we just mock to the same file
    return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
      method: "POST",
      body: file,
    })
      .then((res) => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};

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
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [file, setFile] = useState(null);
  const [projects, setProjects] = useState([]); // Store fetched projects

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:4444/api/collaborate/project/get/all/projects"
        );
        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects); // Assuming API returns { projects: [...] }
        } else {
          console.error("Error fetching projects");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array means it runs only once when the component mounts

  const handleFileChange = (info) => {
    setFile(info.file.originFileObj);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("createdBy", auth.userId); // Replace with dynamic userId
    formData.append("reward", reward);
    formData.append("deadline", deadline);
    formData.append("category", category);
    if (file) formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:4444/api/collaborate/project/create/project",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Job created successfully!");
        message.success("JD Created Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        console.error("Error creating job");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 bg-black rounded-lg border border-gray-700 focus:outline-none px-[1vw]"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Reward</label>
                <select
                  type="text"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  className="w-full p-2 bg-black rounded-lg border border-gray-700 focus:outline-none"
                >
                  <option>None</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Certificate">Certificate</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-black rounded-lg border border-gray-700 focus:outline-none"
                >
                  <option>None</option>
                  <option value="Programming And Tech">
                    Programming and Tech
                  </option>
                  <option value="Research And Content Writer">
                    Research and Content Writer.
                  </option>
                  <option value="Graphic And Design">
                    Graphic and Design.
                  </option>
                  <option value="Video And Animation">
                    Video and Animation
                  </option>
                  <option value="Assignments And Other">
                    Assignments and Other
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <TextArea
                showCount
                maxLength={100}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="disable resize"
                style={{
                  height: 120,
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "#374151",
                  resize: "none",
                }}
              />
              <label className="block mb-1 font-medium mt-[5vh]">Date</label>
              <DatePicker
                onChange={(date, dateString) => setDeadline(dateString)}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderColor: "#374151",
                }}
              />
              <Upload beforeUpload={() => false} onChange={handleFileChange}>
                <Button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "#374151",
                    marginLeft: "1vw",
                  }}
                  icon={<UploadOutlined />}
                >
                  Upload
                </Button>
              </Upload>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <h3 className="text-xl font-bold mb-4">Previous Posts</h3>
          <div className="space-y-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-[#1E1E1E] p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-semibold">{project.title}</h4>
                    <p className="text-gray-400 text-sm">{project.category}</p>
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
              ))
            ) : (
              <p className="text-gray-500">No job posts found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-[1vw] justify-end absolute bottom-[12vh] right-[10vw]">
        <button
          className="bg-white text-black px-6 py-3 rounded-full font-medium"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-white text-black px-6 py-3 rounded-full font-medium"
          onClick={() =>
            window.open(
              "https://jd-matching-79vrz6k2jcfjhtpbbxm3jp.streamlit.app/",
              "_blank" // Opens in new tab
            )
          }
        >
          Get recommendations
        </button>
      </div>
    </div>
  );
}

export default Job;
