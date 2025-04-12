import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img src="/images/logo-Photoroom.png" alt="Logo" />
      </div>
      <div className="sidebar-bottom">
        <ul>
          <li className="active">Trang Chủ</li>
          <li>Quản Lý Phòng Ở</li>
          <li>Quản Lý Sinh Viên</li>
          <li>Thanh Toán Hóa Đơn</li>
          <li>Quản Lý Dịch Vụ</li>
          <li>Bài Viết</li>
          <li>Thông Báo</li>
          <li>Sự Kiện</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
