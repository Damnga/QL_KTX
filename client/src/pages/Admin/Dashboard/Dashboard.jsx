import React, {useRef,useState, useEffect} from 'react'
import "./Dashboard.css";
import Header_admin from "../../../component/Header_admin/Header_admin"
import CountUp from 'react-countup';
import { Chart as ChartJS, CategoryScale,LinearScale,PointElement, LineElement,Title,Tooltip,Legend, ArcElement} from 'chart.js';
ChartJS.register( CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend,ArcElement);
import { Line, Pie } from 'react-chartjs-2';
import {getAllSinhVienTong} from "../../../routes/sinhvien";
import {getAllHopDongTong} from "../../../routes/hopdong"
import {getAllPhongTong,getAllPhongTongGiuong} from "../../../routes/phong"
const Dashboard = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
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
      }, []);
        const [tongsinhvien,settongsinhvien] = useState(0);
        const [tonghopdong,settonghopdong]= useState(0);
        const [tongphong,settongphong] = useState(0);
        const [tonggiuong,settonggiuong] = useState(0);
      useEffect(() => {
      const fetchData = async () => {
        try {
          const svRes = await getAllSinhVienTong();
          const hdRes = await getAllHopDongTong();
          const phongRes = await getAllPhongTong();

        settongsinhvien(svRes.tong);
        settonghopdong(hdRes.tong);
        settongphong(phongRes.tong);
        const gRes = await getAllPhongTongGiuong();
        settonggiuong(gRes);

        } catch (error) {
          console.error("Lỗi lấy dữ liệu tổng:", error);
        }
      };
  
      fetchData();
    }, []);
  const lineData = {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        datasets: [
          {
            label: 'Số lượt sinh viên nội trú',
            data: [5000, 7000, 6500, 9000, 8800, 10000],
            fill: true,
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: '#3498db',
            tension: 0.4,
          },
          {
            label: 'Số phòng trống',
            data: [2000, 2500, 2300, 2100, 2200, 2000],
            fill: true,
            backgroundColor: 'rgba(231, 76, 60, 0.2)',
            borderColor: '#e74c3c',
            tension: 0.4,
          },
        ],
  };
  const pieData = {
        labels: ['Phòng 8 người', 'Phòng 4 người'],
        datasets: [
          {
            data: [tonggiuong.Phong4Nguoi, tonggiuong.Phong8Nguoi],
            backgroundColor: ['#3498db', '#e74c3c', '#9b59b6'],
            borderColor: '#fff',
            borderWidth: 2,
          },
        ],
  };   
  const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#333',
              font: {
                size: 14,
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#333',
            },
          },
          y: {
            ticks: {
              color: '#333',
            },
          },
        },
  }; 
  
  return (
    <div className='dashboard'>
        <div className="dashboard_container">
          <div className="dashboard_header">
            <Header_admin />
          </div>
          <div>
           <div className='intro_container' ref={containerRef}>
              <div className='intro_container_top'>
        <div className="intro">
          <div className="stat red-bg">
            <div className="stat-icon">&#128101;</div>
            <div className="stat-text">
              <div className="stat-number">
                {isVisible ? <CountUp end={tongsinhvien} duration={2} separator="," /> : 0}+
              </div>
              <div className="stat-label">Sinh viên đã và đang ở ktx</div>
            </div>
          </div>
          <div className="stat gradient-bg">
            <div className="stat-icon">&#127891;</div>
            <div className="stat-text">
              <div className="stat-number">
                {isVisible ? <CountUp end={tonghopdong} duration={2} separator="," /> : 0}
              </div>
              <div className="stat-label">Sinh viên đang ở ktx</div>
            </div>
          </div>
          <div className="stat blue-bg">
            <div className="stat-icon">&#128716;</div>
            <div className="stat-text">
              <div className="stat-number">
                {isVisible ? <CountUp end={tongphong} duration={2} separator="," /> : 0}+
              </div>
              <div className="stat-label">Phòng ở</div>
            </div>
          </div>
        </div>
              </div>
           </div>
          </div>
          <div className="dashboard_chart">
      <div className="chart-container">
        <div className="chart-box">
          <Line data={lineData} options={options} />
        </div>
        <div className="chart-box-pie">
          <Pie data={pieData} options={options} />
        </div>
      </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard