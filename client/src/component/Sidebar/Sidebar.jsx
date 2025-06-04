import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { usePhongContext } from '../../context/PhongContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setBreadcrumb } = usePhongContext();

  const [activeItem, setActiveItem] = useState('');
  const [activeParent, setActiveParent] = useState('');
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    { name: '🏫Tổng quan hệ thống', path: '/admin/dashboard' },
    {
      name: '🏠Quản Lý Phòng',
      children: [
        { name: '🏢Danh sách phòng', path: '/admin/room_management' },
        { name: '🏚️Tòa Nhà', path: '/admin/building_management' },
        { name: '🚪Loại Phòng', path: '/admin/room_type_management' },
        { name: '🛠️Bảo Trì', path: '/admin/maintenance_management' },
      ],
    },
    { name: '👥Quản Lý Sinh Viên',
      children: [
        { name: '	🧑‍🤝‍🧑Danh sách sinh viên', path: '/admin/user_management' },
        { name: '🚶‍♂️Sinh viên đăng ký mới ', path: '/admin/account_management'},
      ],
    },
    { name: '📄Quản Lý Hóa Đơn', path: '/admin/bill_management' },
    { name: '💵Quản Lý Dịch Vụ', path: '/admin/service_management' },
    {
      name: ' 📅Quản Lý Sự Kiện & Bài Viết',
      children: [
        { name: '🗓️Sự Kiện', path: '/admin/event' },
        { name: '	✍️Bài Viết', path: '/admin/post' },
      ],
    },
    { 
      name: '📬Tin Nhắn & Thông Báo',
      children: [
        { name: '💬Tin Nhắn',path: '/admin/message'  },
        { name: '📢Thông Báo', path: '/admin/notification' },
      ],
    },
    { name: '✉️Hòm Thư Góp Ý', path: '/admin/support' },

  ];

  useEffect(() => {
    const findActivePath = (items, parentName = '') => {
      for (let item of items) {
        if (item.path === location.pathname) {
          setActiveItem(item.name);
          setActiveParent(parentName);
          if (parentName) {
            setExpandedMenu(null);
            setBreadcrumb(`${parentName} / ${item.name}`);
          } else {
            setBreadcrumb(item.name);
          }
          return true;
        }
        if (item.children) {
          const found = findActivePath(item.children, item.name);
          if (found) return true;
        }
      }
      return false;
    };
    findActivePath(menuItems);
  }, [location.pathname]);

  const handleParentClick = (item) => {
    if (item.children) {
      setExpandedMenu(prev => (prev === item.name ? null : item.name));
      setActiveParent(item.name);
    } else {
      setActiveItem(item.name);
      setActiveParent('');
      setBreadcrumb(item.name);
      navigate(item.path);
    }
  };

  const handleChildClick = (subItem, parentItem) => {
    setActiveItem(subItem.name);
    setActiveParent(parentItem.name);
    setExpandedMenu(null); // Ẩn menu con sau khi chọn
    setBreadcrumb(`${parentItem.name} / ${subItem.name}`);
    navigate(subItem.path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img src="/images/logo-Photoroom.png" alt="Logo" />
      </div>
      <hr />
      <div className="sidebar-bottom">
        <ul>
          {menuItems.map((item) => {
            const isParentActive =
              activeParent === item.name ||
              activeItem === item.name;

            return (
              <React.Fragment key={item.name}>
                <li
                  className={`menu-item ${isParentActive ? 'active' : ''}`}
                  onClick={() => handleParentClick(item)}
                >
                  {item.name}
                </li>
                {item.children && expandedMenu === item.name && (
                  <ul className="submenu">
                    {item.children.map((subItem) => (
                      <li
                        key={subItem.name}
                        className={`submenu-item ${activeItem === subItem.name ? 'active' : ''}`}
                        onClick={() => handleChildClick(subItem, item)}
                      >
                        {subItem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
