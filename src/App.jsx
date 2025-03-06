import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Resume from './components/Resume'
import StudentDetails from './components/StudentDetails'
import HigherDetails from './components/HigherDetails'
import Welcome from './components/Welcome'
import Designation from './components/Designation'
import Home from './components/Home'


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/designation" element={<Designation />} />
            <Route path="/studentdetails" element={<StudentDetails />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/higherdetails" element={<HigherDetails />} />
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  )
}

export default App
