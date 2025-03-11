import React, { useContext, useState } from "react";
import logoBlack from "../assets/LogoBlack.svg";
import login from "../assets/login.png";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { AuthContext } from "./auth/Auth-context";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/collaborate/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed!");
      }

      // Store token & navigate to home
      auth.login(data.userId, data.token, data.email, data.role);
      message.success("Logged in successfully");
      navigate("/welcome");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F2F2F2] h-screen w-full relative">
      <img
        className=" absolute top-[3vh] left-[4vh] h-[6vh]"
        src={logoBlack}
        alt=""
      />
      <div className="flex h-screen justify-evenly items-center ml-[3vw]">
        <div className="h-[80vh] w-[35vw] bg-white border-[#CECECE] border rounded-[4vh] flex flex-col items-center">
          <h1 className="text-[6.5vh] font-black mt-[7vh]">Log in</h1>
          <div className="mt-[9vh]">
            <h1>Username / Email</h1>
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

          <h1 className="text-[#7a7a7a] ml-[11vw] mt-[1vh] text-[1.8vh]">
            Forgot Password?
          </h1>
          <button
            className="px-[2vw] py-[1vh] border rounded-[5vh] mt-[7vh] w-fit"
            onClick={handleLogin}
            disabled={loading}
            style={{ cursor: "pointer" }}
          >
            {loading ? "Logging in..." : "Continue"}{" "}
            <i className="ri-arrow-right-long-line"></i>
          </button>
          <h1 className="mt-[3vh]">
            <span className="text-[#7a7a7a] ">Don't have an account? </span>{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
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
          <img className="mt-[1vh]" src={login} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
