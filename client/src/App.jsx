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
import RoomManagment from "./pages/Admin/RoomManagment/RoomManagment"
import ServiceManagment from "./pages/Admin/ServiceManagment/ServiceManagment";
import UserManagment from "./pages/Admin/UserManagment/UserManagment";
import Home from "./pages/User/Home/Home";
import LakeProfile from "./pages/User/LakeProfile/LakeProfile";
import Message from "./pages/User/Message/Message";
import Noti from "./pages/User/Noti/Noti";
import LookupInfo from "./pages/LookupInfo/LookupInfo";
import ToaNha from "./pages/Admin/RoomManagment/toanha";
import LoaiPhong from "./pages/Admin/RoomManagment/loaiphongtab";
import BaoTri from "./pages/Admin/RoomManagment/baotritab";
import Event from "./pages/Admin/EventPost/Eventtab";
import Event_user from "./pages/User/Event/Event";
import Post from "./pages/Admin/EventPost/Posttab";
import Message_Admin from './pages/Admin/Message/Message';
import Support from "./pages/Admin/SupportManagement/SupportManagement";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from './pages/Admin/Notification/Notification';
import ChatWidget from './component/ChatWidget/ChatWidget';
import Chatbot from './component/Chatbot/Chatbot';
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
          <Route path="/admin/event" element={<Event/>} />
          <Route path="/admin/post" element={<Post/>} />
          <Route path="/admin/notification" element={<Notification/>} />
          <Route path="/admin/room_management" element={<RoomManagment/>} />
          <Route path="/admin/building_management" element={<ToaNha/>} />
          <Route path="/admin/room_type_management" element={<LoaiPhong/>} />
          <Route path="/admin/maintenance_management" element={<BaoTri/>} />
          <Route path="/admin/service_management" element={<ServiceManagment/>} />
          <Route path="/admin/user_management" element={<UserManagment/>} />
          <Route path="/admin/message" element={<Message_Admin/>} />
          <Route path="/admin/notification" element={<Notification/>} />
          <Route path="/admin/support" element={<Support/>} />
        </Route>
        <Route element={<User/>}>
          <Route path="/user/home" element={<Home/>} />
          <Route path="/user/profile" element={<LakeProfile/>} />
          <Route path="/user/message" element={<Message/>} />
          <Route path="/user/notification" element={<Noti/>} />
          <Route path="/user/event" element={<Event_user/>} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={1000} />
      {/* <ChatWidget/> */}
      <Chatbot/>
    </>
  )
}
export default App

