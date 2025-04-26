import React, { useContext, useEffect, useState } from "react";
import logoBlack from "../assets/Logowhite.png";
import search from "../assets/search.png";
import Group1 from "../assets/Group1.png";
import Group2 from "../assets/Group2.png";
import Group3 from "../assets/Group3.png";
import Group6 from "../assets/Group6.png";
import Group7 from "../assets/Group7.png";
import me from "../assets/me.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./auth/Auth-context";

function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const auth = useContext(AuthContext);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:4444/api/collaborate/project/get/all/projects"
        );
        const data = await response.json();

        // Filter out projects where auth.userId is already in the applications array
        const filteredProjects = data.projects.filter(
          (project) => !project.applications.includes(auth.userId)
        );

        setProjects(filteredProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [auth.userId]); // Re-run effect when userId changes

  return (
    <div className="bg-black text-white h-fit w-full overflow-hidden">
      <div className="fixed z-10 flex items-center justify-between backdrop-blur-sm bg-[#00000053] w-[98vw] px-[5vw] h-[10vh] rounded-[2vh] mt-[2vh] ml-[1vw]">
        <img className="h-[6vh] z-10" src={logoBlack} alt="" />
        <div className="flex gap-[2vw] items-center">
          <h1 onClick={() => navigate("/chats")} style={{ cursor: "pointer" }}>
            Chats
          </h1>
          <h1 onClick={() => navigate("/Jobs")} style={{ cursor: "pointer" }}>
            Provide Job
          </h1>
          <div
            onClick={() => navigate("/Profile")}
            style={{ cursor: "pointer" }}
            className="h-[5vh] w-[5vh] bg-zinc-300 rounded-full"
          >
            <img src={me} alt="" />
          </div>
        </div>
      </div>
      <div className="flex justify-center text-center items-center h-fit">
        <h1 className=" text-[6vh] font-medium pt-[25vh] leading-[9vh]">
          Grow your team with flexible <br /> freelance experts.
        </h1>
      </div>
      <div className="flex justify-center items-center gap-[.5vw] relative">
        <input
          type="text"
          className="bg-[#2B2B2B] h-[8vh] w-[45vw] rounded-full px-[3vw] mt-[5vh]"
          rela
        />
        <img
          className=" absolute right-[27.5vw] top-[5.5vh]"
          src={search}
          alt=""
        />
      </div>
      <div className="h-[10vh] w-full mt-[20vh] ml-[5vw] mb-[5vh]">
        <h1 className="text-[3.5vh]">
          Make it all happen <br />
          with freelancers.
        </h1>
      </div>
      <div className="flex overflow-auto pl-[5vw] gap-[1.5vw] scrollbar-hide">
        <img className="h-[75vh]" src={Group1} alt="" />
        <img className="h-[75vh]" src={Group2} alt="" />
        <img className="h-[75vh]" src={Group3} alt="" />
        <img className="h-[75vh]" src={Group6} alt="" />
        <img className="h-[75vh]" src={Group7} alt="" />
      </div>
      <div className="h-[7vh] w-full mt-[15vh] ml-[5vw] ">
        <h1 className="text-[3.5vh]">Jobs you might like.</h1>
      </div>
      <div className="ml-[5vw] flex gap-[5vw]">
        <h1 className="text-[3vh] border-b-2">Most recent</h1>
        <Link to="https://resume-matching-hmrfant85g3yugesfsnmyq.streamlit.app/">
          <h1 className="text-[3vh]">Personalised Job</h1>
        </Link>
      </div>
      <div className="w-screen flex flex-col items-center mt-[5vh]">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Link
              to={`/projects/${project.number}`}
              key={project._id}
              className="w-[90vw]"
            >
              <div className="h-[43vh] bg-[#131313] p-[2vw] rounded-[2vh] flex justify-between mb-[5vh]">
                <div className="w-[65vw] h-full flex flex-col justify-between">
                  <div>
                    <h1>{project.category || "Programming And Tech."}</h1>
                    <h1 className="text-[3vh] w-1/3">{project.title}</h1>
                  </div>
                  <p>{project.description.substring(0, 200)}...</p>
                </div>
                <div className="h-[36vh] w-[15vw] bg-[#232323] flex flex-col items-center rounded-[2vh]">
                  <h1 className="mt-[3vh]">{project.reward}</h1>
                  <div className="h-[10vh] w-[10vh] mt-[6vh] bg-zinc-300 rounded-full my-[1vh]">
                    <img src={me} className="w-full h-full" alt="Owner" />
                  </div>
                  <h1 className="text-[2.5vh] mt-[2vh]">
                    {project.createdBy[0]?.name || "Unknown"}
                  </h1>
                  <h1 className="text-[1.5vh]">
                    {project.deadline || "No Deadline"}
                  </h1>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-center text-[2vh] text-gray-400">
            No projects available.
          </h1>
        )}
      </div>

      <div className="flex justify-between items-center px-[8vh]">
        <div className=" h-[60vh] w-full flex justify-between items-center">
          <div className="">
            <h1 className="text-[#A3A3A3] text-[3vh] ml-[.5vw]">
              Collabrate +
            </h1>
            <h1 className=" capitalize text-[7vh] font-semibold leading-[8.3vh] mt-[1vh]">
              good things <br /> will happen <br /> when you say <br /> “hello!”
            </h1>
          </div>
        </div>
        <div className=" h-[60vh] flex flex-col justify-between py-[15vh] pr-[5vw]">
          <div className=" text-[4vh] text-[#A3A3A3]">
            <h1>
              We would love to <br /> connect on LinkedIn
            </h1>
          </div>
          <div>
            <h1 className="text-[#A3A3A3]">Designed and developed by</h1>
            <div className="flex text-[#A3A3A3] gap-[2vw] text-[3vh] mt-[2vh]">
              <div className="">
                <h1>
                  <i className="ri-arrow-right-up-line text-white"></i>
                  Chiathanya
                </h1>
                <h1>
                  <i className="ri-arrow-right-up-line text-white"></i>Vignesh
                </h1>
              </div>
              <div>
                <h1>
                  <i className="ri-arrow-right-up-line text-white"></i>Thanmayi
                </h1>
                <h1>
                  <i className="ri-arrow-right-up-line text-white"></i>Abhiram
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
