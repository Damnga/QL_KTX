import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Intro from './pages/Intro/Intro';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Admin from './layout/Admin';
import User from './layout/User';
import AccountManagment from "./pages/Admin/AccountManagment/AccountManagment";
import BillManagment from "./pages/Admin/BillManagment/BillManagment"
import EventPost from "./pages/Admin/EventPost/EventPost"
import Notification from "./pages/Admin/Notification/Notification"
import RoomManagment from "./pages/Admin/RoomManagment/RoomManagment"
import ServiceManagment from "./pages/Admin/ServiceManagment/ServiceManagment";
import UserManagment from "./pages/Admin/UserManagment/UserManagment";
import Home from "./pages/User/Home/Home";
import LakeProfile from "./pages/User/LakeProfile/LakeProfile";
import Message from "./pages/User/Message/Message";
import Noti from "./pages/User/Noti/Noti";
import LookupInfo from "./pages/LookupInfo/LookupInfo"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/LookupInfo" element={<LookupInfo/>} />
        <Route element={<Admin />}>
          <Route path="/admin/dashboard" element={<Dashboard/>} />
          <Route path="/admin/account_management" element={<AccountManagment/>} />
          <Route path="/admin/bill_management" element={<BillManagment/>} />
          <Route path="/admin/post" element={<EventPost/>} />
          <Route path="/admin/notification" element={<Notification/>} />
          <Route path="/admin/room_management" element={<RoomManagment/>} />
          <Route path="/admin/service_management" element={<ServiceManagment/>} />
          <Route path="/admin/user_management" element={<UserManagment/>} />
        </Route>
        <Route element={<User/>}>
          <Route path="/user/home" element={<Home/>} />
          <Route path="/user/profile" element={<LakeProfile/>} />
          <Route path="/user/message" element={<Message/>} />
          <Route path="/user/notification" element={<Noti/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App

