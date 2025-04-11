import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
import "./Intro_container.css"

const Intro_container = () => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
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
    return () => observer.disconnect()
  }, [])
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
  return (
    <div className='intro_container' ref={containerRef}>
      <div className='intro_container_top'>
        <div className="intro">
          <div className="stat red-bg">
            <div className="stat-icon">&#128101;</div>
            <div className="stat-text">
              <div className="stat-number">
                {isVisible ? <CountUp end={34000} duration={5} separator="," /> : 0}+
              </div>
              <div className="stat-label">Sinh viên nội trú</div>
            </div>
          </div>
          <div className="stat gradient-bg">
            <div className="stat-icon">&#127891;</div>
            <div className="stat-text">
              <div className="stat-number">
                {isVisible ? <CountUp end={1228} duration={5} separator="," /> : 0}
              </div>
              <div className="stat-label">Lượt sinh viên miễn, giảm lệ phí phòng ở</div>
            </div>
          </div>
          <div className="stat blue-bg">
            <div className="stat-icon">&#128716;</div>
            <div className="stat-text">
              <div className="stat-number">
                {isVisible ? <CountUp end={6700} duration={5} separator="," /> : 0}+
              </div>
              <div className="stat-label">Phòng ở</div>
            </div>
          </div>
        </div>
      </div>
      <div className='intro_container_middle_event'>
        
      </div>
      <div className='intro_container_middle_feedback'>

      </div>
      <div className='intro_container_bottom'>
        <p>Đối tác - <span>Khách Hàng</span></p>
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
  )
}

export default Intro_container
