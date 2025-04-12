import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../component/Sidebar/Sidebar';
import Dashboard from '../pages/Dashboard/Dashboard';
const Admin = () => {
  return (
    <div>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Admin