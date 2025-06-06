import React ,{useEffect,useState} from 'react'
import "./Event.css";
import {getAllSuKien} from "../../../routes/sukien";
import {createDangKySuKien,removeDangKySuKien} from "../../../routes/dangkysukien";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify'
const Event = () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  const userAvata = decoded.anh;
  const username = decoded.Username;
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllSuKien();
        setEvents(data); 
      } catch (error) {
        console.error('Lỗi khi tải sự kiện:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event">
      <div className="event-container">
        <div className="container">
      {events.map((event, index) => (
        <div key={index} className="card">
          <img src={`http://localhost:3000/uploads/${event.anh}`} alt={event.TenSK} className="card-img" />
          <div className="card-content">
            <div className="meta">
              <span>{event.Username}</span>
              <span>🕙{new Date(event.TgianBatDau).toLocaleDateString('vi-VN')}-{new Date(event.TgianKetThuc).toLocaleDateString('vi-VN')} </span>
            </div>
            <div className="meta">
              <span className='title'>{event.TenSK}</span>
              <span>👥 {event.SoNguoiThamGia}</span>
            </div>
            <span>{event.NoiDung}</span><br/>
            <button className="btn-sukien">Đăng ký sự kiện</button>
            <div className={`trangthaisukien ${ event.TrangThai?.trim().toLowerCase() === 'sắp diễn ra' ? 'bg-green' : event.TrangThai?.trim().toLowerCase() === 'đã diễn ra' ? 'bg-red' :  event.TrangThai?.trim().toLowerCase() === 'đang diễn ra' ? 'bg-yellow' : 'bg-default'}`}>  {event.TrangThai}</div>    
https://console.cloud.google.com/run/create?inv=1&invt=AbzOhA&project=lunar-parsec-455904-e0
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  )
}

export default Event