import React, { useState,useEffect } from 'react';
import "./AccountManagment.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {getAllSinhVien} from "../../../routes/sinhvien";
import {editHopDongData} from "../../../routes/hopdong";
import { updateMaQP } from "../../../routes/TaiKhoan";
import { toast } from 'react-toastify';
const AccountManagment = () => {
  const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [isEditModalOpenSinhVien, setIsEditModalOpenSinhVien] = useState(false);
    const [editingSinhVien, setEditingSinhVien] = useState(null);
    const [sinhvienlist, setsinhvienlist] = useState([]);
    const [selectedSinhVien, setSelectedSinhVien] = useState(null);
    const [showViewDialogSinhVien, setShowViewDialogSinhVien] = useState(false);
    const handleEditSinhVien = (room) => {
          setEditingSinhVien(room);
          setIsEditModalOpenSinhVien(true);
      };
    const handleSaveEditSinhVien = async () => {
          if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
          try {
            await editHopDongData(editingSinhVien.IDHopDong, { 
              TrangThai: editingSinhVien.TrangThai,
            }, token);
            console.log('IDTaiKhoan:', editingSinhVien.IDTaiKhoan);
            if (editingSinhVien.TrangThai === "Đã Nhận Phòng") {
              await updateMaQP(editingSinhVien.IDTaiKhoan, { 
                MaPQ: 4
              }, token); 
            }
            const updatedList = await getAllSinhVien(token);
            setsinhvienlist(updatedList);
            setIsEditModalOpenSinhVien(false);
            setEditingSinhVien(null);
            toast.success('Thành công');
          } catch (err) {
             toast.error(err?.error|| 'Có lỗi xảy ra!');
          }
      };
    const handleCloseEditSinhVien = () => {
          setIsEditModalOpenSinhVien(false);
          setEditingSinhVien(null);
      };
  
    useEffect(() => {
      const fetchSinhVien = async () => {
            try {
              const data = await getAllSinhVien(token);
              setsinhvienlist(data);
            } catch (err) {
              console.error('Lỗi khi tải danh sách:', err);
            } finally {
              setLoading(false);
            }
          };
          fetchSinhVien();
      }, [token]);
 
  return (
    <div className='account'>
        <div className="account_container">
          <Header_admin/>
          <div >
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
              <th>Trạng Thái</th>
              <th colSpan="2">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {sinhvienlist.map((row, index) => (
            <tr key={row.IDTaiKhoan} onClick={(e) => {
    if (e.target.tagName !== 'BUTTON') {
      setSelectedSinhVien(row);
      setShowViewDialogSinhVien(true);
    }
  }}>
                <td>{index + 1}</td>
                <td><img src={`http://localhost:3000/uploads/${row.anh}`} alt="Ảnh sinh viên"  style={{ width: '80px', height: '60px', objectFit: 'cover' }} /></td>
                <td>{row.HoTen}</td>
                <td>{new Date(row.NgaySinh).toLocaleDateString('vi-VN')}</td>
                <td>{row.GioiTinh}</td>
                <td>{row.QueQuan}</td>
                <td>{row.TrangThai}</td>
      <td>
        <button className='a' onClick={(e) => { e.stopPropagation(); handleEditSinhVien(row); }}>Sửa</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
          </div>
          {isEditModalOpenSinhVien && (
        <div className="modal">
          <div className="modal-content">
            <h3>Cập nhật trạng thái</h3>
            <select value={editingSinhVien.TrangThai} onChange={(e) => setEditingSinhVien({ ...editingSinhVien, TrangThai: e.target.value })}>
                <option value="">--- Chọn Tình Trạng ---</option>
                <option value="Đã Duyệt">Duyệt Hồ Sơ</option>
                <option value="Từ Chối">Từ Chối</option>
                <option value="Chờ Nhận Phòng">Chờ Nhận Phòng</option>
                <option value="Đã Nhận Phòng">Đã Nhận Phòng</option>
            </select><br/>
            <button className='a' onClick={handleSaveEditSinhVien}>Lưu</button>
            <button className='a' onClick={handleCloseEditSinhVien}>Thoát</button>
          </div>
        </div>
          )}
       
          {showViewDialogSinhVien && (
  <div className="modal">
    <div className="modal-content">
      <h3>Thông Tin Sinh Viên</h3>
      <p><strong>Mã SV:</strong> {selectedSinhVien.MaSV}</p>
      <p><strong>Họ Tên:</strong> {selectedSinhVien.HoTen}</p>
      <p><strong>Quê Quán:</strong> {selectedSinhVien.QueQuan}</p>
      <p><strong>Giới Tính:</strong> {selectedSinhVien.GioiTinh}</p>
      <p><strong>Email:</strong> {selectedSinhVien.Email}</p>
      <p><strong>CCCD:</strong> {selectedSinhVien.CCCD}</p>
      <p><strong>SĐT:</strong> {selectedSinhVien.SDT}</p>
      <p><strong>Trường:</strong> {selectedSinhVien.Truong}</p>
      <p><strong>Lớp:</strong> {selectedSinhVien.Lop}</p>
      <p><strong>Niên Khóa:</strong> {selectedSinhVien.NienKhoa}</p>
      <p><strong>Ghi Chú:</strong> {selectedSinhVien.GhiChu}</p>
      <img src={`http://localhost:3000/uploads/${selectedSinhVien.anh}`} alt="Ảnh sinh viên" style={{ width: '150px', height: 'auto', marginTop: '10px' }} />
      <br />
      <button className="a" onClick={() => setShowViewDialogSinhVien(false)}>Đóng</button>
    </div>
  </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountManagment