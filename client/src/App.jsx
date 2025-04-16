import React,{useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Intro from './pages/Intro/Intro';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './layout/Admin';
import Roommanage from './pages/RoomManage/Roommanage';
import Usermanage from './pages/UserManage/Usermanage';
import ServiceManage from './pages/ServiceManage/Servicemanage';
import InvoiceManage from './pages/InvoiceManage/Invoicemanage';
import Post from './pages/Post/Post';
import Notification from './pages/Notification/Notification';
import Event from './pages/Event/Event';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route element={<Admin />}>
          <Route path="/admin/dashboard" element={<Dashboard/>} />
          <Route path="/admin/room_management" element={<Roommanage/>} />
          <Route path="/admin/user_management" element={<Usermanage/>} />
          <Route path="/admin/invoice_management" element={<InvoiceManage/>} />
          <Route path="/admin/service_management" element={<ServiceManage/>} />
          <Route path="/admin/post" element={<Post/>} />
          <Route path="/admin/notification" element={<Notification/>} />
          <Route path="/admin/event" element={<Event/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App

