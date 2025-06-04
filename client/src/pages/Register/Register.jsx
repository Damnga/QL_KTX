
import React, { useState } from 'react';
import './Register.css';
import Stepprogress from '../../component/StepProgress/Stepprogress';
import { useNavigate } from 'react-router-dom';
import { register } from '../../routes/TaiKhoan';
import { createHoSo } from '../../routes/hoso';
import { createHopDong } from '../../routes/hopdong';
import { createSinhVien } from '../../routes/sinhvien';
import { toast } from 'react-toastify';

const Register = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const [taiKhoan, setTaiKhoan] = useState({
    Username: '',
    Email: '',
    Password: '',
    anh: '',
    MaPQ: 5,
    MaSV:''
  });
  const [sinhVien, setSinhVien] = useState({
    MaSV: '',
    HoTen: '',
    NgaySinh: '',
    QueQuan: '',
    GioiTinh: '',
    CCCD: '',
    SDT: '',
    Truong: '',
    Lop: '',
    NienKhoa: '',
    GhiChu: ' ',
  });
  const [hoSo, setHoSo] = useState({
    MaHD: '',
    DonXin: '',
    GiayXacNhanSinhVien: '',
    CCCDPhoTo: '',
  });
  const [hopDong, setHopDong] = useState({
    MaSV: '',
    MaPhong: '',
    NgayBatDau: '',
    NgayKetThuc: '',
    ThoiHan: '6 tháng',
    TrangThai: 'Chờ duyệt',
    GhiChu: ' ',
  });
  const addMonths = (dateStr, months) => {
    const date = new Date(dateStr);
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split('T')[0]; 
  };
  const handleChange = (setter, field) => (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    if (setter === setHopDong && field === 'NgayBatDau') {
      setter((prev) => ({
        ...prev,
        NgayBatDau: value,
        NgayKetThuc: addMonths(value, 6),
      }));
    } else {
      setter((prev) => ({ ...prev, [field]: value }));
    }
  };
  const isStepValid = () => {
    switch (step) {
      case 0:
        return taiKhoan.Username && taiKhoan.Email && taiKhoan.Password;
      case 1:
        return sinhVien.MaSV && sinhVien.HoTen && sinhVien.NgaySinh && sinhVien.QueQuan && sinhVien.GioiTinh && taiKhoan.Email && sinhVien.CCCD && sinhVien.SDT && sinhVien.Truong && sinhVien.Lop && sinhVien.NienKhoa && taiKhoan.anh && sinhVien.GhiChu;
      case 2:
        return hopDong.MaPhong && hopDong.NgayBatDau && hopDong.NgayKetThuc && hopDong.ThoiHan && hopDong.TrangThai && hopDong.GhiChu;
      case 3:
        return hoSo.DonXin && hoSo.GiayXacNhanSinhVien && hoSo.CCCDPhoTo;
      default:
        return true;
    }
  };
  const handleNext = async () => {
    if (step === 4) {
      try {
        const sinhVienData = {
          ...sinhVien,
          Email: taiKhoan.Email,
          anh: taiKhoan.anh,
        };
        const resSinhVien = await createSinhVien(sinhVienData);
        const MaSV = resSinhVien.id;
        const taiKhoanWithMaSV = {
        ...taiKhoan,
        MaSV: MaSV,
      };

      await register(taiKhoanWithMaSV);
        const hopDongData = {
          ...hopDong,
          MaSV: MaSV,
          ThoiHan: '6 tháng',
        };

        const resHopDong = await createHopDong(hopDongData);
        const MaHD = resHopDong.id;

        const hosoData = {
          ...hoSo,
          MaHD: MaHD,
        };

        await createHoSo(hosoData);
        setIsRegistered(true);
        toast.success('Đăng ký Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    } else {
      setStep((s) => Math.min(4, s + 1));
    }
  };
  return (
    <div>
      <Stepprogress currentStep={step} />
      <div className="step-form">
        {step === 0 && (
          <div>
            <h3>Thông tin tài khoản</h3>
            <input type="file" accept="image/*" onChange={handleChange(setTaiKhoan, 'anh')} />
            <input type="text" placeholder="Tên tài khoản" value={taiKhoan.Username} onChange={handleChange(setTaiKhoan, 'Username')} />
            <input type="email" placeholder="Email" value={taiKhoan.Email} onChange={handleChange(setTaiKhoan, 'Email')} />
            <input type="password" placeholder="Mật khẩu" value={taiKhoan.Password} onChange={handleChange(setTaiKhoan, 'Password')} />
          </div>
        )}
        {step === 1 && (
          <div>
            <h3>Thông tin cá nhân</h3>
            <input type="text" placeholder="Mã Sinh Viên" value={sinhVien.MaSV} onChange={handleChange(setSinhVien, 'MaSV')} />
            <input type="text" placeholder="Họ Tên Sinh Viên" value={sinhVien.HoTen} onChange={handleChange(setSinhVien, 'HoTen')} />
            <input type="date" placeholder="Ngày Sinh " value={sinhVien.NgaySinh} onChange={handleChange(setSinhVien, 'NgaySinh')} />
            <input type="text" placeholder="Quê Quán" value={sinhVien.QueQuan} onChange={handleChange(setSinhVien, 'QueQuan')} />
            <input type="text" placeholder="Giới Tính" value={sinhVien.GioiTinh} onChange={handleChange(setSinhVien, 'GioiTinh')} />
            <input type="text" placeholder="CCCD" value={sinhVien.CCCD} onChange={handleChange(setSinhVien, 'CCCD')} />
            <input type="text" placeholder="SDT" value={sinhVien.SDT} onChange={handleChange(setSinhVien, 'SDT')} />
            <input type="text" placeholder="Trường" value={sinhVien.Truong} onChange={handleChange(setSinhVien, 'Truong')} />
            <input type="text" placeholder="Lớp" value={sinhVien.Lop} onChange={handleChange(setSinhVien, 'Lop')} />
            <input type="text" placeholder="Niên Khóa" value={sinhVien.NienKhoa} onChange={handleChange(setSinhVien, 'NienKhoa')} />
            <input type="text" placeholder="Ghi Chú" value={sinhVien.GhiChu} onChange={handleChange(setSinhVien, 'GhiChu')} />
          </div>
        )}
        {step === 2 && (
          <div>
            <h3>Chọn phòng</h3>
            <input type="text" placeholder="Mã phòng" value={hopDong.MaPhong} onChange={handleChange(setHopDong, 'MaPhong')} />
            <input type="date" placeholder="Ngày bắt đầu" value={hopDong.NgayBatDau} onChange={handleChange(setHopDong, 'NgayBatDau')} />
            <input type="date" placeholder="Ngày kết thúc" value={hopDong.NgayKetThuc} onChange={handleChange(setHopDong, 'NgayKetThuc')} disabled />
            <input type="text" placeholder="Trạng Thái" value={hopDong.TrangThai} onChange={handleChange(setHopDong, 'TrangThai')} />
            <input type="text" placeholder="Ghi chú" value={hopDong.GhiChu} onChange={handleChange(setHopDong, 'GhiChu')} />
          </div>
        )}
        {step === 3 && (
          <div>
            <h3>Giấy tờ cần thiết</h3>
            <input type="file" onChange={handleChange(setHoSo, 'DonXin')} />
            <input type="file" onChange={handleChange(setHoSo, 'GiayXacNhanSinhVien')} />
            <input type="file" onChange={handleChange(setHoSo, 'CCCDPhoTo')} />
          </div>
        )}
        {step === 4 && (
          <div>
            <h3>Xác nhận thông tin</h3>
            <p>Bạn đã hoàn tất các bước, hãy nhấn "Hoàn tất" để đăng ký.</p>
          </div>
        )}
      </div>
      <div className="step-buttons">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          ← Quay lại
        </button>
        <button onClick={handleNext} disabled={!isStepValid()}>
          {step === 4 ? 'Hoàn tất' : 'Tiếp →'}
        </button>
      </div>
      {isRegistered && (
        <div className="modal">
          <div className="modal-content">
            <h2>🎉 Đăng ký thành công!</h2>
            <p>Nếu tài khoản của bạn được duyệt, hệ thống sẽ tự động xử lý hồ sơ và hợp đồng.</p>
            <button onClick={() => {  setIsRegistered(false);  navigate('/login', { state: { activePanel: 'info' } }); }} >Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
