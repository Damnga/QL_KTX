import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ setMenu }) => {
  const [activeItem, setActiveItem] = useState('Trang Chủ');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Trang Chủ', path: '/admin/dashboard' },
    { name: 'Quản Lý Phòng Ở', path: '/admin/room_management' },
    { name: 'Quản Lý Sinh Viên', path: '/admin/user_management' },
    { name: 'Thanh Toán Hóa Đơn', path: '/admin/invoice_management' },
    { name: 'Quản Lý Dịch Vụ', path: '/admin/service_management' },
    { name: 'Bài Viết', path: '/admin/post' },
    { name: 'Thông Báo', path: '/admin/notification' },
    { name: 'Sự Kiện', path: '/admin/event' },
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
