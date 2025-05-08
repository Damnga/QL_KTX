import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ setMenu }) => {
  const [activeItem, setActiveItem] = useState('Trang Chủ');
  const navigate = useNavigate();
  useEffect(() => {
    const current = menuItems.find(item => item.path === location.pathname);
    if (current) {
      setActiveItem(current.name);
    }
  }, [location.pathname]);
  const menuItems = [
    { name: 'Tổng quan hệ thống', path: '/admin/dashboard' },
    { name: 'Quản Lý Phòng ', path: '/admin/room_management' },
    { name: 'Quản Lý Sinh Viên', path: '/admin/user_management' },
    { name: 'Quản Lý Hóa Đơn', path: '/admin/bill_management' },
    { name: 'Quản Lý Dịch Vụ', path: '/admin/service_management' },
    { name: 'Quản Lý Tài Khoản', path: '/admin/account_management' },
    { name: 'Quản Lý Sự Kiện & Bài Viết', path: '/admin/post' },
    { name: 'Tin Nhắn & Thông Báo', path: '/admin/notification' },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.name);
    navigate(item.path);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img src="/images/logo-Photoroom.png" alt="Logo" />
      </div>
      <hr />
      <div className="sidebar-bottom">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activeItem === item.name ? 'active' : ''}
              onClick={() => handleItemClick(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
