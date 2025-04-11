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
        observer.unobserve(footer);
      }
    };
  }, []);

  return (
    <div className={`navbar ${isSticky ? 'sticky' : ''} ${hideNavbar ? 'hide-navbar' : ''}`}>
      <div className="navbar_container">
        <div className="navbar_container_left">
          <img className='image' src="\images\thuonghieuanh.png" alt="" />
        </div>
        <div className="navbar_container_right">
          <p>Trang chủ</p>
          <p>Giới Thiệu</p>
          <p>Tin Tức và Sự Kiện</p>
          <p>Sinh Viên Nội Trú</p>
          <p>Thông Báo</p>
          <p>Liên Hệ</p>
          <p>&#128101;</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
