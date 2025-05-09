import React from 'react'
import "./Header_admin.css"
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../routes/TaiKhoan';
const Header_admin = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (!confirmLogout) return;
  
    try {
      await logout();
      navigate('/');
    } catch (err) {
      alert(err.message || "Lỗi khi đăng xuất");
      console.error(err);
    }
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