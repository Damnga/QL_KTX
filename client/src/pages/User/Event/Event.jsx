import React ,{useEffect,useState} from 'react'
import "./Event.css";
import {getAllSuKien} from "../../../routes/sukien";
import {createDangKySuKien,removeDangKySuKien,getAllDangKySuKien } from "../../../routes/dangkysukien";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
const Event = () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  const [events, setEvents] = useState([]);
  const [registeredList, setRegisteredList] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllSuKien();
        setEvents(data); 
         const regList = await getAllDangKySuKien();
      setRegisteredList(regList);
      } catch (error) {
        console.error('Lỗi khi tải sự kiện:', error);
      }
    };

    fetchEvents();
  }, [token]);
const handleDangKySuKien = async (eventId, trangThai) => {
  try {
    if (trangThai?.trim().toLowerCase() === 'đã diễn ra') {
      toast.error('Sự kiện đã kết thúc, không thể đăng ký!');
      return;
    }

    const isRegistered = registeredList.find(dk => dk.MaSK === eventId && dk.MaSV === userId);

    if (isRegistered) {
      await removeDangKySuKien(isRegistered.id); 
      toast.success('Hủy đăng ký sự kiện thành công');
    } else {
      await createDangKySuKien({
        MaSV: userId,
        MaSK: eventId,
        Tgian: new Date().toISOString()
      });
      toast.success('Đăng ký sự kiện thành công');
    }

    const updatedEvents = await getAllSuKien();
    const updatedList = await getAllDangKySuKien();
    setEvents(updatedEvents);
    setRegisteredList(updatedList);
  } catch (err) {
    toast.error('Lỗi khi xử lý đăng ký sự kiện!');
    console.error(err);
  }
};

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
            <button
  className={`
    btn-sukien 
    ${registeredList.find(dk => dk.MaSK === event.id && dk.MaSV === userId) ? 'btn-huy' : ''}
    ${event.TrangThai?.trim().toLowerCase() === 'đã diễn ra' ? 'btn-disabled' : ''}
  `}
  disabled={event.TrangThai?.trim().toLowerCase() === 'đã diễn ra'}
  onClick={() => handleDangKySuKien(event.id, event.TrangThai)}
>
  {event.TrangThai?.trim().toLowerCase() === 'đã diễn ra'
    ? 'Đã kết thúc'
    : registeredList.find(dk => dk.MaSK === event.id && dk.MaSV === userId)
      ? 'Hủy đăng ký'
      : 'Đăng ký sự kiện'}
</button>
            <div className={`trangthaisukien ${ event.TrangThai?.trim().toLowerCase() === 'sắp diễn ra' ? 'bg-green' : event.TrangThai?.trim().toLowerCase() === 'đã diễn ra' ? 'bg-red' :  event.TrangThai?.trim().toLowerCase() === 'đang diễn ra' ? 'bg-yellow' : 'bg-default'}`}>  {event.TrangThai}</div>    
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  )
}

export default Event