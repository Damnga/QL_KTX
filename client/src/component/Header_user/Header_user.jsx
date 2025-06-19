
import React, { useState } from 'react';
import './Header_user.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header_user = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='header_user'>
      <div className="header_user_container">
        <div className="header_user_left">
          <Link to="/user/home">
            <img className='image' src="/images/thuonghieuanh.png" alt="logo" />
          </Link>
        </div>

        <div className="header_user_right">
          <ul>
            <li><Link className={isActive('/user/home') ? 'active' : ''} to="/user/home">Trang Chủ</Link></li>
            <li><Link className={isActive('/user/notification') ? 'active' : ''} to="/user/notification">Thông Báo</Link></li>
            <li><Link className={isActive('/user/event') ? 'active' : ''} to="/user/event">Sự Kiện</Link></li>
            <li><Link className={isActive('/user/message') ? 'active' : ''} to="/user/message">Tin Nhắn</Link></li>
          </ul>
          <div className="user-icon" onClick={()=> navigate('/user/profile')}> &#128101; </div>
        </div>
      </div>
    </div>
  );
};

export default Header_user;
