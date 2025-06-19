import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import {login,resetPassword} from "../../routes/TaiKhoan";
import { toast } from 'react-toastify';
import {getAllSinhVien } from "../../routes/sinhvien";
import {getAllDangKy} from "../../routes/dangky";
const Login = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [isNavigatingToRegister, setIsNavigatingToRegister] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [studenEmail,setStudenEmail]=useState([]);
  const [emailTraCuu, setEmailTraCuu] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (location.state?.activePanel) {
      setActivePanel(location.state.activePanel);
    }
  }, [location.state]);
  useEffect(() => {
            const fetchStudent = async () => {
              try {
                const datalist = await getAllSinhVien();
                setStudenEmail(datalist);
              } catch (err) {
                console.error('Lỗi khi tải danh sách:', err);
              } finally {
                setLoading(false);
              }
            };
            fetchStudent();
          }, []);

  const handleShowLogin = () => {
    setActivePanel('login');
  };

  const handleShowInfo = () => {
    setActivePanel('info');
  };
  const handleShowForgotPassword = () => {
    setActivePanel("forgot");
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
        toast.error("Bạn k có quyền truy cập.");
      }
    } catch (err) {
        toast.error(err.message);
    }
  };

  const handleLookupSubmit = (e) => {
  e.preventDefault();

  const foundStudent = studenEmail.find(
    (sv) => sv.Email.toLowerCase() === emailTraCuu.toLowerCase()
  );

  if (foundStudent && foundStudent.TrangThai === "Chờ duyệt") {
    setLookupResult({
      warn: "Hồ sơ đang chờ duyệt"
    });
  } else if (foundStudent && foundStudent.TrangThai === "Đã Duyệt") {
    setLookupResult({
      success: "Hồ sơ đã duyệt,vui lòng đến nhận phòng đúng đúng ngày đăng ký"
    });
  } else  if (foundStudent && foundStudent.TrangThai === "Từ chối") {
    setLookupResult({
      error: "Hồ Sơ của bạn bị từ chối"
    });
  } else {
    setLookupResult({
      error: "Không tìm thấy hồ sơ"
    });
  }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Email = e.target.Email.value.trim();

    try {
      const data = await resetPassword(Email);
      toast.success(data.message || "Đã gửi mật khẩu mới vào email!");
      setTimeout(() => setActivePanel("login"), 1000);
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi!");
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

      <form onSubmit={handleLogin}>
        <div className={`right-side ${activePanel === 'login' ? 'slide-in' : ''}`}>
          <h2>CHÀO MỪNG ĐẾN VỚI KÍ TÚC XÁ PHÁP VÂN - TỪ HIỆP</h2>
          <input type="text" placeholder="Email" name="Email" />
          <input type="password" placeholder="Password" name="Password" />
          <div className="options">
            <button type="button" className="link-btn" onClick={handleShowForgotPassword}>  Quên mật khẩu? </button>
          </div>
          <div className="buttons">
            <button type="submit" className="login-btn">Đăng Nhập</button>
          </div>
        </div>
      </form>

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

      <div className={`right-side ${activePanel === 'lookup' ? 'slide-in' : ''}`}>
        <h2>TRA CỨU HỒ SƠ ĐĂNG KÝ</h2>
        <form onSubmit={handleLookupSubmit} className="lookup-form">
          <input
            type="text"
            placeholder="Nhập email đăng ký"
            value={emailTraCuu}
  onChange={(e) => setEmailTraCuu(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">Tra cứu</button>
        </form>
        {lookupResult && (
          <div className="result-box">
            {lookupResult.error ? (
  <p className="error">{lookupResult.error}</p>
) : lookupResult.warn ? (
  <p className="warn">{lookupResult.warn}</p>
) : lookupResult.success ? (
  <p className="success">{lookupResult.success}</p>
) : null}

          </div>
        )}
      </div>

      <div className={`right-side ${activePanel === 'forgot' ? 'slide-in' : ''}`}>
  <h2>QUÊN MẬT KHẨU</h2>
  <form className="forgot-form" onSubmit={handleSubmit}>
    <input
      type="Email"
      name="Email"
      placeholder="Nhập email đã đăng ký"
      required
    />
    <button type="submit" className="login-btn">Gửi yêu cầu</button>
  </form>
</div>

    </div>
  );
};

export default Login;
