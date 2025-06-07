
import { useState } from 'react';
import './Register.css';
import Stepprogress from '../../component/StepProgress/Stepprogress';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {createDangKy} from '../../routes/dangky';
const Register = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  // const [taiKhoan, setTaiKhoan] = useState({
  //   Username: '',
  //   Email: '',
  //   Password: '',
  //   anh: '',
  //   MaPQ: 5,
  //   MaSV:''
  // });
  // const [sinhVien, setSinhVien] = useState({
  //   MaSV: '',
  //   HoTen: '',
  //   NgaySinh: '',
  //   QueQuan: '',
  //   GioiTinh: '',
  //   Email: '',
  //   CCCD: '',
  //   SDT: '',
  //   Truong: '',
  //   Lop: '',
  //   NienKhoa: '',
  //   GhiChu: ' ',
  //   anh: '',
  // });
  // const [hoSo, setHoSo] = useState({
  //   MaHD: '',
  //   DonXin: '',
  //   GiayXacNhanSinhVien: '',
  //   CCCDPhoTo: '',
  // });
  // const [hopDong, setHopDong] = useState({
  //   MaSV: '',
  //   MaPhong: '',
  //   NgayBatDau: '',
  //   NgayKetThuc: '',
  //   ThoiHan: '6 tháng',
  //   TrangThai: 'Chờ duyệt',
  //   GhiChu: ' ',
  // });
  
  const [dangky, setDangKy] = useState({
    Email: '',
    anh: '',
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
    MaPhong: '',
    NgayBatDau: '',
    TrangThai: 'Chờ duyệt',
    DonXin: '',
    GiayXacNhanSinhVien: '',
    CCCDPhoTo: '',
    
  });

  const handleChange = (setter, field) => (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    if (setter === setDangKy && field === 'NgayBatDau') {
      setter((prev) => ({
        ...prev,
        NgayBatDau: value,
      }));
    } else {
      setter((prev) => ({ ...prev, [field]: value }));
    }
  };
  const isStepValid = () => {
    switch (step) {
      case 0:
        return dangky.MaSV && dangky.HoTen && dangky.NgaySinh && dangky.QueQuan && dangky.GioiTinh && dangky.Email && dangky.CCCD && dangky.SDT && dangky.Truong && dangky.Lop && dangky.NienKhoa && dangky.Email && dangky.anh;
      case 2:
        return dangky.MaPhong && dangky.NgayBatDau;
      case 1:
        return dangky.DonXin && dangky.GiayXacNhanSinhVien && dangky.CCCDPhoTo;
      default:
        return true;
    }
  };
  const handleNext = async () => {
    if (step === 3) {
      try {
      //   const sinhVienData = {
      //     ...sinhVien,
      //     Email: taiKhoan.Email,
      //     anh: taiKhoan.anh,
      //   };
      //   const resSinhVien = await createSinhVien(sinhVienData);
      //   const MaSV = resSinhVien.id;
      //   const taiKhoanWithMaSV = {
      //   ...taiKhoan,
      //   MaSV: MaSV,
      // };

      // await register(taiKhoanWithMaSV);
      //   const hopDongData = {
      //     ...hopDong,
      //     MaSV: MaSV,
      //     ThoiHan: '6 tháng',
      //   };

      //   const resHopDong = await createHopDong(hopDongData);
      //   const MaHD = resHopDong.id;

      //   const hosoData = {
      //     ...hoSo,
      //     MaHD: MaHD,
      //   };
      //   await createHoSo(hosoData);
        await createDangKy(dangky);

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
      <div className="step-header">
        <Stepprogress currentStep={step} />
      </div>
      <div className="step-form">
        {step === 0 && (
          <div>
            <h3>Thông tin cá nhân</h3>
            <p>Mã sinh viên</p>
            <input type="text" value={dangky.MaSV} onChange={handleChange(setDangKy, 'MaSV')} />
            <p>Họ Tên Sinh Viên</p>
            <input type="text" value={dangky.HoTen} onChange={handleChange(setDangKy, 'HoTen')} />
            <p>Ngày Sinh</p>
            <input type="date" value={dangky.NgaySinh} onChange={handleChange(setDangKy, 'NgaySinh')} />
            <p>Quê Quán</p>
            <input type="text" value={dangky.QueQuan} onChange={handleChange(setDangKy, 'QueQuan')} />
            <p>Giới Tính</p>
            <input type="text" value={dangky.GioiTinh} onChange={handleChange(setDangKy, 'GioiTinh')} />
            <p>Email</p>
            <input type="email"  value={dangky.Email} onChange={handleChange(setDangKy, 'Email')} />
            <p>Số Căn cước công dân</p>
            <input type="text" value={dangky.CCCD} onChange={handleChange(setDangKy, 'CCCD')} />
            <p>Số điện thoại</p>
            <input type="text" value={dangky.SDT} onChange={handleChange(setDangKy, 'SDT')} />
            <p>Trường</p>
            <input type="text" value={dangky.Truong} onChange={handleChange(setDangKy, 'Truong')} />
            <p>Lớp</p>
            <input type="text" value={dangky.Lop} onChange={handleChange(setDangKy, 'Lop')} />
            <p>Niên Khóa</p>
            <input type="text" value={dangky.NienKhoa} onChange={handleChange(setDangKy, 'NienKhoa')} />
            <p>Ảnh đại diện</p>
            <input type="file" accept="image/*" onChange={handleChange(setDangKy, 'anh')} />
          </div>
        )}
        {step === 2 && (
          <div>
            <h3>Chọn phòng</h3>
            <p>Chọn Phòng</p>
            <input type="text" placeholder="Mã phòng" value={dangky.MaPhong} onChange={handleChange(setDangKy, 'MaPhong')} />
            <p>Ngày bắt đầu ở</p>
            <input type="date" placeholder="Ngày bắt đầu" value={dangky.NgayBatDau} onChange={handleChange(setDangKy, 'NgayBatDau')} />
          </div>
        )}
        {step === 1 && (
          <div>
            <h3>Giấy tờ cần thiết</h3>
            <p>Đơn xin</p>
            <input type="file" onChange={handleChange(setDangKy, 'DonXin')} />
            <p>Giấy xác nhận sinh viên</p>
            <input type="file" onChange={handleChange(setDangKy, 'GiayXacNhanSinhVien')} />
            <p>Căn cước công dân photo</p>
            <input type="file" onChange={handleChange(setDangKy, 'CCCDPhoTo')} />
          </div>
        )}
        {step === 3 && (
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
          {step === 3 ? 'Hoàn tất' : 'Tiếp →'}
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
