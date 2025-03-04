import React from 'react'
import 'remixicon/fonts/remixicon.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Resume from './components/Resume'
import StudentDetails from './components/StudentDetails'
import Welcome from './components/Welcome'
import Designation from './components/Designation'


function App() {
  return (
    <div>
      <Login/>
      <Signup/>
      <Resume/>
      <StudentDetails/>
      <Welcome/>
      <Designation/>
    </div>
  )
}

export default App
