import { useState,useEffect } from 'react';
import "./BillManagment.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {createHoaDon, getAllHoaDon, editHoaDon, removeHoaDon} from "../../../routes/hoadon";
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { usePhongContext } from '../../../context/PhongContext.jsx';
import {getAll} from "../../../routes/toanha";
import {getAllPhong} from "../../../routes/phong";
import Report from "../../../component/Report/Report.jsx";
import {createChiTietHoaDon,getAllChiTietHoaDon,getAllChiTietHoaDonData} from "../../../routes/chitiethoadon.js";
const BillManagment = () => {
  const token = localStorage.getItem('token');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditModalOpenHoaDon, setIsEditModalOpenHoaDon] = useState(false);
  const [editingHoaDon, setEditingHoaDon] = useState(null);
  const [showDeleteConfirmHoaDon, setShowDeleteConfirmHoaDon] = useState(false);
  const [roomToDeleteHoaDon, setRoomToDeleteHoaDon] = useState(null);
  const [isAddModalOpenHoaDon, setIsAddModalOpenHoaDon] = useState(false); 
  const [hoadonlist, sethoadonlist] = useState([]);
  const [showImportDialogHoaDon, setShowImportDialogHoaDon] = useState(false);
  const [excelDataHoaDon, setExcelDataHoaDon] = useState([]);
  const [selectedHoaDon, setSelectedHoaDon] = useState(null);
  const [showViewDialogHoaDon, setShowViewDialogHoaDon] = useState(false);
  const {phongTheoToa, setPhongTheoToa,selectedMaTN, setSelectedMaTN } = usePhongContext();
  const [toaNhaList, setToaNhaList] = useState([]);
  const [phonglist, setphonglist] = useState([]);
  const [cthd,setcthd]= useState([]);
  const [showReport, setShowReport] = useState(false);
  const handleDeleteHoaDon = (room) => {
          setRoomToDeleteHoaDon(room);
          setShowDeleteConfirmHoaDon(true);
      };
  const confirmDeleteHoaDon = async () => {
    try {
      await removeHoaDon(roomToDeleteHoaDon.id, token);
      const updatedList = await getAllHoaDon(token);
      sethoadonlist(updatedList);
      toast.success("Xóa thành công");
    } catch (err) {
      toast.error(`Lỗi: ${err?.response?.data?.message || err.message || 'Không thể xóa'}`);
    } finally {
      setShowDeleteConfirmHoaDon(false);
      setRoomToDeleteHoaDon(null);
    }
  };
  const cancelDeleteHoaDon = () => {
          setShowDeleteConfirmHoaDon(false);
          setRoomToDeleteHoaDon(null);
      };
  const handleEditHoaDon = (room) => {
          setEditingHoaDon(room);
          console.log(room);
          setIsEditModalOpenHoaDon(true);
      };
  const handleSaveEditHoaDon = async () => {
  if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
  try {
    await editHoaDon(editingHoaDon.id, {
      MaPhong: editingHoaDon.MaPhong,
      MaNguoiLap: editingHoaDon.MaNguoiLap,
      TrangThai: editingHoaDon.TrangThai,
      NgayThanhToan: editingHoaDon.NgayThanhToan,
      GhiChu: editingHoaDon.GhiChu,
      TgianBatDau: editingHoaDon.TgianBatDau,
      TgianKetThuc: editingHoaDon.TgianKetThuc,
      SoNuocDau: editingHoaDon.SoNuocDau,
      SoNuocSau: editingHoaDon.SoNuocSau,
      SoDienDau: editingHoaDon.SoDienDau,
      SoDienSau: editingHoaDon.SoDienSau,
      }, token);
      toast.success("Sửa thành công");
      const updatedList = await getAllHoaDon(token);
      sethoadonlist(updatedList);
      setIsEditModalOpenHoaDon(false);
      setEditingHoaDon(null);
    } catch (err) {
      toast.error(`Lỗi: ${err?.response?.data?.message || err.message || 'Không thể cập nhật hóa đơn'}`);
    }
  };
  const handleCloseEditHoaDon = () => {
          setIsEditModalOpenHoaDon(false);
          setEditingHoaDon(null);
      };
  const handleAddHoaDon = () => {
          setEditingHoaDon({ MaPhong:" ",TrangThai:"Chưa Thanh Toán", GhiChu:"",TgianBatDau:"", TgianKetThuc:"",SoNuocDau:"",SoNuocSau:"",SoDienDau:"",SoDienSau:"" });
          setIsAddModalOpenHoaDon(true);
      };
  const handleCloseAddHoaDon = () => {
          setIsAddModalOpenHoaDon(false);
          setEditingHoaDon(null);
      };
  const handleCreateHoaDon = async () => {
  if (!window.confirm('Bạn có chắc muốn thêm hóa đơn này không?')) return;
  try {
    const newHoaDon = await createHoaDon(editingHoaDon, token);
    const hoaDonID = newHoaDon.data.id;
    console.log(newHoaDon);
    await createChiTietHoaDon({
      MaHD: hoaDonID,
      TenKhoanThu: "Nước",
      SoDau: editingHoaDon.SoNuocDau,
      SoSau: editingHoaDon.SoNuocSau,
      DonGia:30000,
    }, token);
    await createChiTietHoaDon({
      MaHD: hoaDonID,
      TenKhoanThu: "Điện",
      SoDau: editingHoaDon.SoDienDau,
      SoSau: editingHoaDon.SoDienSau,
      DonGia:2500,
    }, token);
    const updatedList = await getAllHoaDon(token);
    sethoadonlist(updatedList);
    toast.success("Thêm hóa đơn và chi tiết thành công");
    setIsAddModalOpenHoaDon(false);
    setEditingHoaDon(null);
  } catch (err) {
    const message = err?.message || err?.error || err?.msg || "Đã xảy ra lỗi khi thêm hóa đơn";
    toast.error(`Lỗi: ${message}`);
    console.error(err);
  }
  };
  useEffect(() => {
  const fetchHoaDon = async () => {
    try {
      const data = await getAllHoaDon(token); 
      const hoaDonWithChiTiet = await Promise.all(
        data.map(async (hd) => {
          const chiTiet = await getAllChiTietHoaDonData(hd.id, token);
          return { ...hd, chiTiet };
        })
      );
      sethoadonlist(hoaDonWithChiTiet);
    } catch (err) {
      toast.error("Lỗi khi tải danh sách hóa đơn hoặc chi tiết");
    } finally {
      setLoading(false);
    }
  };
  fetchHoaDon();
}, [token]);
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
          const data = await getAllPhong(token);
          setphonglist(data);
        } catch (err) {
          console.error('Lỗi khi tải danh sách:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchPhong();
  }, [token]);    
  useEffect(() => {
      const fetchToaNha = async () => {
        try {
          const data = await getAll(token);
          setToaNhaList(data);
        } catch (err) {
          console.error('Lỗi khi tải danh sách:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchToaNha();
  }, [token],);
  const handleImportExcelHoaDon = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const sheetName = wb.SheetNames[0];
            const sheet = wb.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
            setExcelDataHoaDon(data);
          };
          reader.readAsBinaryString(file);
  };
  const handleConfirmImportHoaDon = async () => {
    try {
      const grouped = excelDataHoaDon.reduce((acc, item) => {
        const key = `${item.TenToaNha}_${item.TenPhong}_${item.GhiChu}_${item.TgianBatDau}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});

      for (const key in grouped) {
        const group = grouped[key];
        const first = group[0];
        const toaNha = toaNhaList.find(
          t => t.TenTN.trim().toLowerCase() === first.TenTN.trim().toLowerCase()
        );
        if (!toaNha) {
          toast.error(`Không tìm thấy tòa nhà "${first.TenToaNha}"`);
          continue;
        }
        const phong = phonglist.find(
          p =>
            p.TenPhong.trim().toLowerCase() === first.TenPhong.trim().toLowerCase() &&
            p.MaToa === toaNha.MaToa
        );
        if (!phong) {
          toast.error(`Không tìm thấy phòng "${first.TenPhong}" trong tòa "${first.TenToaNha}"`);
          continue;
        }
        const hoaDon = await createHoaDon({
          MaPhong: phong.MaPhong,
          GhiChu: first.GhiChu,
          TgianBatDau: first.TgianBatDau,
          TgianKetThuc: first.TgianKetThuc,
          TrangThai: "Chưa Thanh Toán"
        }, token);
        const maHD = hoaDon.data.id;
        await Promise.all(
          group.map(item =>
            createChiTietHoaDon({
              MaHD: maHD,
              TenKhoanThu: item.TenKhoanThu,
              SoDau: item.SoDau,
              SoSau: item.SoSau,
              DonGia:item.DonGia
            }, token)
          )
        );
      }

      toast.success("Nhập dữ liệu thành công!");
      setShowImportDialogHoaDon(false);
      const updatedList = await getAllHoaDon(token);
      sethoadonlist(updatedList);
    } catch (error) {
      toast.error(`Lỗi khi nhập dữ liệu: ${error?.message || 'Không thể nhập file'}`);
      console.log(error);
    }
  };
  const handleExportExcelHoaDon = () => {
  const flattenedData = hoadonlist.flatMap(hd =>
    hd.chiTiet.map(ct => ({
      MaHD: hd.id,
      TenPhong: hd.TenPhong,
      TenTN: hd.TenTN,
      GhiChu: hd.GhiChu,
      TgianBatDau: hd.TgianBatDau,
      TgianKetThuc: hd.TgianKetThuc,
      TenKhoanThu: ct.TenKhoanThu,
      SoDau: ct.SoDau,
      SoSau: ct.SoSau,
      DonGia:ct.DonGia,
    }))
  );
  const ws = XLSX.utils.json_to_sheet(flattenedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Hóa Đơn");
  XLSX.writeFile(wb, "Danh_Sach_Hoa_Don.xlsx");
  };
  const hoadon = hoadonlist.filter(row =>
          Object.values(row).some(
            value =>
              typeof value === 'string' &&
              value.toLowerCase().includes(searchKeyword.toLowerCase())
          )
      );
  const fetchChiTietHoaDon = async (maHD) => {
      try {
        const data = await getAllChiTietHoaDon(token);
        console.log(maHD);
        const filtered = data.filter(item => item.MaHD === maHD);
        setcthd(filtered);
      } catch (err) {
        toast.error('Không thể tải chi tiết hóa đơn');
      }
    };
  return (
    <div className='bill'>
      <div className="bill_container">
        <Header_admin/>
        <div >
          <div className="top-bar">
            <button className='a' onClick={handleAddHoaDon}>➕Thêm</button>
            <button className='a' onClick={() => setShowImportDialogHoaDon(true)}>🗂️Nhập file Excel</button>
            <button className='a' onClick={handleExportExcelHoaDon}>📁Xuất File Excel</button>
            <button className='a' onClick={() => setShowReport(true)}> Xuất hóa đơn </button>
            <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          </div>
          <div className="room_table">
        <table>
          <thead>
            <tr>
              <th>STT</th> 
              <th>Tên Tòa Nhà</th>
              <th>Tên Phòng</th>
              <th>Thông Tin</th>
              <th colSpan="2">Thời gian chốt</th>
              <th>Tổng Tiền</th>
              <th>Ngày Thanh Toán</th>
              <th>Người Thanh Toán</th>
              <th>Trạng Thái</th>
              <th colSpan="2">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {hoadon.map((row, index) => (
            <tr key={row.id} onClick={(e) => {if (e.target.tagName !== 'BUTTON') { setSelectedHoaDon(row);fetchChiTietHoaDon(row.id);setShowViewDialogHoaDon(true);} }}>
                <td>{index + 1}</td>
                <td>{row.TenTN}</td>
                <td>{row.TenPhong}</td>
                <td>{row.GhiChu}</td>
                <td>{new Date(row.TgianBatDau).toLocaleDateString('vi-VN')}</td>
                <td>{new Date(row.TgianKetThuc).toLocaleDateString('vi-VN')}</td>
                <td>{row.TongTien}</td>
                <td>{row.NgayThanhToan && !isNaN(new Date(row.NgayThanhToan))   ? new Date(row.NgayThanhToan).toLocaleDateString("vi-VN") : ""}</td>
                <td>{row.Username}</td>
                <td className={`trangthai ${  row.TrangThai === 'Đã Thanh Toán' ? 'bg-green' :  row.TrangThai === 'Chưa Thanh Toán' ? 'bg-red' :  'bg-default'}`}> {row.TrangThai}</td>
                <td><button className='a' onClick={(e) => { e.stopPropagation(); handleEditHoaDon(row); }}>Sửa</button></td>
                <td><button className='a' onClick={(e) => { e.stopPropagation(); handleDeleteHoaDon(row); }}>Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
          {showDeleteConfirmHoaDon && (
          <div className="modal">
            <div className="modal-content">
              <h3>Bạn có chắc chắn muốn xóa hóa đơn này không?</h3>
              <button className='a' onClick={confirmDeleteHoaDon}>Xóa</button>
              <button className='a' onClick={cancelDeleteHoaDon}>Hủy</button>
            </div>
          </div>
          )}
          {isEditModalOpenHoaDon && (
        <div className="modal">
          <div className="modal-content-room">
            <h3>Sửa thông tin Hóa Đơn</h3>
            <label>Tòa Nhà:</label>
            <select value={selectedMaTN}
              onChange={(e) => { const maTN = e.target.value;  setSelectedMaTN(maTN);
                  setEditingHoaDon({ ...editingHoaDon, MaPhong: "" });
              }}>
              <option value="">-- Chọn tòa nhà --</option>
                {toaNhaList.map((loai) => (
                <option key={loai.MaTN} value={loai.MaTN}>{loai.TenTN} </option>
                ))}
            </select><br/>
            <label>Tên Phòng:</label>
            <select value={editingHoaDon.MaPhong}
              onChange={(e) => setEditingHoaDon({ ...editingHoaDon, MaPhong: e.target.value })}
            >
              <option value="">-- Chọn phòng --</option>
                {phongTheoToa.map((loai) => (
              <option key={loai.MaPhong} value={loai.MaPhong}>
                    {loai.TenPhong}
              </option>
              ))}
            </select>
            <label>Thông Tin:</label>
            <input type="text" value={editingHoaDon.GhiChu} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, GhiChu: e.target.value })} />
            <label>Thời gian chốt đầu:</label>
            <input type="date" value={editingHoaDon.TgianBatDau} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, TgianBatDau: e.target.value })} />
            <label>Thời gian chốt sau:</label>
            <input type="date" value={editingHoaDon.TgianKetThuc} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, TgianKetThuc: e.target.value })} />
            <label>Khối nước sử dụng đầu:</label>
            <input type="text" value={editingHoaDon.SoNuocDau} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, SoNuocDau: e.target.value })} />
            <label>Khối nước sử dụng sau:</label>
            <input type="text" value={editingHoaDon.SoNuocSau} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, SoNuocSau: e.target.value })} />
            <label>Số điện sử dụng đầu:</label>
            <input type="text" value={editingHoaDon.SoDienDau} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, SoDienDau: e.target.value })} />
            <label>Số điện sử dụng sau:</label>
            <input type="text" value={editingHoaDon.SoDienSau} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, SoDienSau: e.target.value })} />
            <label>Trạng Thái</label>
            <input type="text" value={editingHoaDon.TrangThai} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, TrangThai: e.target.value })} />
            <button className='a-btn' onClick={handleSaveEditHoaDon}>Lưu</button>
            <button className='a-btn' onClick={handleCloseEditHoaDon}>Thoát</button>
          </div>
        </div>
          )}
          {isAddModalOpenHoaDon && (
        <div className="modal">
          <div className="modal-content-room">
            <h3>Thêm Thông Tin Hóa Đơn</h3>
            <label>Tòa Nhà:</label>
            <select value={selectedMaTN}
              onChange={(e) => { const maTN = e.target.value;  setSelectedMaTN(maTN);
                  setEditingHoaDon({ ...editingHoaDon, MaPhong: "" });
              }}>
              <option value="">-- Chọn tòa nhà --</option>
                {toaNhaList.map((loai) => (
                <option key={loai.MaTN} value={loai.MaTN}>{loai.TenTN} </option>
                ))}
            </select><br/>
            <label>Tên Phòng:</label>
            <select value={editingHoaDon.MaPhong}
              onChange={(e) => setEditingHoaDon({ ...editingHoaDon, MaPhong: e.target.value })}
            >
              <option value="">-- Chọn phòng --</option>
                {phongTheoToa.map((loai) => (
              <option key={loai.MaPhong} value={loai.MaPhong}>
                    {loai.TenPhong}
              </option>
              ))}
            </select>
            <label>Thông Tin:</label>
            <input type="text" value={editingHoaDon.GhiChu} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, GhiChu: e.target.value })} />
            <label>Thời gian chốt đầu:</label>
            <input type="date" value={editingHoaDon.TgianBatDau} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, TgianBatDau: e.target.value })} />
            <label>Thời gian chốt sau:</label>
            <input type="date" value={editingHoaDon.TgianKetThuc} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, TgianKetThuc: e.target.value })} />
            <label>Khối nước sử dụng đầu:</label>
            <input type="text" value={editingHoaDon.SoNuocDau} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, SoNuocDau: e.target.value })} />
            <label>Khối nước sử dụng sau:</label>
            <input type="text" value={editingHoaDon.SoNuocSau} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, SoNuocSau: e.target.value })} />
            <label>Số điện sử dụng đầu:</label>
            <input type="text" value={editingHoaDon.SoDienDau} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, SoDienDau: e.target.value })} />
            <label>Số điện sử dụng sau:</label>
            <input type="text" value={editingHoaDon.SoDienSau} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, SoDienSau: e.target.value })} />
            <button className='a-btn' onClick={handleCreateHoaDon}>Lưu</button>
            <button className='a-btn' onClick={handleCloseAddHoaDon}>Thoát</button>
          </div>
        </div>
          )}
          {showImportDialogHoaDon && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nhập danh sách HoaDon từ Excel</h3>
            <input type="file" accept=".xlsx, .xls" onChange={handleImportExcelHoaDon} /><br />
            <button className="a" onClick={handleConfirmImportHoaDon }>Đồng Ý Nhập</button>
            <button className="a" onClick={() => setShowImportDialogHoaDon(false)}>Hủy</button>
          </div>
        </div>
          )}
          {showViewDialogHoaDon && (
            <div className="modal">
              <div className="modal-content">
                <h3>Chi tiết hóa đơn - Phòng: {selectedHoaDon?.TenPhong}</h3>
                <table className="cthd-table">
                  <thead>
                    <tr>
                      <th>Khoản Thu</th>
                      <th>Số Đầu</th>
                      <th>Số Sau</th>
                      <th>Đơn Giá</th>
                      <th>Thành Tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cthd.map((item, index) => {
                      const soDau = Number(item.SoDau || 0);
                      const soSau = Number(item.SoSau || 0);
                      const donGia = Number(item.DonGia || 0);
                      const thanhTien = (soSau - soDau) * donGia;
                      return (
                        <tr key={index}>
                          <td>{item.TenKhoanThu}</td>
                          <td>{item.SoDau}</td>
                          <td>{item.SoSau}</td>
                          <td>{item.DonGia.toLocaleString()}</td>
                          <td>{thanhTien.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button className='a' onClick={() => setShowViewDialogHoaDon(false)}>Đóng</button>
              </div>
            </div>
          )}
          {showReport && (
          <div className="modal-overlay"  onClick={() => setShowReport(false)}>
            <div className="modal-container">
                {<Report onClose={() => setShowReport(false)} data={hoadonlist} />}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default BillManagment

