import React,{ useEffect, useState } from 'react'
import "./Banner.css";
const Banner = () => {
    const images = [
        '/images/474583910_1148579086946008_4267450757254689391_n.jpg',
        '/images/475039185_1309335597050601_8967450302315086730_n.jpg',
        '/images/476444987_1165822995182538_7199050514080497043_n.jpg',
        '/images/480435957_1323564835627677_5511256452827407773_n.jpg',
        '/images/480597127_1323564828961011_537046530036050068_n.jpg',
        '/images/487131351_642305085317064_832740134057836209_n.jpg'
      ];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrent(prev => (prev + 1) % images.length);
      }, 5000);
  
      return () => clearInterval(timer);
    }, []);
  return (
    <div className="slider-container">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          className={`slider-image ${index === current ? 'active' : ''}`}
          alt={`slide-${index}`}
        />
      ))}
    </div>
  )
}

export default Banner
