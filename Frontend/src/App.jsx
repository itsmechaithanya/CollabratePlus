import React, { Suspense } from "react";
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
import Chatpage from "./components/chat/Chatpage";
import { useAuth } from "./components/auth/auth-hook";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "./components/auth/Auth-context";
import ChatProvider from "./components/chat/component/miscellaneous/ChatProvider";

function App() {
  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });

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
        <Route path="/chats" element={<Chatpage />} />
        <Route path="/" element={<Home />} />
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
        <Route path="/chats" element={<Chatpage />} />
        <Route path="/" element={<Home />} />
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
        <Route path="/chats" element={<Chatpage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/designation" element={<Designation />} />
        <Route path="/studentdetails" element={<StudentDetails />} />
        <Route path="/higherdetails" element={<HigherDetails />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />
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
      {/* <ChatProvider> */}
      <Router>
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
      </Router>
      {/* </ChatProvider> */}
    </AuthContext.Provider>
  );
}

export default App;
