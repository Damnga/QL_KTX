import React, { useState,useEffect } from 'react';
import "./BillManagment.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {createHoaDon, getAllHoaDon, editHoaDon, removeHoaDon} from "../../../routes/hoadon";
import * as XLSX from 'xlsx';
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
  
  const handleDeleteHoaDon = (room) => {
          setRoomToDeleteHoaDon(room);
          setShowDeleteConfirmHoaDon(true);
      };
  const confirmDeleteHoaDon = async () => {
          try {
            await removeHoaDon(roomToDeleteHoaDon.id, token);
            const updatedList = await getAllHoaDon(token);
            sethoadonlist(updatedList);
          } catch (err) {
            console.error('Lỗi khi xóa:', err);
            alert('Không thể xóa hóa đơn');
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
          setIsEditModalOpenHoaDon(true);
      };
  const handleSaveEditHoaDon = async () => {
          if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
          try {
            await editHoaDon(editingHoaDon.id, { 
              MaPhong: editingHoaDon.MaSV,
              NgayLapNgayLap: editingHoaDon.HoTen,
              MaNguoiLap: editingHoaDon.QueQuan,
              TrangThai: editingHoaDon.GioiTinh,
              NgayThanhToan: editingHoaDon.GioiTinh,
              GhiChu: editingHoaDon.GhiChu,
              TgianBatDau: editingHoaDon.GioiTinh,
              TgianKetThuc: editingHoaDon.GhiChu,
              }, token);
            const updatedList = await getAllHoaDon(token);
            sethoadonlist(updatedList);
            setIsEditModalOpenHoaDon(false);
            setEditingHoaDon(null);
          } catch (err) {
            console.error('Lỗi khi cập nhật:', err);
            alert('Không thể cập nhật thông tin');
          }
      };
  const handleCloseEditHoaDon = () => {
          setIsEditModalOpenHoaDon(false);
          setEditingHoaDon(null);
      };
  const handleAddHoaDon = () => {
          setEditingHoaDon({ MaPhong:" ", NgayLap:"", MaNguoiLap:"3", TrangThai:"", NgayThanhToan:"",GhiChu:"",TgianBatDau:"", TgianKetThuc:"" });
          setIsAddModalOpenHoaDon(true);
      };
  const handleCloseAddHoaDon = () => {
          setIsAddModalOpenHoaDon(false);
          setEditingHoaDon(null);
      };
  const handleCreateHoaDon = async () => {
          if (!window.confirm('Bạn có chắc muốn thêm hoa don này không?')) return;
          try {
            await createHoaDon(editingHoaDon, token);
            const updatedList = await getAllHoaDon(token);
            sethoadonlist(updatedList);
            setIsAddModalOpenHoaDon(false);
            setEditingHoaDon(null);
          } catch (err) {
            console.error('Lỗi khi tạo mới:', err);
            alert('Lỗi khi tạo mới');
          }
      };
  useEffect(() => {
      const fetchHoaDon = async () => {
            try {
              const data = await getAllHoaDon(token);
              sethoadonlist(data);
            } catch (err) {
              console.error('Lỗi khi tải danh sách:', err);
            } finally {
              setLoading(false);
            }
          };
          fetchHoaDon();
      }, [token]);
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
            await Promise.all(excelDataHoaDon.map(async (item) => {
                await createHoaDon({ 
                  MaPhong: item.MaPhong,
                  NgayLap: item.NgayLap,
                  MaNguoiLap: item.MaNguoiLap,
                  TrangThai: item.TrangThai,
                  NgayThanhToan: item.NgayThanhToan,
                  GhiChu: item.GhiChu,
                  TgianBatDau: item.TgianBatDau,
                  TgianKetThuc: item.TgianKetThuc,
                },token);
            }));
            alert('Nhập dữ liệu thành công!');
            setShowImportDialogHoaDon(false);
            const updatedList = await getAllHoaDon(token);
            sethoadonlist(updatedList);
          } catch (error) {
            console.error('Lỗi khi nhập dữ liệu:', error);
            alert('Có lỗi xảy ra khi nhập dữ liệu!');
          }
      };
  const handleExportExcelHoaDon = () => {
        const ws = XLSX.utils.json_to_sheet(sinhvienlist); 
        const wb = XLSX.utils.book_new(); 
        XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Sinh Vien");
        XLSX.writeFile(wb, 'Danh_Sach_Sinh_Vien.xlsx');
      };
  const hoadon = hoadonlist.filter(row =>
          Object.values(row).some(
            value =>
              typeof value === 'string' &&
              value.toLowerCase().includes(searchKeyword.toLowerCase())
          )
      );
  return (
    <div className='bill'>
      <div className="bill_container">
        <Header_admin/>
        <div >
          <div className="top-bar">
            <button className='a' onClick={handleAddHoaDon}>➕Thêm</button>
            <button className='a' onClick={() => setShowImportDialogHoaDon(true)}>🗂️Nhập file Excel</button>
            <button className='a' onClick={handleExportExcelHoaDon}>📁Xuất File Excel</button>
            <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          </div>
          <div className="room_table">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Phòng</th>
              <th>Ngày Lập</th>
              <th>Mã Người Lập</th>
              <th>Trạng Thái</th>
              <th>NgàY Thanh Toán</th>
              <th>Ghi Chú</th>
              <th>Thời gian bắt đầu</th>
              <th>Thời gian kết thúc</th>
              <th colSpan="2">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {hoadon.map((row, index) => (
            <tr key={row.id} onClick={(e) => {
    if (e.target.tagName !== 'BUTTON') {
      setSelectedHoaDon(row);
      setShowViewDialogHoaDon(true);
    }
  }}>
                <td>{index + 1}</td>
                <td>{row.MaPhong}</td>
                <td>{row.NgayLap}</td>
                <td>{row.MaNguoiLap}</td>
                <td>{row.TrangThai}</td>
                <td>{row.NgayThanhToan}</td>
                <td>{row.GhiChu}</td>
                <td>{row.TgianBatDau}</td>
                <td>{row.TgianKetThuc}</td>
      <td>
        <button className='a' onClick={(e) => { e.stopPropagation(); handleEditHoaDon(row); }}>Sửa</button>
      </td>
      <td>
        <button className='a' onClick={(e) => { e.stopPropagation(); handleDeleteHoaDon(row); }}>Xóa</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
          </div>
          {showDeleteConfirmHoaDon && (
        <div className="modal">
          <div className="modal-content">
            <h3>Bạn có chắc chắn muốn xóa tòa nhà này không?</h3>
            <button className='a' onClick={confirmDeleteHoaDon}>Xóa</button>
            <button className='a' onClick={cancelDeleteHoaDon}>Hủy</button>
          </div>
        </div>
          )}
          {isEditModalOpenHoaDon && (
        <div className="modal">
          <div className="modal-content">
            <h3>Sửa thông tin HoaDon</h3>
            <label>GhiChu:</label>
            <input type="text" value={editingHoaDon.GhiChu} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, GhiChu: e.target.value })} />
            <button className='a' onClick={handleSaveEditHoaDon}>Lưu</button>
            <button className='a' onClick={handleCloseEditHoaDon}>Thoát</button>
          </div>
        </div>
          )}
          {isAddModalOpenHoaDon && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thêm Thông Tin HoaDon</h3>
            <label>GhiChu:</label>
            <input type="text" value={editingHoaDon.GhiChu} onChange={(e) => setEditingHoaDon({ ...editingHoaDon, GhiChu: e.target.value })} />
            <button className='a' onClick={handleCreateHoaDon}>Lưu</button>
            <button className='a' onClick={handleCloseAddHoaDon}>Thoát</button>
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
      <h3>Thông Tin HoaDon</h3>
      <p><strong>Ghi Chú:</strong> {selectedHoaDon.GhiChu}</p>
      <br />
      <button className="a" onClick={() => setShowViewDialogHoaDon(false)}>Đóng</button>
    </div>
  </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BillManagment

