import React, { Suspense, useContext } from "react";
import Lenis from "lenis";
import "remixicon/fonts/remixicon.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Resume from "./components/Resume";
import StudentDetails from "./components/StudentDetails";
import HigherDetails from "./components/HigherDetails";
import Welcome from "./components/Welcome";
import Designation from "./components/Designation";
import Home from "./components/Home";
// import Chatpage from "./components/chat/Chatpage";
import { useAuth } from "./components/auth/auth-hook";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "./components/auth/Auth-context";
import Dashboard from "./modules/Dashboard";
import Job from "./components/Job";
import Profile from "./components/Profile";
// import ChatProvider from "./components/chat/component/miscellaneous/ChatProvider";

function App() {
  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });
  const auth = useContext(AuthContext);

  // Listen for the scroll event and log the event data
  lenis.on("scroll", (e) => {
    console.log(e);
  });
  const { login, logout, userId, token, email, role } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (role === null) {
      setLoading(false);
    }
  }, [role]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <BeatLoader color="#1890ff" loading={loading} size={15} />
      </div>
    );
  }

  let routes;
  if (role === "Admin") {
    routes = (
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/designation" element={<Designation />} />
        <Route path="/studentdetails" element={<StudentDetails />} />
        <Route path="/higherdetails" element={<HigherDetails />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/chats" element={<Dashboard />} />
        <Route path="/Jobs" element={<Job />} />
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        {/* <Route path="/*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    );
  } else if (role === "Faculty") {
    routes = (
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/designation" element={<Designation />} />
        <Route path="/studentdetails" element={<StudentDetails />} />
        <Route path="/higherdetails" element={<HigherDetails />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/chats" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/Jobs" element={<Job />} />
        <Route path="/Profile" element={<Profile />} />
        {/* <Route path="/*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    );
  } else if (role === "Student") {
    routes = (
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/designation" element={<Designation />} />
        <Route path="/studentdetails" element={<StudentDetails />} />
        <Route path="/higherdetails" element={<HigherDetails />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/chats" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/Jobs" element={<Job />} />
        <Route path="/Profile" element={<Profile />} />
        {/* <Route path="/*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    );
  } else if (role === "Guest") {
    routes = (
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/designation" element={<Designation />} />
        <Route path="/studentdetails" element={<StudentDetails />} />
        <Route path="/higherdetails" element={<HigherDetails />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/chats" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/Jobs" element={<Job />} />
        <Route path="/Profile" element={<Profile />} />
        {/* <Route path="/*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        {/* <Route path="/chats" element={<Dashboard />} /> */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />
        <Route path="/Jobs" element={<Job />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login: login,
        logout: logout,
        userId: userId,
        token: token,
        email: email,
        role: role,
      }}
    >
      <Router>
        {/* <ChatProvider> */}
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <BeatLoader color="#1890ff" loading={true} size={15} />
            </div>
          }
        >
          <main>{routes}</main>
        </Suspense>
        {/* </ChatProvider> */}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
