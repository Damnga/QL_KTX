import { useEffect, useState } from 'react';
import "./Noti.css";
import { getAllThongBaoData } from "../../../routes/thongbao";
import { jwtDecode } from 'jwt-decode';
import { getByIdTenPhong } from "../../../routes/phong";
import { toast } from 'react-toastify';
const Noti = () => {
  const [ThongBaoListData, setThongBaoListData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [tenPhong, setTenphong] = useState('');
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.MaSV;

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const fetchThongBao = async () => {
      try {
        const phongRes = await getByIdTenPhong(userId);
        const tenPhongValue = Array.isArray(phongRes)
          ? phongRes[0]?.TenPhong
          : phongRes?.TenPhong;
        setTenphong(tenPhongValue || '');
        const datalist = await getAllThongBaoData(token);
        setThongBaoListData(datalist);
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchThongBao();
  }, [token, userId]);
  if (loading) return <p>Đang tải...</p>;

  const danhSachTheoPhong = ThongBaoListData.filter(tb => tb.TenPhong === tenPhong);
  return (
    <div className='noti'>
      <div className="noti-container">
        {danhSachTheoPhong.length === 0 ? (
          <p>Không có thông báo</p>
        ) : (
          danhSachTheoPhong.map((item) => {
            const isExpanded = expanded[item.id];
            return (
              <div className="noti-content" key={item.id}>
                <div className="noti-header">
                  <span className="noti-user">{item.Username}</span>
                  <span className="noti-time">{new Date(item.Tgian).toLocaleDateString('vi-VN')}</span>
                </div>
                <p className={`noti-text ${isExpanded ? "expanded" : "clamped"}`}>
                  {item.NoiDung}
                </p>
                <button className="noti-button" onClick={() => toggleExpand(item.id)}>
                  {isExpanded ? "Ẩn bớt" : "Xem thêm"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
 
export default Noti;
