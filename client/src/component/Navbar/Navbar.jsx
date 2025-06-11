
import React, { useEffect, useState, useRef } from 'react';
import "./Navbar.css";
import {Link} from 'react-router-dom';
import { usePhongContext } from '../../context/PhongContext';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const observerRef = useRef(null);
  const {t} = usePhongContext();
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
          <Link to="/"><img className='image' src="/images/thuonghieuanh.png" alt="logo" /></Link>
        </div>
        <ul className="navbar_container_right">
          <li><Link to ="/"><a href="#">{t('dashboard')}</a></Link></li>
          <li className="dropdown">
            <a href="#">{t('introduce')} ▾</a>
            <ul className="dropdown_menu">
              <li className="submenu">
                <a href="#">{t('general introduce')} ▸</a>
                <ul className="dropdown_submenu">
                  <li><a href="#">{t('general information about dormitory')}</a></li>
                  <li><a href="#">{t('vision - mission')}</a></li>
                  <li><a href="#">{t('brand identity kit')}</a></li>
                  <li><a href="#">{t('traditional song')}</a></li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#">{t('nest structure')} ▸</a>
                <ul className="dropdown_submenu">
                  <li><a href="#">{t('management council')}</a></li>
                  <li><a href="#">{t('board of directors')}</a></li>
                  <li><a href="#">{t('rooms on duty')}</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">{t('news and events')} ▾</a>
            <ul className="dropdown_menu">
              <li className="submenu"><a href="#">{t('important news')}</a></li>
              <li className="submenu"><a href="#">{t('news - events')}</a></li>
              <li className="submenu"><a href="#">{t('group activities')}</a></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">{t('internal student')}▾</a>
            <ul className="dropdown_menu">
              <li className="submenu"><a href="#">{t('forms')}</a></li>
              <li className="submenu"><a href="#">{t('instruction information')}</a></li>
              <li className="submenu"><a href="#">{t('frequently asked questions')}</a></li>
              <li className="submenu"><a href="#">{t('inpatient registration')}</a></li>
              <li className="submenu"><a href="#">{t('regulations')}</a></li>
            </ul>
          </li>
          <li><a href="#">{t('contact us')}</a></li>
          <li><Link to="/login"><a href="">&#128101;</a></Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
