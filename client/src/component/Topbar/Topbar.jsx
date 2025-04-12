import React from "react";
import "./Topbar.css";
import { Search, Bell } from "lucide-react"; // dùng icon giống mẫu

export default function Header() {
  return (
    <div className="header">
      <div className="breadcrumb">
        <p className="subtext">Application / Dashboard</p>
        <h1 className="title">Dashboard</h1>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="icon-button">
          <Bell size={18} />
        </div>
        <img
          className="avatar"
          src="https://randomuser.me/api/portraits/men/85.jpg"
          alt="User"
        />
      </div>
    </div>
  );
}
