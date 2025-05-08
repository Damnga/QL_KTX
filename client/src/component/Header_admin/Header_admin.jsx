import React from 'react'
import "./Header_admin.css"
import { Link, useNavigate } from 'react-router-dom';
const Header_admin = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("Đăng xuất thành công!");
    navigate('/');
  };
  return (
    <header className="custom-header">
      <div className="breadcrumb">
       <span className="current-page">Dashboard</span>
      </div>
      <div className="header-controls">
        <span className="icon">⚙️</span>
        <span className="icon" onClick={handleLogout}>👤</span>
      </div>
    </header>
  )
}

export default Header_admin