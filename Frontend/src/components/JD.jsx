import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "./auth/Auth-context";
import { message } from "antd";

function JD() {
  const { number } = useParams(); // Extract project ID from URL
  const [project, setProject] = useState(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:4444/api/collaborate/project/get/project/bynumber/${number}`
        );
        const data = await response.json();
        setProject(data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [number]);
  const handleApply = async () => {
    if (!auth.userId) {
      alert("Please log in to apply.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4444/api/collaborate/project/apply/${number}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            applications: [auth.userId], // Ensure this is an array
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        message.success("Application submitted successfully!");
        navigate("/");
      } else {
        message.error(result.message || "Failed to apply.");
      }
    } catch (error) {
      console.error("Error applying:", error);
      message.error("An error occurred while applying.");
    }
  };
  if (!project) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="text-white">
      <div className="h-screen w-full bg-[#131313] p-[2vw] flex justify-between">
        <div className="w-[65vw] h-full flex flex-col justify-between">
          <div>
            <h1>{project.category || "Programming And Tech."}</h1>
            <h1 className="text-[3vh] w-1/3">{project.title}</h1>
          </div>
          <div>
            <p>{project.description}</p>
          </div>
        </div>
        <h1
          className="px-[2vw] h-fit py-[1vh] border rounded-full mt-[1vh] bg-white text-black cursor-pointer"
          onClick={handleApply}
        >
          Apply
        </h1>
      </div>
    </div>
  );
}

export default JD;
