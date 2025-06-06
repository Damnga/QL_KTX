import { useState,useEffect } from 'react';
import "./UserManagment.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {createSinhVien, getAllSinhVien,getAllSinhVienData, editSinhVien,removeSinhVien} from "../../../routes/sinhvien";
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import {getByIdSinhVienUser,getByIdTaiKhoanSinhVien} from "../../../routes/sinhvien";
import {getByIdTenPhongTenTN,getByIdTenPhong} from "../../../routes/phong";
import {getAllBaoTriPhong} from "../../../routes/baotri";
import {getByIdTaiKhoan} from "../../../routes/hopdong";
import {getAllGopYSinhVien} from "../../../routes/gopy";
import {getByIdNguoiThanSinhVien} from "../../../routes/nguoithan";
import {getByIdDangKyThamSinhVien} from "../../../routes/dangkytham";
import {getByIdKyLuatSinhVien} from "../../../routes/kyluat";
import {getByIdLichSuRaVaoSinhVien} from "../../../routes/lichsuravao";
const UserManagment = () => {
  const token = localStorage.getItem('token');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingSinhVien, setEditingSinhVien] = useState(null);
  const [isAddModalOpenSinhVien, setIsAddModalOpenSinhVien] = useState(false); 
  const [sinhviendatalist, setsinhviendatalist] = useState([]);
  const [sinhvienlist, setsinhvienlist] = useState([]);
  const [showImportDialogSinhVien, setShowImportDialogSinhVien] = useState(false);
  const [excelDataSinhVien, setExcelDataSinhVien] = useState([]);
  const [selectedSinhVien, setSelectedSinhVien] = useState(null);
  const [showViewDialogSinhVien, setShowViewDialogSinhVien] = useState(false);

  const handleAddSinhVien = () => {
        setEditingSinhVien({ MaSV:"", HoTen:"",NgaySinh:"" , QueQuan:"", GioiTinh:"", Email:"", CCCD:"", SDT:"", Truong:"", Lop:"", NienKhoa:"", anh:"", GhiChu:"  "  });
        setIsAddModalOpenSinhVien(true);
    };
  const handleCloseAddSinhVien = () => {
        setIsAddModalOpenSinhVien(false);
        setEditingSinhVien(null);
    };
  const handleCreateSinhVien = async () => {
        if (!window.confirm('Bạn có chắc muốn thêm sinh vien này không?')) return;
        try {
          await createSinhVien(editingSinhVien, token);
          const updatedList = await getAllSinhVien(token);
          setsinhvienlist(updatedList);
          const updateddataList = await getAllSinhVienData(token);
          setsinhviendatalist(updateddataList);
          setIsAddModalOpenSinhVien(false);
          setEditingSinhVien(null);
          toast.success('Thành công');
        } catch (err) {
           toast.error(err?.error || 'Có lỗi xảy ra!');
        }
    };
  useEffect(() => {
    const fetchSinhVien = async () => {
          try {
            const data = await getAllSinhVien(token);
            setsinhvienlist(data);
            const datalist = await getAllSinhVienData(token);
            setsinhviendatalist(datalist);
          } catch (err) {
            toast.error(err);
          } finally {
            setLoading(false);
          }
        };
        fetchSinhVien();
    }, [token]);
  const handleImportExcelSinhVien = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const sheetName = wb.SheetNames[0];
          const sheet = wb.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet);
          setExcelDataSinhVien(data);
        };
        reader.readAsBinaryString(file);
    };
  const handleConfirmImportSinhVien = async () => {
        try {
          await Promise.all(excelDataSinhVien.map(async (item) => {
            if (item.MaSV, item.HoTen, item.QueQuan, item.GioiTinh, item.Email, item.CCCD, item.SDT, item.Truong, item.Lop, item.NienKhoa, item.anh, item.MaND) {
              await createSinhVien({ 
                MaSV: item.MaSV,
                HoTen: item.HoTen,
                QueQuan: item.QueQuan,
                GioiTinh: item.GioiTinh,
                Email: item.Email,
                CCCD: item.CCCD,
                SDT: item.SDT,
                Truong: item.Truong,
                Lop: item.Lop,
                NienKhoa: item.NienKhoa,
                anh: item.anh,
                GhiChu: item.GhiChu,
                MaND: item.MaND,
              },token);
            } else {
              console.warn("Thiếu du lieu:", item);
            }
          }));
          alert('Nhập dữ liệu thành công!');
          setShowImportDialogSinhVien(false);
          const updatedList = await getAllSinhVien(token);
          setsinhvienlist(updatedList);
        } catch (error) {
          console.error('Lỗi khi nhập dữ liệu:', error);
          alert('Có lỗi xảy ra khi nhập dữ liệu!');
        }
    };
  const handleExportExcelSinhVien = () => {
      const ws = XLSX.utils.json_to_sheet(sinhvienlist); 
      const wb = XLSX.utils.book_new(); 
      XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Sinh Vien");
      XLSX.writeFile(wb, 'Danh_Sach_Sinh_Vien.xlsx');
    };
  const sinhviendata = sinhviendatalist.filter(row =>
        Object.values(row).some(
          value =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchKeyword.toLowerCase())
        )
    );
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
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const tksv = await getByIdTaiKhoanSinhVien(selectedSinhVien?.id);
      console.log("dgsdgsd",tksv);
      const sinvienuser = await getByIdSinhVienUser(tksv.MaTK);
      const sinhvienValue = Array.isArray(sinvienuser)
        ? sinvienuser[0]
        : sinvienuser;
      setSinhvienuser(sinhvienValue);
      const tenphongtenTN = await getByIdTenPhongTenTN(sinhvienValue.TenPhong,sinhvienValue.TenTN);
      settenphongtenTNuser(tenphongtenTN);
      const baotri = await getAllBaoTriPhong(sinhvienValue.TenPhong,sinhvienValue.TenTN);
      setbaotriphong(baotri);
      const hosotaikhoan = await getByIdTaiKhoan(tksv.MaTK);
      sethoso(hosotaikhoan);
      const gopysinhvien = await getAllGopYSinhVien(selectedSinhVien?.id);
      setgopy(gopysinhvien);
      const nguoithansinhvien = await getByIdNguoiThanSinhVien(selectedSinhVien?.id);
      setnguithan(nguoithansinhvien);
      const dangkythamnguoithan = await getByIdDangKyThamSinhVien(selectedSinhVien?.id);
      setdangkytham(dangkythamnguoithan);
      const kyluatsinhvien = await getByIdKyLuatSinhVien(selectedSinhVien?.id);
      setkyluat(kyluatsinhvien);
      const lichsuravaosinhvien = await getByIdLichSuRaVaoSinhVien(selectedSinhVien?.id);
      setlichsuravao(lichsuravaosinhvien);
      const maphongsinhvien = await getByIdTenPhong(selectedSinhVien?.id);
      setmaphongbytksinhvien(maphongsinhvien);
    } catch (err) {
      toast.error(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchUser();
  }, [token,selectedSinhVien]);
  const [showDangKySuaChua, setShowDangKySuaChua] = useState(false);
  const [noiDungSuaChua, setNoiDungSuaChua] = useState("");
  const handleOpenDangKySuaChua = () => setShowDangKySuaChua(true);
  const handleCloseDangKySuaChua = () => setShowDangKySuaChua(false);
  if (loading) return <p>Đang tải...</p>;
  return (
    <div className='user'>
      <div className="user_container">
        <Header_admin/>
        <div >
          <div className="top-bar">
            <button className='a' onClick={handleAddSinhVien}>➕Thêm</button>
            <button className='a' onClick={() => setShowImportDialogSinhVien(true)}>🗂️Nhập file Excel</button>
            <button className='a' onClick={handleExportExcelSinhVien}>📁Xuất File Excel</button>
            <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          </div>
          <div className="room_table">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh</th>
              <th>Họ Tên</th>
              <th>Ngày Sinh</th>
              <th>Giới Tính</th>
              <th>Quê Quán</th>
              <th>Phòng đang ở</th>
              <th>Trạng Thái Hợp Đồng</th>
            </tr>
          </thead>
          <tbody>
            {sinhviendata.map((row, index) => (
              <tr key={row.id} onClick={(e) => { if (e.target.tagName !== 'BUTTON') { setSelectedSinhVien(row);  setShowViewDialogSinhVien(true)}}}>
                <td>{index + 1}</td>
                <td><img src={`http://localhost:3000/uploads/${row.anh}`} alt="Ảnh sinh viên"  style={{ width: '80px', height: '60px', objectFit: 'cover' }} /></td>
                <td>{row.HoTen}</td>
                <td>{new Date(row.NgaySinh).toLocaleDateString('vi-VN')}</td>
                <td>{row.GioiTinh}</td>
                <td>{row.QueQuan}</td>
                <td>{row.TenPhong}</td>
                <td className={`trangthai ${  row.TrangThai === 'Đã Nhận Phòng' ? 'bg-green' :  row.TrangThai === 'Hết hạn' ? 'bg-red' : row.TrangThai === 'Sắp hết hạn' ? 'bg-yellow'  :  'bg-default'}`}> {row.TrangThai}</td>
              </tr>
            ))}
          </tbody>
          </table>
          </div>
          {isAddModalOpenSinhVien && (
        <div className="modal">
          <div className="modal-content-room">
            <h3>THÊM THÔNG TIN SINH VIÊN</h3>
            <label>Mã Sinh Viên:</label>
            <input type="text" value={editingSinhVien.MaSV} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, MaSV: e.target.value })} /><br/>
            <label>Họ Tên Sinh Viên:</label>
            <input type="text" value={editingSinhVien.HoTen} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, HoTen: e.target.value })} /><br/>
            <label>Ngày Sinh:</label>
            <input type="date" value={editingSinhVien.NgaySinh} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, NgaySinh: e.target.value })} /><br/>
            <label>Quê Quán :</label>
            <input type="text" value={editingSinhVien.QueQuan} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, QueQuan: e.target.value })} /><br/>
            <label>Giới Tính:</label>
            <select value={editingSinhVien.GioiTinh} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, GioiTinh: e.target.value })}>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </select><br/>
            <label>Email:</label>
            <input type="text" value={editingSinhVien.Email} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, Email: e.target.value })} /><br/>
            <label>CCCD:</label>
            <input type="text" value={editingSinhVien.CCCD} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, CCCD: e.target.value })} /><br/>
            <label>SDT:</label>
            <input type="text" value={editingSinhVien.SDT} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, SDT: e.target.value })} /><br/>
            <label>Trường:</label>
            <input type="text" value={editingSinhVien.Truong} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, Truong: e.target.value })} /><br/>
            <label>Lớp:</label>
            <input type="text" value={editingSinhVien.Lop} onChange={(e) => setEditingSinhVien({ ...editingSinhVien,  Lop: e.target.value })} /><br/>
            <label>Niên Khóa:</label>
            <input type="text" value={editingSinhVien.NienKhoa} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, NienKhoa: e.target.value })} /><br/>
            <label>Ảnh:</label>
            <input type="file" onChange={(e) => setEditingSinhVien({ ...editingSinhVien, anh: e.target.files[0] })} /><br/>
            <label>Ghi Chú:</label>
            <input type="text" value={editingSinhVien.GhiChu} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, GhiChu: e.target.value })} /><br/>
            <button className='a-btn' onClick={handleCreateSinhVien}>Lưu</button>
            <button className='a-btn' onClick={handleCloseAddSinhVien}>Thoát</button>
          </div>
        </div>
          )}
          {showImportDialogSinhVien && (
        <div className="modal">
          <div className="modal-content-excel">
            <h3>Nhập danh sách Sinh Viên từ Excel</h3>
            <input type="file" accept=".xlsx, .xls" onChange={handleImportExcelSinhVien} /><br />
            <button className="a-btn" onClick={handleConfirmImportSinhVien }>Đồng Ý Nhập</button>
            <button className="a-btn" onClick={() => setShowImportDialogSinhVien(false)}>Hủy</button>
          </div>
        </div>
          )}
          {showViewDialogSinhVien && (
  <div className="modal">
    <div className="modal-content-user">
      <div className="profile-user">
        <div className="profile-container-user">
          <div className="profile-sidebar-user">
                <div className="profile-infor-user ">
                  <div className="profile-card">
          <img src={`http://localhost:3000/uploads/${sinhvienuser.anh}`} alt="Avatar" className="profile-avatar" />
          <p className={`trangthai ${ sinhvienuser.TrangThai === 'Đã Nhận Phòng' ? 'bg-green' :  sinhvienuser.TrangThai === 'Hết hạn' ? 'bg-red' : sinhvienuser.TrangThai === 'Sắp hết hạn' ? 'bg-yellow'  :  'bg-default'}`}>{sinhvienuser.TrangThai} </p>    
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
          </div>
          <button className="logout-admin" onClick={() => setShowViewDialogSinhVien(false)}>Chỉnh sửa</button>
            <button className="logout-admin" onClick={() => setShowViewDialogSinhVien(false)}>Đóng</button>
          </div>
          </div>
          </div>
          <div className="profile-component-user">
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
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Đàm Thị Nga</td>
                      <td>19/05/2003</td>
                      <td>Trường cao đẳng nghề bách khoa hà nội</td>
                      <td>18/8/2025</td>
                      <td>18/8/2025</td>
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
                    <button className="expand-btn">Chỉnh sửa</button>
                  </div>
                  {openImage && (
              <div className="dialog-overlay" onClick={handleCloseImage}>
                <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                  {openImage.endsWith('.pdf') ? (  <iframe src={openImage} width="100%" height="500px" title="PDF Preview" />
                  ) : (  <img src={openImage} alt="Preview" style={{ maxWidth: "100%", maxHeight: "500px" }} />  )
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
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Đàm Thị Nga</td>
                      <td>19/05/2003</td>
                      <td>Trường cao đẳng nghề bách khoa hà nội</td>
                      <td>18/8/2025</td>
                      <td>18/8/2025</td>
                    </tr>
                  </table>
            </div>
            <div className="support-component">
                  <h3>🗂️Góp Ý - Phản Hồi</h3>
                  <p>✏️Lịch sử góp ý  </p>
                  <table>
                    <tr>
                      <th>STT</th>
                      <th>Nội Dung</th>
                      <th>Thời gian</th>
                    </tr>
                    {gopy.map((sv, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{sv.NoiDung}</td>
                        <td>{new Date(sv.Tgian).toLocaleDateString('vi-VN')}</td>
                      </tr>
                    ))}
                  </table>
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
                  <div className="expand-buttons">
                    <button className="expand-btn">Chỉnh sửa thông tin </button>
                  </div>
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
                      <th>Chức năng</th>
                    </tr>
                    {kyluat.map((sv, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{sv.NoiDungViPham}</td>
                      <td>{new Date(sv.NgayViPham).toLocaleDateString('vi-VN')}</td>
                      <td>{sv.HinhThucXuLy}</td>
                      <td><button className="expand-btn">Sửa</button></td>
                      <td><button className="expand-btn">Xóa</button></td>
                    </tr>
                    ))}
                  </table>
                  <div className="expand-buttons">
                    <button className="expand-btn">Thêm kỉ luật </button>
                  </div>
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
    </div>
  </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserManagment