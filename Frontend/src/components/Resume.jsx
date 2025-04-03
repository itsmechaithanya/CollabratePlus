import React, { useContext, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import logoBlack from "../assets/LogoBlack.svg";
import details from "../assets/details.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./auth/Auth-context";

const { Dragger } = Upload;

function Resume() {
  const auth = useContext(AuthContext);
  const loggedInUser = auth.userId;
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const uploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      if (!file) {
        message.error("No file selected.");
        return false;
      }
      setFile(file); // Set the file properly
      console.log("File selected:", file); // Debugging
      return false; // Prevent automatic upload
    },
    onChange(info) {
      if (info.file.status === "removed") {
        setFile(null);
      } else {
        setFile(info.file); // Use info.file instead of info.file.originFileObj
        console.log("File updated:", info.file); // Debugging
      }
    },
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("Please upload a resume before continuing.");
      return;
    }

    console.log("Uploading file:", file); // Debugging

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(
        `http://localhost:4444/api/collaborate/user/update/user/byid/${loggedInUser}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Resume upload failed.");
      }

      const result = await response.json();
      console.log("Resume uploaded successfully:", result);
      message.success("Resume uploaded successfully.");
      navigate("/"); // Replace with actual route
    } catch (error) {
      console.error("Error uploading resume:", error);
      message.error("Resume upload failed.");
    }
  };

  return (
    <div className="h-screen w-full relative">
      <img
        className=" absolute top-[3vh] left-[4vh] h-[6vh]"
        src={logoBlack}
        alt=""
      />
      <div className="flex h-screen justify-evenly items-center ml-[3vw]">
        <div className="h-[80vh] w-[35vw] bg-white border-[#CECECE] border rounded-[4vh] flex flex-col items-center relative">
          <h1 className="text-[6.5vh] font-black mt-[7vh]">Details</h1>
          <div className="mt-[9vh]">
            <h1 className="mb-[3vh]">Upload your resume (ATS Format)</h1>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </div>
          <div className="flex gap-[1vw] mt-[7vh] absolute bottom-[10vh]">
            <Link to="/">
              <button className="px-[2vw] py-[1vh] border rounded-[5vh] w-fit">
                Skip
              </button>
            </Link>
            <button
              className="px-[2vw] py-[1vh] border rounded-[5vh] w-fit cursor-pointer"
              onClick={handleUpload} // Call API on Continue click
            >
              Continue <i className="ri-arrow-right-long-line"></i>
            </button>
          </div>
        </div>
        <div className="h-[80vh] w-[40vw] bg-red-20">
          <div className="flex flex-col text-center">
            <h1 className="text-[4vh] font-semibold">Collabrate +</h1>
            <h1 className="text-[2.3vh] mt-[5vh] font-light">
              We recommend uploading your <br /> resume in ATS format, as it is
              widely <br />
              accepted and ensures better <br /> compatibility.
            </h1>
          </div>
          <img className="mt-[5vh]" src={details} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Resume;
