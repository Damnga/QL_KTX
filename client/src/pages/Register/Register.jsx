
import { useState } from 'react';
import './Register.css';
import Stepprogress from '../../component/StepProgress/Stepprogress';
import { useNavigate } from 'react-router-dom';
import { createSinhVien, getByCCCDSinhVien,editSinhVien } from '../../routes/sinhvien';
import { createHopDong, getByMaSVHopDong} from '../../routes/hopdong';
import { createHoSo } from '../../routes/hoso';
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
  const [sinhVien, setSinhVien] = useState({
    MaSV: '',
    HoTen: '',
    NgaySinh: '',
    QueQuan: '',
    GioiTinh: '',
    Email: '',
    CCCD: '',
    SDT: '',
    Truong: '',
    Lop: '',
    NienKhoa: '',
    GhiChu: ' ',
    anh: '',
    TrangThai: 'Chờ duyệt',
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
  
  // const [dangky, setDangKy] = useState({
  //   Email: '',
  //   anh: '',
  //   MaSV: '',
  //   HoTen: '',
  //   NgaySinh: '',
  //   QueQuan: '',
  //   GioiTinh: '',
  //   CCCD: '',
  //   SDT: '',
  //   Truong: '',
  //   Lop: '',
  //   NienKhoa: '',
  //   MaPhong: '',
  //   NgayBatDau: '',
  //   TrangThai: 'Chờ duyệt',
  //   DonXin: '',
  //   GiayXacNhanSinhVien: '',
  //   CCCDPhoTo: '',
    
  // });

  const handleChange = (setter, field) => (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    if (setter === setHopDong && field === 'NgayBatDau') {
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
        return sinhVien.MaSV && sinhVien.HoTen && sinhVien.NgaySinh && sinhVien.QueQuan && sinhVien.GioiTinh && sinhVien.Email && sinhVien.CCCD && sinhVien.SDT && sinhVien.Truong && sinhVien.Lop && sinhVien.NienKhoa && sinhVien.Email && sinhVien.anh;
      case 2:
        return hopDong.MaPhong && hopDong.NgayBatDau;
      case 1:
        return hoSo.DonXin && hoSo.GiayXacNhanSinhVien && hoSo.CCCDPhoTo;
      default:
        return true;
    }
  };
  // const handleNext = async () => {
  //   if (step === 3) {
  //     try {
  //       const sinhVienData = {
  //         ...sinhVien,
  //         Email: sinhVien.Email,
  //         anh: sinhVien.anh,
  //       };
  //       const resSinhVien = await createSinhVien(sinhVienData);
  //       const MaSV = resSinhVien.id;
  //     //   const taiKhoanWithMaSV = {
  //     //   ...taiKhoan,
  //     //   MaSV: MaSV,
  //     // };

  //     // await register(taiKhoanWithMaSV);
  //       const hopDongData = {
  //         ...hopDong,
  //         MaSV: MaSV,
  //         ThoiHan: '6 tháng',
  //       };

  //       const resHopDong = await createHopDong(hopDongData);
  //       const MaHD = resHopDong.id;

  //       const hosoData = {
  //         ...hoSo,
  //         MaHD: MaHD,
  //       };
  //       await createHoSo(hosoData);
  //       // await createDangKy(dangky);

  //       setIsRegistered(true);
  //       toast.success('Đăng ký Thành công');
  //     } catch (err) {
  //       toast.error(err|| 'Có lỗi xảy ra!');
  //     }
  //   } else {
  //     setStep((s) => Math.min(4, s + 1));
  //   }
  // };
  const handleNext = async () => {
  if (step === 3) {
    try {
      let MaSV = '';
      let isNewSV = false;

      // Kiểm tra sinh viên tồn tại theo CCCD
      const existingSV = await getByCCCDSinhVien(sinhVien.CCCD);

      if (existingSV) {
        MaSV = existingSV.MaSV;

        // Kiểm tra hợp đồng của sinh viên đó
        const existingHD = await getByMaSVHopDong(MaSV);

        if (existingHD && ['Chờ duyệt', 'Đang ở'].includes(existingHD.TrangThai)) {
          toast.error('Sinh viên đã có hợp đồng đang hoạt động hoặc chờ duyệt.');
          return;
        }
await editSinhVien({
          ...existingSV,
          TrangThai: 'Chờ duyệt'
        });
        // Nếu là "Đã hủy" hoặc "Đã kết thúc" thì cho phép tiếp tục, KHÔNG tạo lại sinh viên
      } else {
        // Tạo mới sinh viên
        const sinhVienData = {
          ...sinhVien,
          Email: sinhVien.Email,
          anh: sinhVien.anh,
        };
        const resSinhVien = await createSinhVien(sinhVienData);
        MaSV = resSinhVien.id;
        isNewSV = true;
      }

      // Tạo hợp đồng mới
      const hopDongData = {
        ...hopDong,
        MaSV: MaSV,
        ThoiHan: '6 tháng',
        TrangThai: 'Chờ duyệt',
      };
      const resHopDong = await createHopDong(hopDongData);
      const MaHD = resHopDong.id;

      // Tạo hồ sơ mới
      const hosoData = {
        ...hoSo,
        MaHD: MaHD,
      };
      await createHoSo(hosoData);

      setIsRegistered(true);
      toast.success(isNewSV ? 'Đăng ký thành công!' : 'Đăng ký lại thành công!');
    } catch (err) {
      toast.error(err?.message || 'Có lỗi xảy ra!');
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
            <input type="text" value={sinhVien.MaSV} onChange={handleChange(setSinhVien, 'MaSV')} />
            <p>Họ Tên Sinh Viên</p>
            <input type="text" value={sinhVien.HoTen} onChange={handleChange(setSinhVien, 'HoTen')} />
            <p>Ngày Sinh</p>
            <input type="date" value={sinhVien.NgaySinh} onChange={handleChange(setSinhVien, 'NgaySinh')} />
            <p>Quê Quán</p>
            <input type="text" value={sinhVien.QueQuan} onChange={handleChange(setSinhVien, 'QueQuan')} />
            <p>Giới Tính</p>
            <input type="text" value={sinhVien.GioiTinh} onChange={handleChange(setSinhVien, 'GioiTinh')} />
            <p>Email</p>
            <input type="email" value={sinhVien.Email} onChange={handleChange(setSinhVien, 'Email')} />
            <p>Số Căn cước công dân</p>
            <input type="text" value={sinhVien.CCCD} onChange={handleChange(setSinhVien, 'CCCD')} />
            <p>Số điện thoại</p>
            <input type="text" value={sinhVien.SDT} onChange={handleChange(setSinhVien, 'SDT')} />
            <p>Trường</p>
            <input type="text" value={sinhVien.Truong} onChange={handleChange(setSinhVien, 'Truong')} />
            <p>Lớp</p>
            <input type="text" value={sinhVien.Lop} onChange={handleChange(setSinhVien, 'Lop')} />
            <p>Niên Khóa</p>
            <input type="text" value={sinhVien.NienKhoa} onChange={handleChange(setSinhVien, 'NienKhoa')} />
            <p>Ảnh đại diện</p>
            <input type="file" accept="image/*" onChange={handleChange(setSinhVien, 'anh')} />
          </div>
        )}
        {step === 2 && (
          <div>
            <h3>Chọn phòng</h3>
            <p>Chọn Phòng</p>
            <input type="text"  value={hopDong.MaPhong} onChange={handleChange(setHopDong, 'MaPhong')} />
            <p>Ngày bắt đầu ở</p>
            <input type="date"  value={hopDong.NgayBatDau} onChange={handleChange(setHopDong, 'NgayBatDau')} />
          </div>
        )}
        {step === 1 && (
          <div>
            <h3>Giấy tờ cần thiết</h3>
            <p>Đơn xin</p>
            <input type="file" onChange={handleChange(setHoSo, 'DonXin')} />
            <p>Giấy xác nhận sinh viên</p>
            <input type="file" onChange={handleChange(setHoSo, 'GiayXacNhanSinhVien')} />
            <p>Căn cước công dân photo</p>
            <input type="file" onChange={handleChange(setHoSo, 'CCCDPhoTo')} />
          </div>
        )}
        {step === 3 && (
  <div>
    <h3>Xác nhận thông tin</h3>
    <p>Vui lòng kiểm tra lại toàn bộ thông tin trước khi nhấn "Hoàn tất".</p>
    <table className="confirmation-table">
      <tbody>
        <tr><td><strong>Mã SV:</strong></td><td>{sinhVien.MaSV}</td></tr>
        <tr><td><strong>Họ tên:</strong></td><td>{sinhVien.HoTen}</td></tr>
        <tr><td><strong>Ngày sinh:</strong></td><td>{sinhVien.NgaySinh}</td></tr>
        <tr><td><strong>Quê quán:</strong></td><td>{sinhVien.QueQuan}</td></tr>
        <tr><td><strong>Giới tính:</strong></td><td>{sinhVien.GioiTinh}</td></tr>
        <tr><td><strong>Email:</strong></td><td>{sinhVien.Email}</td></tr>
        <tr><td><strong>CCCD:</strong></td><td>{sinhVien.CCCD}</td></tr>
        <tr><td><strong>SĐT:</strong></td><td>{sinhVien.SDT}</td></tr>
        <tr><td><strong>Trường:</strong></td><td>{sinhVien.Truong}</td></tr>
        <tr><td><strong>Lớp:</strong></td><td>{sinhVien.Lop}</td></tr>
        <tr><td><strong>Niên khóa:</strong></td><td>{sinhVien.NienKhoa}</td></tr>
        <tr>
          <td><strong>Ảnh đại diện:</strong></td>
          <td>{sinhVien.anh && <img src={URL.createObjectURL(sinhVien.anh)} alt="Ảnh đại diện" width="80" />}</td>
        </tr>
        <tr><td colSpan={2}><strong>📁 Giấy tờ đính kèm</strong></td></tr>
        <tr><td>Đơn xin:</td><td>{hoSo.DonXin?.name}</td></tr>
        <tr><td>Giấy xác nhận SV:</td><td>{hoSo.GiayXacNhanSinhVien?.name}</td></tr>
        <tr><td>CCCD photo:</td><td>{hoSo.CCCDPhoTo?.name}</td></tr>
        <tr><td colSpan={2}><strong>🏠 Thông tin hợp đồng</strong></td></tr>
        <tr><td>Mã phòng:</td><td>{hopDong.MaPhong}</td></tr>
        <tr><td>Ngày bắt đầu:</td><td>{hopDong.NgayBatDau}</td></tr>
        <tr><td>Thời hạn:</td><td>{hopDong.ThoiHan}</td></tr>
      </tbody>
    </table>
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
