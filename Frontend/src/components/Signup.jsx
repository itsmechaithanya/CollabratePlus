import React, { useContext, useState } from "react";
import logoBlack from "../assets/LogoBlack.svg";
import signup from "../assets/Signup.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth/Auth-context";
import { message } from "antd";

function Signup() {
  const navigate = useNavigate();
  // State management
  const auth = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/collaborate/user/create/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed!");
      }

      // Redirect to login page after successful signup
      auth.login(data.userId, data.token, data.email, data.role);
      message.success("Signed up successfully");

      navigate("/welcome");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#EBF2F2] h-screen w-full relative">
      <img
        className=" absolute top-[3vh] left-[4vh] h-[6vh]"
        src={logoBlack}
        alt=""
      />
      <div className="flex h-screen justify-evenly items-center ml-[3vw]">
        <div className="h-[80vh] w-[35vw] bg-white border-[#CECECE] border rounded-[4vh] flex flex-col items-center">
          <h1 className="text-[6.5vh] font-black mt-[7vh]">Sign up</h1>
          <div className="mt-[5vh]">
            <div className="flex gap-2">
              <div>
                <h1>First Name</h1>
                <input
                  type="text"
                  className="bg-[#F6F6F6] w-[9.5vw] mt-[1vh] px-[2vh] h-[5vh]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <h1>Last Name</h1>
                <input
                  type="text"
                  className="bg-[#F6F6F6] w-[9.5vw] mt-[1vh] px-[2vh] h-[5vh]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <h1 className="mt-[3vh]">Woxsen Email ID</h1>
            <input
              type="email"
              className="bg-[#F6F6F6] w-[20vw] mt-[1vh] px-[2vh] h-[5vh]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h1 className="mt-[3vh]">Password</h1>
            <input
              type="password"
              className="bg-[#F6F6F6] w-[20vw] mt-[1vh] px-[2vh] h-[5vh]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mt-[2vh]">{error}</p>}
          <button
            className="px-[2vw] py-[1vh] border rounded-[5vh] mt-[5vh] w-fit"
            onClick={handleSignup}
            disabled={loading}
            style={{ cursor: "pointer" }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <h1 className="mt-[3vh]">
            <span className="text-[#7a7a7a] ">Already have an account?</span>{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/welcome")}
            >
              Log in
            </span>{" "}
          </h1>
        </div>
        <div className="h-[80vh] w-[40vw] bg-red-20">
          <div className="flex flex-col text-center">
            <h1 className="text-[4vh] font-semibold">Collabrate +</h1>
            <h1 className="text-[2.3vh] mt-[5vh] font-light">
              Join the Woxsen-exclusive platform <br /> to explore job
              opportunities.
            </h1>
          </div>
          <img className="mt-[1vh]" src={signup} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
