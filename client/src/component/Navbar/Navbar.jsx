
import React, { useEffect, useState, useRef } from 'react';
import "./Navbar.css";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideNavbar(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
      observerRef.current = observer;
    }
    return () => {
      if (observerRef.current && footer) {
        observerRef.current.unobserve(footer);
      }
    };
  }, []);

  return (
    <div className={`navbar ${isSticky ? 'sticky' : ''} ${hideNavbar ? 'hide-navbar' : ''}`}>
      <div className="navbar_container">
        <div className="navbar_container_left">
          <img className='image' src="/images/thuonghieuanh.png" alt="logo" />
        </div>
        <ul className="navbar_container_right">
          <li><a href="#">Trang chủ</a></li>
          <li className="dropdown">
            <a href="#">Giới Thiệu ▾</a>
            <ul className="dropdown_menu">
              <li className="submenu">
                <a href="#">Giới thiệu chung ▸</a>
                <ul className="dropdown_submenu">
                  <li><a href="#">Thông tin chung về KTX</a></li>
                  <li><a href="#">Tầm nhìn - Sứ mạng</a></li>
                  <li><a href="#">Bộ nhận diện thương hiệu</a></li>
                  <li><a href="#">Bài ca truyền thống</a></li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#">Cơ cấu tổ chức ▸</a>
                <ul className="dropdown_submenu">
                  <li><a href="#">Hội Đồng Quản Lý</a></li>
                  <li><a href="#">Ban Giám Đốc</a></li>
                  <li><a href="#">Các phòng trực thuộc</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">Tin Tức và Sự Kiện ▾</a>
            <ul className="dropdown_menu">
              <li className="submenu"><a href="#">Tin quan trọng</a></li>
              <li className="submenu"><a href="#">Tin tức - sự kiện</a></li>
              <li className="submenu"><a href="#">Hoạt động đoàn thể</a></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">Sinh viên nội trú ▾</a>
            <ul className="dropdown_menu">
              <li className="submenu"><a href="#">Biểu mẫu</a></li>
              <li className="submenu"><a href="#">Thông tin hướng dẫn</a></li>
              <li className="submenu"><a href="#">Câu hỏi thường gặp</a></li>
              <li className="submenu"><a href="#">Đăng kí nội trú</a></li>
              <li className="submenu"><a href="#">Quy chế / Quy định</a></li>
            </ul>
          </li>
          <li><a href="#">Liên hệ</a></li>
          <li><a href="#">&#128101;</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
