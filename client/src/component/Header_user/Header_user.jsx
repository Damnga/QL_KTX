import React, { useState, useRef, useEffect } from 'react';
import './Header_user.css';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../routes/TaiKhoan';
const Header_user = () => {
  const navigate = useNavigate();
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
            <li><Link to="/user/home">Trang Chủ</Link></li>
            <li><Link to="/user/notification">Thông Báo</Link></li>
            <li><Link to="/user/message">Tin Nhắn</Link></li>
          </ul>
          <div className="user-icon" onClick={()=> navigate('/user/profile')}> &#128101; </div>
        </div>
      </div>
    </div>
  );
};

export default Header_user;
