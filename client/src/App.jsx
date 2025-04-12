import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Intro from './pages/Intro/Intro';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './layout/Admin';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro/>} />
        <Route path="/login" element={<Login/>} />
        <Route element={<Admin/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App

