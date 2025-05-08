import React, { useState, useRef, useEffect } from 'react';
import './Header_user.css';
import { Link, useNavigate } from 'react-router-dom';

const Header_user = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    alert("Đăng xuất thành công!");
    navigate('/');
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
            <li><Link to="/user/home">Trang Chủ</Link></li>
            <li><Link to="/user/notification">Thông Báo</Link></li>
            <li><Link to="/user/message">Tin Nhắn</Link></li>
          </ul>
          <div className="user-icon" onClick={() => setShowMenu(!showMenu)}>
            &#128101;
            {showMenu && (
              <div className="user-menu" ref={menuRef}>
                <p onClick={() => navigate('/user/profile')}>Thông tin cá nhân</p>
                <p onClick={handleLogout}>Đăng xuất</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header_user;
