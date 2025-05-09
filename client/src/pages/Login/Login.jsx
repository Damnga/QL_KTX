import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import {login} from "../../routes/TaiKhoan"
const Login = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [isNavigatingToRegister, setIsNavigatingToRegister] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [lookupResult, setLookupResult] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (location.state?.activePanel) {
      setActivePanel(location.state.activePanel);
    }
  }, [location.state]);

  const handleShowLogin = () => {
    setActivePanel('login');
  };

  const handleShowInfo = () => {
    setActivePanel('info');
  };

  const handleGoBack = () => {
    setActivePanel(null);
    setLookupResult(null);
    setStudentId('');
  };

  const handleShowRegister = () => {
    setIsNavigatingToRegister(true);
    setTimeout(() => {
      navigate("/register");
    }, 500);
  };

  const handleShowLookupInfo = () => {
    setActivePanel('lookup');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const Email = e.target.Email.value.trim();
    const Password = e.target.Password.value;
    try {
      const data = await login(Email, Password);
      if (data.MaPQ === 1) {
        navigate("/admin/dashboard");
      } else if (data.MaPQ === 4) {
        navigate("/user/home");
      } else {
        alert("Không xác định quyền truy cập.");
      }
    } catch (err) {
      alert(err.message || "Đăng nhập thất bại");
      console.error(err);
    }
  };

  const handleLookupSubmit = (e) => {
    e.preventDefault();
    if (studentId === '123456') {
      setLookupResult({
        name: 'Nguyễn Văn A',
        status: 'Đã duyệt',
        room: 'P204 - A6',
        phone: '0123456789',
      });
    } else {
      setLookupResult({ error: 'Không tìm thấy hồ sơ.' });
    }
  };

  return (
    <div className={`login-wrapper ${isNavigatingToRegister ? 'move-out' : ''}`}>
      <div className={`left-side ${activePanel ? 'shrink' : ''}`}>
        <img src="/images/logo.jpg" alt="Logo" className="illustration" />
        <h2>TRUNG TÂM QUẢN LÝ KTX<br />PHÁP VÂN - TỨ HIỆP</h2>
        {(activePanel || isNavigatingToRegister) && (
          <button className="back-btn" onClick={handleGoBack}>←</button>
        )}
        {!activePanel && (
          <>
            <button className="start-login-btn" onClick={handleShowLogin}>
              Dành cho ban quản lý và sinh viên đã thuê phòng
            </button>
            <button className="start-login-btn" onClick={handleShowInfo}>
              Dành cho sinh viên có nhu cầu thuê phòng
            </button>
          </>
        )}
      </div>

      {/* Panel: Đăng nhập */}
      <form onSubmit={handleLogin}>
        <div className={`right-side ${activePanel === 'login' ? 'slide-in' : ''}`}>
          <h2>CHÀO MỪNG ĐẾN VỚI KÍ TÚC XÁ PHÁP VÂN - TỪ HIỆP</h2>
          <input type="text" placeholder="Email" name="Email" />
          <input type="password" placeholder="Password" name="Password" />
          <div className="options">
            <a href="#">Quên mật khẩu?</a>
          </div>
          <div className="buttons">
            <button type="submit" className="login-btn">Đăng Nhập</button>
          </div>
        </div>
      </form>

      {/* Panel: Thông tin thuê phòng */}
      <div className={`right-side ${activePanel === 'info' ? 'slide-in' : ''}`}>
        <h2>THÔNG TIN ĐĂNG KÝ</h2>
        <div className="info-content">
          <div className="info-section">
            <h3>1. Phòng ở</h3>
            <ul>
              <li>Diện tích: 56.9m², khép kín.</li>
              <li>Trang bị: Giường tầng, bàn học, tủ đồ có khóa, bồn rửa, vệ sinh riêng, vòi sen, bình nóng lạnh.</li>
              <li>Thiết bị thêm theo nhu cầu: Tủ lạnh, máy giặt.</li>
            </ul>
          </div>
          <div className="info-section">
            <h3>2. Dịch vụ tiện ích</h3>
            <ul>
              <li>Canteen, siêu thị, nhà thuốc.</li>
              <li>Khu thể thao: bóng rổ, bóng chuyền, gym,...</li>
            </ul>
          </div>
          <div className="info-section">
            <h3>3. Chi phí</h3>
            <ul>
              <li>Phòng 8 người: 205.000đ/tháng.</li>
              <li>Phòng 4 người: 410.000đ/tháng.</li>
              <li>Điện, nước giá nhà nước, có đồng hồ riêng.</li>
              <li>Internet: Từ 200.000đ/tháng.</li>
              <li>Gửi xe: 45.000 – 70.000đ/tháng.</li>
            </ul>
          </div>
          <div className="info-section">
            <h3>4. Giao thông</h3>
            <p>Các tuyến bus tại cổng KTX: 60A, 21B, 99,... và các tuyến gần khác: 04, 08B, 12,...</p>
          </div>
          <div className="info-section">
            <h3>5. Hoạt động</h3>
            <ul>
              <li>Văn nghệ, thể thao, trung thu, ngày hội hiến máu,...</li>
            </ul>
          </div>
          <div className="info-section">
            <h3>6. Hồ sơ đăng ký</h3>
            <ul>
              <li>Đơn đăng ký (có xác nhận): 1 bản gốc + 1 photo.</li>
              <li>CCCD: 2 bản photo.</li>
              <li>Giấy xác nhận/Thẻ SV: 1 bản gốc + 1 photo.</li>
              <li>02 ảnh 3×4.</li>
            </ul>
            <p><strong>Nộp hồ sơ trực tiếp tại:</strong> Tầng 1 nhà A6 - Khu nhà ở SV Pháp Vân - Tứ Hiệp, đường Trần Thủ Độ, Hoàng Mai, Hà Nội.</p>
          </div>
        </div>
        <div className="btnbtn">
          <button className="login-btn" onClick={handleShowRegister}>Đăng ký</button>
          <button className="login-btn" onClick={handleShowLookupInfo}>Tra cứu hồ sơ</button>
        </div>
      </div>

      {/* Panel: Tra cứu hồ sơ */}
      <div className={`right-side ${activePanel === 'lookup' ? 'slide-in' : ''}`}>
        <h2>TRA CỨU HỒ SƠ ĐĂNG KÝ</h2>
        <form onSubmit={handleLookupSubmit} className="lookup-form">
          <input
            type="text"
            placeholder="Nhập mã sinh viên"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Tra cứu</button>
        </form>
        {lookupResult && (
          <div className="result-box">
            {lookupResult.error ? (
              <p className="error">{lookupResult.error}</p>
            ) : (
              <>
                <p><strong>Họ tên:</strong> {lookupResult.name}</p>
                <p><strong>Tình trạng:</strong> {lookupResult.status}</p>
                <p><strong>Phòng:</strong> {lookupResult.room}</p>
                <p><strong>SĐT:</strong> {lookupResult.phone}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
