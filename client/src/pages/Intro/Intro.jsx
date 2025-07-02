import React, { useEffect, useRef, useState} from 'react'
import CountUp from 'react-countup'
import "./Intro.css";
import Navbar from "../../component/Navbar/Navbar";
import Header from "../../component/Header/Header";
import Campus from "../../component/Campus/Campus";
import Footer from "../../component/Footer/Footer";
import Banner from "../../component/Banner/Banner";
import { usePhongContext } from '../../context/PhongContext';
import {getAllSinhVienTong} from "../../routes/sinhvien";
import {getAllHopDongTong} from "../../routes/hopdong"
import {getAllPhongTong} from "../../routes/phong"
import {getAllSuKienDang} from "../../routes/sukien";
const Intro = () => {
  const {t} = usePhongContext();
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false);
  const [tongsinhvien,settongsinhvien] = useState(0);
  const [tonghopdong,settonghopdong]= useState(0);
  const [tongphong,settongphong] = useState(0);
  const [sukiendang,setsukiendang] = useState([]);
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        { threshold: 0.3 }
      )
      if (containerRef.current) {
        observer.observe(containerRef.current)
      }
      return () => observer.disconnect();
    }, [])
    useEffect(() => {
    const fetchData = async () => {
      try {
        const svRes = await getAllSinhVienTong();
        const hdRes = await getAllHopDongTong();
        const phongRes = await getAllPhongTong();
        const sukienRes = await getAllSuKienDang();
      settongsinhvien(svRes.tong);
      settonghopdong(hdRes.tong);
      settongphong(phongRes.tong);
      setsukiendang(sukienRes);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu tổng:", error);
      }
    };

    fetchData();
  }, []);
    const images = [
      '/images/daihocmo.jpg',
      '/images/hienmau.png',
      '/images/hust.jpg',
      '/images/ne.png',
      '/images/tinhnguyen.png',
      '/images/vietcombank.jpg',
      '/images/vnpt.png',
    ];
    const VISIBLE_COUNT = 5; 
    const [index, setIndex] = useState(0);
    const trackRef = useRef(null);
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 2000);
      return () => clearInterval(interval);
    }, []);
    useEffect(() => {
      const totalSlides = images.length;
      if (index === totalSlides) {
        const timer = setTimeout(() => {
          trackRef.current.style.transition = 'none';
          setIndex(0);
        }, 500);
        return () => clearTimeout(timer);
      } else {
        trackRef.current.style.transition = 'transform 0.5s ease-in-out';
      }
    }, [index]);
    const extendedImages = [...images, ...images.slice(0, VISIBLE_COUNT)];
    const events = [
      {
        title: "MỘT GIỌT MÁU CHO ĐI – MỘT CUỘC ĐỜI Ở LẠI",
        image: "/images/474583910_1148579086946008_4267450757254689391_n.jpg",
        date: "Ngày 15/4/2025 lúc 7h30",
        featured: true
      },
      {
        title: "Tết Nguyên Đán 2025",
        image: "/images/475039185_1309335597050601_8967450302315086730_n.jpg",
        date: "Thời gian diễn ra: 29/01/2025 00:00",
        end: "Thời gian kết thúc: 29/01/2025 00:00"
      },
      {
        title: "Ngày hội tân sinh viên – School Fest 2024, gieo ước mơ và hy vọng",
        image: "/images/476444987_1165822995182538_7199050514080497043_n.jpg",
        date: "Thời gian diễn ra: 25/05/2024 00:00"
      },
      {
        title: "Khai mạc hội thao sinh viên Ký túc xá ĐHQG-HCM năm 2024",
        image: "/images/480435957_1323564835627677_5511256452827407773_n.jpg",
        date: "Thời gian diễn ra: 19/05/2024 00:00"
      },
      {
        title: "Khai mạc hội thao sinh viên Ký túc xá ĐHQG-HCM năm 2024",
        image: "/images/480435957_1323564835627677_5511256452827407773_n.jpg",
        date: "Thời gian diễn ra: 19/05/2024 00:00"
      }
    ];
  return (
    <div>
      <Header />
      <Navbar />
      <Banner />
      <div className='intro_container' ref={containerRef}>
      <div className='intro_container_top'>
        <div className="intro">
          <div className="stat red-bg">
            <div className="stat-icon">&#128101;</div>
            <div className="stat-text">
              <div className="stat-number">
                {isVisible ? <CountUp end={tongsinhvien} duration={5} separator="," /> : 0}
              </div>
              <div className="stat-label">{t('internal student')}</div>
            </div>
          </div>
          <div className="stat gradient-bg">
            <div className="stat-icon">&#127891;</div>
            <div className="stat-text">
              <div className="stat-number">
                {isVisible ? <CountUp end={tonghopdong} duration={5} separator="," /> : 0}
              </div>
              <div className="stat-label">{t('Students exempt and reduce room fees')}</div>
            </div>
          </div>
          <div className="stat blue-bg">
            <div className="stat-icon">&#128716;</div>
            <div className="stat-text">
              <div className="stat-number">
                {isVisible ? <CountUp end={tongphong} duration={5} separator="," /> : 0}
              </div>
              <div className="stat-label">{t('room')}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='intro_container_middle_event'>
      <div className="event-section">
      <h2 className="event-title">
        {t('event')}<span> {t('upcoming')}</span>
      </h2>
      <div className="event-content">
  {sukiendang.length > 0 ? (
    <>
      <div className="event-left">
        <img
          src={`http://localhost:3000/uploads/${sukiendang[0].anh}`}
          alt={sukiendang[0].TenSK || "featured"}
        />
        <h3>{sukiendang[0].TenSK}</h3>
        <p>{sukiendang[0].NoiDun}</p>
        <p className="event-date">
          Thời gian diễn ra:{" "}
          <span>
            {new Date(sukiendang[0].TgianBatDau).toLocaleDateString()} - {new Date(sukiendang[0].TgianKetThuc).toLocaleDateString()}
          </span>
        </p>
      </div>

      <div className="event-right">
        {sukiendang.slice(1).map((e, i) => (
          <div key={i} className="event-item">
            <img
              src={`http://localhost:3000/uploads/${e.anh}`}
              alt={e.TenSK || `Sự kiện ${i + 2}`}
            />
            <div className="event-info">
              <h4>{e.TenSK}</h4>
              <p>{e.NoiDung}</p>
              <p className="event-date">{new Date(sukiendang[0].TgianBatDau).toLocaleDateString()}</p>
              {e.TgianKetThuc && (
                <p className="event-date">{new Date(sukiendang[0].TgianKetThuc).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="event-empty">
      <p>Không có sự kiện nào đang diễn ra</p>
    </div>
  )}
</div>
    </div>
      </div>
      <div className='intro_container_bottom'>
        <p>{t('partners')} - <span>{t('customer')}</span></p>
        <div className="slider-loop-container">
          <div className="slider-loop-track" ref={trackRef} style={{transform: `translateX(-${(100 / VISIBLE_COUNT) * index}%)`,}} >
            {extendedImages.map((img, i) => (
              <div className="slider-loop-item" key={i}>
              <img src={img} alt={`img-${i}`} />
            </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <Campus/>
      <Footer/>
    </div>
  )
}

export default Intro
