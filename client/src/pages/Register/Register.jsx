
import { useState,useEffect } from 'react';
import './Register.css';
import Stepprogress from '../../component/StepProgress/Stepprogress';
import { useNavigate } from 'react-router-dom';
import { createSinhVien, getByCCCDSinhVien} from '../../routes/sinhvien';
import { createHopDong, getByMaSVHopDong} from '../../routes/hopdong';
import { createHoSo } from '../../routes/hoso';
import { toast } from 'react-toastify';
import { getAll} from "../../routes/toanha";
import { getAllPhongData,getByIdPhong} from "../../routes/phong";
import { usePhongContext } from '../../context/PhongContext';
import { User } from "lucide-react"
const Register = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const {phongTheoToa, setPhongTheoToa,selectedMaTN, setSelectedMaTN } = usePhongContext();
  const [toaNhaList, setToaNhaList] = useState([]);
  const [phonglist, setphonglist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maphongtoa,setmaphongtoa] = useState(null);
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
  useEffect(() => {
    if (selectedMaTN) {
      const filteredPhong = phonglist.filter((phong) =>  parseInt(phong.MaTN) ===  parseInt(selectedMaTN));
      setPhongTheoToa(filteredPhong);
    } else {
      setPhongTheoToa([]);
    }
    }, [selectedMaTN, phonglist]); 
  useEffect(() => {
      const fetchPhong = async () => {
        try {
          const data = await getAllPhongData();
          setphonglist(data);
        } catch (err) {
          console.error('Lỗi khi tải danh sách:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchPhong();
  }, []); 
useEffect(() => {
  const fetchPhongDetail = async () => {
    if (hopDong.MaPhong) {
      try {
        const phong = await getByIdPhong(hopDong.MaPhong); 
        setmaphongtoa(phong); 
      } catch (err) {
        console.error('Lỗi lấy thông tin phòng:', err);
      }
    }
  };
  fetchPhongDetail(); 
}, [hopDong.MaPhong]);
  
  useEffect(() => {
      const fetchToaNha = async () => {
        try {
          const data = await getAll();
          setToaNhaList(data);
        } catch (err) {
          console.error('Lỗi khi tải danh sách:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchToaNha();
    }, [],);
  const handleNext = async () => {
  if (step === 3) {
    try {
      let MaSV = '';
      let isNewSV = false;

      const existingSV = await getByCCCDSinhVien(sinhVien.CCCD);

      if (existingSV) {
        MaSV = existingSV.MaSV;

        const existingHD = await getByMaSVHopDong(MaSV);

        if (existingHD) {
          const { TrangThai } = existingHD;

          if (TrangThai === 'Đã thanh lý') {
            const hopDongData = {
              ...hopDong,
              MaSV: MaSV,
              ThoiHan: '6 tháng',
              TrangThai: 'Chờ duyệt',
            };
            const resHopDong = await createHopDong(hopDongData);
            const hosoData = {
              ...hoSo,
              MaHD: resHopDong.id,
            };
            await createHoSo(hosoData);
            setIsRegistered(true);
            toast.success('Đăng ký lại thành công!');
            return;
          } else  {
            toast.error(`Sinh viên đã có hợp đồng với trạng thái: "${TrangThai}", không thể đăng ký mới.`);
            return;
          }
        }
      } else {
        const sinhVienData = {
          ...sinhVien,
          Email: sinhVien.Email,
          anh: sinhVien.anh,
        };
        const resSinhVien = await createSinhVien(sinhVienData);
        MaSV = resSinhVien.id;
        isNewSV = true;
      }
      const hopDongData = {
        ...hopDong,
        MaSV: MaSV,
        ThoiHan: '6 tháng',
        TrangThai: 'Chờ duyệt',
      };
      const resHopDong = await createHopDong(hopDongData);
      const MaHD = resHopDong.id;

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
  useEffect(() => {
    if (hopDong.NgayBatDau) {
      const startDate = new Date(hopDong.NgayBatDau);
      const endDate = new Date(startDate.setMonth(startDate.getMonth() + 6));
      const formattedEndDate = endDate.toISOString().split('T')[0];
      setHopDong(prev => ({
        ...prev,
        NgayKetThuc: formattedEndDate,
      }));
    }
  }, [hopDong.NgayBatDau]);

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
            <select value={sinhVien.GioiTinh} onChange={handleChange(setSinhVien, 'GioiTinh')}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
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
          <div className="room-container">
            <h3>Chọn phòng</h3>
            <p>Tòa Nhà</p>
            <select  className="floor-select"  value={selectedMaTN} onChange={(e) => {const maTN = e.target.value;  setSelectedMaTN(maTN);  setHopDong({ ...hopDong, MaPhong: "" }); }} >
              <option value="">-- Chọn tòa nhà --</option>
              {toaNhaList.map((loai) => (
                <option key={loai.MaTN} value={loai.MaTN}>
                  {loai.TenTN}
                </option>
              ))}
            </select>
            {selectedMaTN && (
              <>
                <p>Danh sách phòng:</p>
                <div className="room-list">
                  {phongTheoToa.filter((phong) => phong.GhiChu?.trim().toLowerCase() === sinhVien.GioiTinh?.trim().toLowerCase() && phong.TrangThai === "Còn chỗ")
                                .map((phong) => {
                    const soLuongToiDa = phong.LoaiPhong;
                    const soLuongDangO = parseInt(phong.SoLuongHopDong || 0);
                    const songuoi =  parseInt(phong.SoNguoi || 0);
                    return (
                      <div  key={phong.MaPhong}  className={`room-card ${hopDong.MaPhong === phong.MaPhong ? "selected" : ""}`} onClick={() =>  setHopDong({ ...hopDong, MaPhong: phong.MaPhong })   } >
                        <h3>Phòng:  {phong.TenPhong}</h3>
                        <p className="room-info">Loại phòng: {soLuongToiDa}</p>
                        <div className="icon-wrapper">
                          {Array.from({ length: songuoi }).map((_, idx) => (
                            <div key={idx} className={`icon-person ${idx >= soLuongDangO ? "available" : ""}`} > <User/> </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            <p style={{ marginTop: "20px" }}>Ngày bắt đầu ở</p>
            <input  type="date"  value={hopDong.NgayBatDau}  onChange={handleChange(setHopDong, "NgayBatDau")} />
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
              <tr><td>Tòa nhà:</td><td>{maphongtoa?.TenTN || 'Không rõ'}</td></tr>
              <tr><td>Tên phòng:</td><td>{maphongtoa?.TenPhong || 'Không rõ'}</td></tr>
              <tr><td>Ngày bắt đầu:</td><td>{hopDong.NgayBatDau}</td></tr>
              <tr><td>Ngày kết thúc:</td><td>{hopDong.NgayKetThuc}</td></tr>
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
            <h2> Đăng ký thành công!</h2>
            <p>Nếu tài khoản của bạn được duyệt, hệ thống sẽ tự động xử lý hồ sơ và hợp đồng.</p>
            <button onClick={() => {  setIsRegistered(false);  navigate('/login', { state: { activePanel: 'info' } }); }} >Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
