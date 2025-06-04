import { useState,useEffect } from 'react';
import "./LaKeProfile.css";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../routes/TaiKhoan'; 
import {getByIdSinhVienUser} from "../../../routes/sinhvien";
import {getByIdTenPhongTenTN,getByIdTenPhong} from "../../../routes/phong";
import {getAllBaoTriPhong,createBaoTri} from "../../../routes/baotri";
import {getByIdTaiKhoan} from "../../../routes/hopdong";
import {getAllGopYSinhVien,createGopY,editGopY} from "../../../routes/gopy";
import {getByIdNguoiThanSinhVien} from "../../../routes/nguoithan";
import {getByIdDangKyThamSinhVien,createDangKyTham} from "../../../routes/dangkytham";
import {getByIdKyLuatSinhVien} from "../../../routes/kyluat";
import {getByIdLichSuRaVaoSinhVien} from "../../../routes/lichsuravao";
import {handleThanhToan} from "../../../routes/thanhtoan";
const LakeProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  const userMaSV = decoded.MaSV;
  const [loading, setLoading] = useState(true);   
  const [sinhvienuser,setSinhvienuser]=useState({});
  const [tenphongtenTNuser,settenphongtenTNuser]=useState([]);
  const [baotriphong,setbaotriphong]=useState([]);
  const [hoso,sethoso]=useState({});
  const [gopy,setgopy]=useState([]);
  const [openImage, setOpenImage] = useState(null);
  const [nguoithan ,setnguithan]=useState([]);
  const [dangkytham ,setdangkytham]=useState([]);
  const [kyluat,setkyluat]=useState([]);
  const [lichsuravao,setlichsuravao]=useState([]);
  const [maphongbytksinhvien,setmaphongbytksinhvien]=useState({});
  const handleOpenImage = (filePath) => {
    setOpenImage(filePath);
  };
  const handleCloseImage = () => {
    setOpenImage(null);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (!confirmLogout) return;
  
    try {
      await logout();
      navigate('/');
    } catch (err) {
      alert(err.message || "Lỗi khi đăng xuất");
      console.error(err);
    }
  };
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const sinvienuser = await getByIdSinhVienUser(userId);
      const sinhvienValue = Array.isArray(sinvienuser)
        ? sinvienuser[0]
        : sinvienuser;
      setSinhvienuser(sinhvienValue);
      const tenphongtenTN = await getByIdTenPhongTenTN(sinhvienValue.TenPhong,sinhvienValue.TenTN);
      settenphongtenTNuser(tenphongtenTN);
      const baotri = await getAllBaoTriPhong(sinhvienValue.TenPhong,sinhvienValue.TenTN);
      setbaotriphong(baotri);
      const hosotaikhoan = await getByIdTaiKhoan(userId);
      sethoso(hosotaikhoan);
      const gopysinhvien = await getAllGopYSinhVien(userMaSV);
      setgopy(gopysinhvien);
      const nguoithansinhvien = await getByIdNguoiThanSinhVien(userMaSV);
      setnguithan(nguoithansinhvien);
      const dangkythamnguoithan = await getByIdDangKyThamSinhVien(userMaSV);
      setdangkytham(dangkythamnguoithan);
      const kyluatsinhvien = await getByIdKyLuatSinhVien(userMaSV);
      setkyluat(kyluatsinhvien);
      const lichsuravaosinhvien = await getByIdLichSuRaVaoSinhVien(userMaSV);
      setlichsuravao(lichsuravaosinhvien);
      const maphongsinhvien = await getByIdTenPhong(userMaSV);
      setmaphongbytksinhvien(maphongsinhvien);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchUser();
  }, [token, userId]);
  const [showDangKySuaChua, setShowDangKySuaChua] = useState(false);
  const [noiDungSuaChua, setNoiDungSuaChua] = useState("");
  const handleOpenDangKySuaChua = () => setShowDangKySuaChua(true);
  const handleCloseDangKySuaChua = () => setShowDangKySuaChua(false);
  const handleDangKySuaChua = async () => {
    if (!noiDungSuaChua.trim()) {
    toast.error("Vui lòng nhập nội dung sửa chữa!");
    return;
    }
    const newBT = {
    MaPhong: maphongbytksinhvien.MaPhong,
    NoiDung: noiDungSuaChua,
    TrangThai: "Chờ xử lý",
    NgayDangKy: new Date().toISOString().slice(0, 10),
    };
    try {
      await createBaoTri(newBT);
      toast.success("Gửi đăng ký thành công!");
      setNoiDungSuaChua("");
      setShowDangKySuaChua(false);
      const capNhat = await getAllBaoTriPhong(sinhvienuser.TenPhong, sinhvienuser.TenTN);
      setbaotriphong(capNhat);
    } catch (err) {
      toast.error("Lỗi khi gửi đăng ký.");
    }
  };
  const [showDangKyGopY, setShowDangKyGopY] = useState(false);
  const [noiDungGopY, setNoiDungGopY] = useState("");
  const handleOpenDangKyGopY = () => setShowDangKyGopY (true);
  const handleCloseDangKyGopY  = () => setShowDangKyGopY (false);
  const handleDangKyGopY  = async () => {
    if (!noiDungGopY.trim()) {
    toast.error("Vui lòng nhập nội dung góp ý!");
    return;
    }
    const newBT = {
    MaSV:userMaSV,
    NoiDung: noiDungGopY,
    Tgian: new Date().toISOString().slice(0, 10),
    };
    try {
      await createGopY(newBT);
      toast.success("Gửi góp ý thành công!");
      setNoiDungGopY("");
      setShowDangKyGopY(false);
      const capNhat = await getAllGopYSinhVien(userMaSV);
      setgopy(capNhat);
    } catch (err) {
      toast.error("Lỗi khi gửi đăng ký.");
    }
  };
  const [editData, setEditData] = useState(null);
  const [newContent, setNewContent] = useState(""); 
  const handleEditClick = (item) => {
  setEditData(item);
  setNewContent(item.NoiDung);
  };
  const handleEditSubmit = async () => {
  if (!editData) return;

  const updated = {
    ...editData,
    NoiDung: newContent,
  };

  try {
    await editGopY(editData.IDGopY,updated);
    const gopysinhvien = await getAllGopYSinhVien(userMaSV);
    setgopy(gopysinhvien);
    setEditData(null); 
    toast.success("Sửa thành công");
  } catch (error) {
    toast.error("Lỗi khi sửa góp ý:", error);
  }
  };

  const [showDangKyTham, setShowDangKyTham] = useState(false);
  const [noiDungDangKyTham, setNoiDungDangKyTham] = useState({
    TgianBatDau: "",
    TgianKetThuc: "",
    MaNT: "",
    TrangThai: "Chờ duyệt",
  });
  const handleOpenDangKyTham = () => setShowDangKyTham(true);
  const handleCloseDangKyTham  = () => setShowDangKyTham(false);
  const handleDangKyTham = async () => {
    const { TgianBatDau, TgianKetThuc, MaNT } = noiDungDangKyTham;
    if (!TgianBatDau || !TgianKetThuc || !MaNT) {
      toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    const newTham = {
      ...noiDungDangKyTham,
      MaSV: userMaSV
    };

  try {
    await createDangKyTham(newTham);
    toast.success("Đăng ký thăm thành công!");
    setNoiDungDangKyTham({ MaNT: "", TgianBatDau: "", TgianKetThuc: "", TrangThai: "Chờ duyệt" });
    setShowDangKyTham(false);
    const dangkythamnguoithan = await getByIdDangKyThamSinhVien(userMaSV);
      setdangkytham(dangkythamnguoithan);
  } catch (err) {
    toast.error("Lỗi khi gửi đăng ký:",err);
  }
  };
  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-infor">
            <div className="profile-card">
    <img src={`http://localhost:3000/uploads/${sinhvienuser.anh}`} alt="Avatar" className="profile-avatar" />
    <p className="profile-status">{sinhvienuser.TrangThai}</p>
    <div className="info">
      <p><strong>{sinhvienuser.HoTen }</strong></p>
      <p>📞 {sinhvienuser.SDT}</p>
      <p>📧 {sinhvienuser.Email}</p>
      <p>🎂 {new Date(sinhvienuser.NgaySinh).toLocaleDateString('vi-VN')}</p>
      <p>📍 {sinhvienuser.QueQuan}</p>
      <p>👤 {sinhvienuser.GioiTinh}</p>
      <p>🏫 {sinhvienuser.Truong }</p>
      <p>🚪 {sinhvienuser.Lop}</p>
      <p>🕰️ {sinhvienuser.NienKhoa}</p>
    </div>
    <div className="join-date">
      {/* <p className="label">Ngày nhận phòng</p>
      <p className="date">{new Date(sinhvienuser.NgayBatDau).toLocaleDateString('vi-VN')}</p> */}
    </div>
    <button className="logout" onClick={handleLogout}>Đăng xuất</button>
            </div>
          </div>
        </div>
        <div className="profile-component">
          <div className="room-component">
            <h3>🗂️Thông tin phòng ở</h3>
            <p>✏️Tòa nhà:{sinhvienuser.TenTN}  - <span>Tên Phòng:{sinhvienuser.TenPhong}</span></p>
            <p>✏️Danh sách thành viên cùng phòng</p>
            <table>
              <thead>
              <tr>
                <th>STT</th>
                <th>Họ & Tên</th>
                <th>Ngày Sinh</th>
                <th>Trường</th>
                <th>Ngày Vào</th>
                <th>Ngày Hết Hạn</th>
                <th>TrangThai</th>
              </tr>
              </thead>
              {tenphongtenTNuser.map((sv, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{sv.HoTen}</td>
    <td>{new Date(sv.NgaySinh).toLocaleDateString('vi-VN')}</td>
    <td>{sv.Truong}</td>
    <td>{new Date(sv.NgayBatDau).toLocaleDateString('vi-VN')}</td>
    <td>{new Date(sv.NgayKetThuc).toLocaleDateString('vi-VN')}</td>
    <td>{sv.trangthaihopdong}</td>
  </tr>
              ))}
            </table>
            <p>✏️Lịch sử sửa chữa phòng</p>
            <table>
              <thead>
              <tr>
                <th>STT</th>
                <th>NoiDung</th>
                <th>Thời gian thông báo</th>
                <th>Thời gian bảo trì</th>
                <th>Trạng Thái</th>
              </tr>
              </thead>
              {baotriphong.map((sv, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{sv.NoiDung}</td>
                <td>{new Date(sv.ThoiGian).toLocaleDateString('vi-VN')}</td>
                <td>{new Date(sv.TgianBaoTri).toLocaleDateString('vi-VN')}</td>
                <td>{sv.TrangThai}</td>
              </tr>
              ))}
            </table>
            <div className="expand-buttons">
              <button className="expand-btn"  onClick={handleOpenDangKySuaChua}>Đăng ký sửa chữa phòng</button>
            </div>
            {showDangKySuaChua && (
            <div className="modal">
              <div className="modal-content">
                <h3>Đăng ký sửa chữa phòng</h3>
                <textarea value={noiDungSuaChua} onChange={e => setNoiDungSuaChua(e.target.value)} placeholder="Nhập nội dung sửa chữa..." rows={4} style={{ width: "100%" }} />
                <div className="expand-buttons">
                  <button className="expand-btn" onClick={handleDangKySuaChua}>Gửi</button>
                  <button className="expand-btn" onClick={handleCloseDangKySuaChua}>Hủy</button>
                </div>
              </div>
            </div>
            )}
            <p>✏️Thông tin hóa đơn</p>
            <table>
              <tr>
                <th>STT</th>
                <th>Họ & Tên</th>
                <th>Ngày Sinh</th>
                <th>Trường</th>
                <th>Ngày Vào</th>
                <th>Ngày Vào</th>
                <th colSpan="2">Chức năng</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Đàm Thị Nga</td>
                <td>19/05/2003</td>
                <td>Trường cao đẳng nghề bách khoa hà nội</td>
                <td>18/8/2025</td>
                <td>18/8/2025</td>
                <td><button className="expand-btn">Thanh Toán</button></td>
              </tr>
            </table>
          </div>
          <div className="contract-component">
            <h3>🗂️Thông tin hợp đồng</h3>
            <p>✏️Chi tiết hồ sơ </p>
            <table>
              <tr>
                <td>Đơn Xin</td>
                <td><button className="file-link" onClick={() => handleOpenImage(`http://localhost:3000/uploads/${hoso.DonXin}`)}>{hoso.DonXin}</button></td>
              </tr>
              <tr>
                <td>Giấy xác nhận sinh viên</td>
                <td><button className="file-link" onClick={() => handleOpenImage(`http://localhost:3000/uploads/${hoso.GiayXacNhanSinhVien}`)}>{hoso.GiayXacNhanSinhVien}</button></td>
              </tr>
              <tr>
                <td>CCCD PhoTo</td>
                <td><button className="file-link" onClick={() => handleOpenImage(`http://localhost:3000/uploads/${hoso.CCCDPhoTo}`)}>{hoso.CCCDPhoTo}</button></td>
              </tr>
              <tr>
                <td>Hợp Đồng</td>
                <td><button className="file-link" onClick={() => handleOpenImage(`http://localhost:3000/uploads/${hoso.HopDong}`)}>{hoso.HopDong}</button></td>
              </tr>
            </table>
            <div className="expand-buttons">
              <button className="expand-btn">Thanh lý</button>
              <button className="expand-btn" onClick={handleThanhToan}>Gia Hạn</button>
            </div>
            {openImage && (
        <div className="dialog-overlay" onClick={handleCloseImage}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            {
              openImage.endsWith('.pdf') ? (
                <iframe src={openImage} width="100%" height="500px" title="PDF Preview" />
              ) : (
                <img src={openImage} alt="Preview" style={{ maxWidth: "100%", maxHeight: "500px" }} />
              )
            }
          </div>
        </div>
            )}
          </div>
          <div className="service-component">
            <h3>🗂️Thông tin dịch vụ</h3>
            <p>✏️Danh sách dịch vụ đã đăng ký </p>
            <table>
              <tr>
                <th>STT</th>
                <th>Họ & Tên</th>
                <th>Ngày Sinh</th>
                <th>Trường</th>
                <th>Ngày Vào</th>
                <th>Ngày Vào</th>
                <th colSpan="2">Chức năng</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Đàm Thị Nga</td>
                <td>19/05/2003</td>
                <td>Trường cao đẳng nghề bách khoa hà nội</td>
                <td>18/8/2025</td>
                <td>18/8/2025</td>
                <td><button className="expand-btn">Gia Hạn</button></td>
                <td><button className="expand-btn">Hủy Đăng Ký</button></td>
              </tr>
            </table>
            <div className="expand-buttons">
              <button className="expand-btn">Đăng ký thêm dịch vụ</button>
            </div>
            </div>
          <div className="support-component">
            <h3>🗂️Góp Ý - Phản Hồi</h3>
            <p>✏️Lịch sử góp ý  </p>
            <table>
              <tr>
                <th>STT</th>
                <th>Nội Dung</th>
                <th>Thời gian</th>
                <th>Chức năng</th>
              </tr>
              {gopy.map((sv, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sv.NoiDung}</td>
                  <td>{new Date(sv.Tgian).toLocaleDateString('vi-VN')}</td>
                  <td><button className="expand-btn" onClick={() => handleEditClick(sv)}>Sửa</button></td>
                  {editData && (
                    <div className="modal">
                      <div className="modal-content">
                    <h4>Sửa góp ý</h4>
                    <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} rows={4} style={{ width: "100%" }} />
                    <br/>
                    <div className="expand-buttons">
                      <button className="expand-btn" onClick={handleEditSubmit}>Lưu</button>
                      <button onClick={() => setEditData(null)}>Hủy</button>
                    </div>
                      </div>
                    </div>
                    )}
                </tr>
              ))}
            </table>
            <div className="expand-buttons">
              <button className="expand-btn"onClick={handleOpenDangKyGopY}>Thêm </button>
            </div>
            {showDangKyGopY && (
            <div className="modal">
              <div className="modal-content">
                <h3>Đăng ký Góp Ý</h3>
                <textarea value={noiDungGopY} onChange={e => setNoiDungGopY(e.target.value)} placeholder="Nhập nội dung góp ý..." rows={4} style={{ width: "100%" }} />
                <div className="expand-buttons">
                  <button className="expand-btn" onClick={handleDangKyGopY}>Gửi</button>
                  <button className="expand-btn" onClick={handleCloseDangKyGopY}>Hủy</button>
                </div>
              </div>
            </div>
            )}
            </div>
          <div className="relative-component">
            <h3>🗂️Người thân</h3>
            <p>✏️Danh sách người thân </p>
            <table>
              <tr>
                <th>STT</th>
                <th>Họ & Tên</th>
                <th>SDT</th>
                <th>Địa Chỉ</th>
                <th>Quan Hệ</th>
              </tr>
              {nguoithan.map((sv, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sv.HoTen}</td>
                  <td>{sv.SDT}</td>
                  <td>{sv.DiaChi}</td>
                  <td>{sv.QuanHe}</td>
                </tr>
              ))}
            </table>
            <p>✏️Lịch sử đăng ký thăm  </p>
            <table>
              <tr>
                <th>STT</th>
                <th>Họ & Tên</th>
                <th>Quan Hệ</th>
                <th>Tgian Bắt Đầu</th>
                <th>Tgian Kết TThúc </th>
                <th>Trang Thai</th>
              </tr>
              {dangkytham.map((sv, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{sv.HoTen}</td>
                <td>{sv.QuanHe}</td>
                <td>{new Date(sv.TgianBatDau).toLocaleDateString('vi-VN')}</td>
                <td>{new Date(sv.TgianKetThuc).toLocaleDateString('vi-VN')}</td>
                <td>{sv.TrangThai}</td>
              </tr>
              ))}
            </table>
            <div className="expand-buttons">
              <button className="expand-btn" onClick={handleOpenDangKyTham}>Đăng ký vào thăm </button>
            </div>
            {showDangKyTham && (
            <div className="modal">
              <div className="modal-content">
                <h3>Đăng ký Góp Ý</h3>
                <label>Người thân:</label>
                <select value={noiDungDangKyTham.MaNT}
                  onChange={(e) => setNoiDungDangKyTham({...noiDungDangKyTham,MaNT:e.target.value})}
                >
                  <option value="">-- Chọn người thân --</option>
                    {nguoithan.map(loai => (
                  <option key={loai.id} value={loai.id}>
                        {loai.HoTen}
                  </option>
                  ))}
                </select><br/>
                <label>Thời gian bắt đầu:</label>
                <input  type="date"  name="TgianBatDau"  value={noiDungDangKyTham.TgianBatDau}  onChange={e =>  setNoiDungDangKyTham({...noiDungDangKyTham,TgianBatDau:e.target.value})}/><br/>
                <label>Thời gian kết thúc:</label>
                <input type="date"  name="TgianKetThuc"  value={noiDungDangKyTham.TgianKetThuc} onChange={e =>  setNoiDungDangKyTham({...noiDungDangKyTham,TgianKetThuc:e.target.value})} /><br/>
                <div className="expand-buttons">
                  <button className="expand-btn" onClick={handleDangKyTham}>Gửi</button>
                  <button className="expand-btn" onClick={handleCloseDangKyTham}>Hủy</button>
                </div>
              </div>
            </div>
            )}
            </div>
          <div className="discipline-component">
            <h3>🗂️Kỷ luật</h3>
            <p>✏️Lịch sử kỉ luật </p>
            <table>
              <tr>
                <th>STT</th>
                <th>Nội Dung</th>
                <th>Ngày Vi Phạm</th>
                <th>Hình Thức Xử Lý</th>
              </tr>
              {kyluat.map((sv, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{sv.NoiDungViPham}</td>
                <td>{new Date(sv.NgayViPham).toLocaleDateString('vi-VN')}</td>
                <td>{sv.HinhThucXuLy}</td>
              </tr>
              ))}
            </table>
            </div>
          <div className="history-component">
            <h3>🗂️Lịch Sử Ra / Vào</h3>
            <table>
              <tr>
                <th>Loại Hoạt Động</th>
                <th>Tgian</th>
                <th>Trạng Thái</th>
              </tr>
              {lichsuravao.map((sv, index) => (
              <tr key={index}>
                <td>{sv.LoaiHoatDong}</td>
                <td>{new Date(sv.Tgian).toLocaleDateString('vi-VN')}</td>
                <td>{sv.TrangThai}</td>
              </tr>
              ))}
            </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LakeProfile;
 