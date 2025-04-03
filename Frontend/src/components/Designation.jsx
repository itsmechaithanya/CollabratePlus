import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoBlack from "../assets/Logowhite.png";
import student from "../assets/student.png";
import faculty from "../assets/faculty.png";
import { AuthContext } from "./auth/Auth-context";
import { message } from "antd";

function Designation() {
  const [designation, setDesignation] = useState(null);
  const auth = useContext(AuthContext);
  const loggedInUser = auth.userId;
  const navigate = useNavigate();

  const [role, setRole] = useState(null);

  const handleDesignationClick = (role, path) => {
    setDesignation(path);
    setRole(role);
  };

  const handleContinue = async () => {
    if (!role) {
      message.error("Please select a designation before continuing.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4444/api/collaborate/user/update/user/byid/${loggedInUser}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update role.");
      }

      message.success("Role updated successfully.");
      navigate(designation);
    } catch (error) {
      console.error("Error updating role:", error);
      message.error("Failed to update role.");
    }
  };

  return (
    <div className="bg-black text-white w-screen h-screen relative">
      <img
        className="absolute top-[3vh] left-[4vh] h-[6vh] z-10"
        src={logoBlack}
        alt="Logo"
      />
      <h1 className="text-[6.9vh] capitalize font-black leading-[8vh] absolute top-[30vh] left-[5vw]">
        Please <br /> select your <br /> designation
      </h1>
      <h1 className="text-[2.3vh] font-light left-[5vw] absolute top-[57vh]">
        Join the Woxsen-exclusive platform <br /> to explore job opportunities.
      </h1>
      <div className="flex flex-row-reverse gap-[2vw] absolute top-[20vh] right-[7vw]">
        <button onClick={() => setDesignation("/studentdetails")}>
          <img src={student} alt="Student" />
        </button>
        <button onClick={() => setDesignation("/higherdetails")}>
          <img src={faculty} alt="Faculty" />
        </button>
      </div>
      {designation && (
        <Link to={designation}>
          <button
            className="px-[2vw] py-[1vh] border rounded-[5vh] bg-white text-black absolute left-[5vw] bottom-[23vh] w-fit"
            onClick={handleContinue}
          >
            Continue <i className="ri-arrow-right-long-line"></i>
          </button>
        </Link>
      )}
    </div>
  );
}

export default Designation;
