import React from 'react';
import './Header_admin.css';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../routes/TaiKhoan';
import { usePhongContext } from "../../context/PhongContext";

const Header_admin = () => {
  const { breadcrumb } = usePhongContext();  // Lấy breadcrumb từ context
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

  // Hiển thị breadcrumb với dấu '/' phân cách các phần tử
  const breadcrumbItems = breadcrumb ? breadcrumb.split(' / ') : [];

  return (
    <header className="custom-header">
      <div className="breadcrumb">
        {breadcrumbItems.map((item, index) => (
          <span key={index} className="breadcrumb-item">
            {item}
            {index < breadcrumbItems.length - 1 && ' / '}
          </span>
        ))}
      </div>
      <div className="header-controls">
        <span className="icon">⚙️</span>
        <span className="icon" onClick={handleLogout}>👤</span>
      </div>
    </header>
  );
};

export default Header_admin;
