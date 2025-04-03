import React, { useContext, useState } from "react";
import { message, Select } from "antd";
import logoBlack from "../assets/LogoBlack.svg";
import details from "../assets/detailss.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./auth/Auth-context";

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

const handleChange = (value, type) => {
  console.log(`selected ${value} for ${type}`);
};

function Details() {
  const navigate = useNavigate();
  const [designation, setDesignation] = useState("");
  const [fieldOfInterest, setFieldOfInterest] = useState([]);
  const auth = useContext(AuthContext);
  const loggedInUser = auth.userId;
  console.log(loggedInUser);

  const handleChange = (value) => {
    setFieldOfInterest(value);
  };

  const handleContinue = async () => {
    if (!designation || fieldOfInterest.length === 0) {
      message.error("Please fill all fields before continuing!");
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
          body: JSON.stringify({
            fot: fieldOfInterest,
            designation: designation,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        message.success("Profile updated successfully!");
        navigate("/");
      } else {
        message.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };
  return (
    <div className="h-screen w-full relative bg-[#F1FCFF]">
      <img
        className=" absolute top-[3vh] left-[4vh] h-[6vh]"
        src={logoBlack}
        alt=""
      />
      <div className="flex h-screen justify-evenly items-center ml-[3vw]">
        <div className="h-[80vh] w-[35vw] bg-white border-[#CECECE] border rounded-[4vh] flex flex-col items-center">
          <h1 className="text-[6.5vh] font-black mt-[7vh]">Details</h1>
          <div className="mt-[9vh] flex flex-col ">
            <h1 className="">Specify the Designation</h1>
            <input
              type="text"
              className=" border rounded border-[#D9D9D9] w-[20vw] mt-[1vh] px-[2vh] h-[5vh]"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            <h1 className="mt-[3vh] mb-[1vh]">Field of interest</h1>
            <Select
              mode="tags"
              className="bg-[#F6F6F6] w-[20vw] mt-[1vh] px-[2vh] h-[5vh] "
              onChange={handleChange}
              tokenSeparators={[","]}
              options={fieldOfInterestOptions}
            />
          </div>
          <div className="flex gap-[1vw] mt-[15vh]">
            <Link to="/">
              <button className="px-[2vw] py-[1vh] border rounded-[5vh] w-fit">
                Skip
              </button>
            </Link>
            <button
              className="px-[2vw] py-[1vh] border rounded-[5vh] w-fit"
              onClick={handleContinue}
            >
              Continue <i className="ri-arrow-right-long-line"></i>
            </button>
          </div>
        </div>
        <div className="h-[80vh] w-[40vw] bg-red-20">
          <div className="flex flex-col text-center">
            <h1 className="text-[4vh] font-semibold">Collabrate +</h1>
            <h1 className="text-[2.3vh] mt-[5vh] font-light">
              The provided information allows us <br /> to gain a deeper
              understanding of <br /> your profile, enabling us to offer <br />{" "}
              more tailored recommendations and <br /> suggestions.
            </h1>
          </div>
          <img className="mt-[5vh]" src={details} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Details;
