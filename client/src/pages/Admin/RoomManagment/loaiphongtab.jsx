import { useState, useEffect } from 'react';
import "./loaiphongtab.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {createLoaiPhong, getAllLoaiPhong, editLoaiPhong, removeLoaiPhong} from "../../../routes/loaiphong";
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
const loaiphongtab = () => {
  const token = localStorage.getItem('token');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditModalOpenLoaiPhong, setIsEditModalOpenLoaiPhong] = useState(false);
  const [editingLoaiPhong, setEditingLoaiPhong] = useState(null);
  const [showDeleteConfirmLoaiPhong, setShowDeleteConfirmLoaiPhong] = useState(false);
  const [roomToDeleteLoaiPhong, setRoomToDeleteLoaiPhong] = useState(null);
  const [isAddModalOpenLoaiPhong, setIsAddModalOpenLoaiPhong] = useState(false); 
  const [showImportDialogLoaiPhong, setShowImportDialogLoaiPhong] = useState(false);
  const [excelDataLoaiPhong, setExcelDataLoaiPhong] = useState([]);
  const [loaiphonglist, setloaiphonglist] = useState([]);
  useEffect(() => {
      const fetchLoaiPhong = async () => {
        try {
          const data = await getAllLoaiPhong(token);
          setloaiphonglist(data);
        } catch (err) {
          console.error('Lỗi khi tải danh sách:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchLoaiPhong();
    }, [token]);
  const handleAddLoaiPhong = () => {
      setEditingLoaiPhong({LoaiPhong:"", SoNguoi:"",BanGhe:"", Giuong:"", Tu:"", GiaThue:"", GhiChu:" " });
      setIsAddModalOpenLoaiPhong(true);
    };
  const handleExportExcelLoaiPhong = () => {
      const ws = XLSX.utils.json_to_sheet(loaiphonglist); 
      const wb = XLSX.utils.book_new(); 
      XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Loai Phong");
      XLSX.writeFile(wb, 'Danh_Sach_Loai_Phong.xlsx');
    };
  const handleEditLoaiPhong = (room) => {
      setEditingLoaiPhong(room);
      setIsEditModalOpenLoaiPhong(true);
    };
  const handleDeleteLoaiPhong = (room) => {
      setRoomToDeleteLoaiPhong(room);
      setShowDeleteConfirmLoaiPhong(true);
    };
  const loaiphong = loaiphonglist.filter(row =>
      Object.values(row).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  const confirmDeleteLoaiPhong = async () => {
      try {
        await removeLoaiPhong(roomToDeleteLoaiPhong.MaLoai, token);
        const updatedList = await getAllLoaiPhong(token);
        setloaiphonglist(updatedList);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      } finally {
        setShowDeleteConfirmLoaiPhong(false);
        setRoomToDeleteLoaiPhong(null);
      }
    };
  const cancelDeleteLoaiPhong = () => {
      setShowDeleteConfirmLoaiPhong(false);
      setRoomToDeleteLoaiPhong(null);
    };
  const handleSaveEditLoaiPhong = async () => {
      if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
      try {
        await editLoaiPhong(editingLoaiPhong.MaLoai, { 
          LoaiPhong: editingLoaiPhong.LoaiPhong,
          SoNguoi: editingLoaiPhong.SoNguoi,
          BanGhe: editingLoaiPhong.BanGhe,
          Giuong: editingLoaiPhong.Giuong,
          Tu: editingLoaiPhong.Tu,
          GiaThue: editingLoaiPhong.GiaThue,
        }, token);
        const updatedList = await getAllLoaiPhong(token);
        setloaiphonglist(updatedList);
        setIsEditModalOpenLoaiPhong(false);
        setEditingLoaiPhong(null);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  const handleCloseEditLoaiPhong = () => {
      setIsEditModalOpenLoaiPhong(false);
      setEditingLoaiPhong(null);
    };
  const handleImportExcelLoaiPhong = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log("Dữ liệu Excel:", data);
        setExcelDataLoaiPhong(data);
      };
      reader.readAsBinaryString(file);
    };
  const handleConfirmImportLoaiPhong = async () => {
      try {
      await Promise.all(excelDataLoaiPhong.map(async (item) => {
          await createLoaiPhong({
            LoaiPhong: item.LoaiPhong,
            SoNguoi: item.SoNguoi,
            BanGhe: item.BanGhe,
            Giuong: item.Giuong,
            Tu: item.Tu,
            GiaThue: item.GiaThue,
            GhiChu: item.GhiChu,
          });
      }));
       toast.success('Thành công');
      setShowImportDialogLoaiPhong(false);
      const updatedList = await getAllLoaiPhong(token);
      setloaiphonglist(updatedList);
    } catch (error) {
      toast.error(err?.error || 'Có lỗi xảy ra!');
    }
    };
  const handleCreateLoaiPhong = async () => {
      if (!window.confirm('Bạn có chắc muốn thêm mới loại phòng này không?')) return;
      try {
        await createLoaiPhong(editingLoaiPhong);
        const updatedList = await getAllLoaiPhong(token);
        setloaiphonglist(updatedList);
        setIsAddModalOpenLoaiPhong(false);
        setEditingLoaiPhong(null);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  const handleCloseAddLoaiPhong = () => {
      setIsAddModalOpenLoaiPhong(false);
      setEditingLoaiPhong(null);
    };
  return (
    <div className='room'>
      <div className="room_container">
        <Header_admin />
        <div>
          <div className="top-bar">
              <button className='a' onClick={handleAddLoaiPhong}>➕Thêm</button>
              <button className='a' onClick={() => setShowImportDialogLoaiPhong(true)}>🗂️Nhập file Excel</button>
              <button className='a' onClick={handleExportExcelLoaiPhong}>📁Xuất File Excel</button>
              <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          </div>
          <div className="room_table">
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Loại Phòng</th>
                    <th>Số Người</th>
                    <th>Bàn Ghế</th>
                    <th>Giường</th>
                    <th>Tủ</th>
                    <th>Giá Thuê</th>
                    <th colSpan="2">Chức Năng</th>
                  </tr>
                </thead>
                <tbody>
                  {loaiphong.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td>{row.LoaiPhong}</td>
                      <td>{row.SoNguoi}</td>
                      <td>{row.BanGhe}</td>
                      <td>{row.Giuong}</td>
                      <td>{row.Tu}</td>
                      <td>{row.GiaThue}</td>
                      <td><button className='a' onClick={() => handleEditLoaiPhong(row)}>✏️Sửa</button></td>
                      <td><button className='a' onClick={() => handleDeleteLoaiPhong(row)}>❌Xóa</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          {showDeleteConfirmLoaiPhong && (
          <div className="modal">
            <div className="modal-content">
              <h3>Bạn có chắc chắn muốn xóa loại phòng này không?</h3>
              <button className='a-btn' onClick={confirmDeleteLoaiPhong}>Xóa</button>
              <button className='a-btn' onClick={cancelDeleteLoaiPhong}>Hủy</button>
            </div>
          </div>
          )}
          {isEditModalOpenLoaiPhong && (
          <div className="modal">
            <div className="modal-content-room">
              <h3>SỬA THÔNG TIN LOẠI PHÒNG</h3>
              <div>
                <label>Tên Loại Phòng:</label>
                <input  type="text"  value={editingLoaiPhong.LoaiPhong}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, LoaiPhong: e.target.value })}
                /><br/>
                <label>Số Người:</label>
                <input  type="text"  value={editingLoaiPhong.SoNguoi}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, SoNguoi: e.target.value })}
                /><br/>
                <label>Bộ Bàn Ghế:</label>
                <input  type="text"  value={editingLoaiPhong.BanGhe}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, BanGhe: e.target.value })}
                /><br/>
                <label>Số Giường:</label>
                <input  type="text"  value={editingLoaiPhong.Giuong}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, Giuong: e.target.value })}
                /><br/>
                <label>Số Tủ:</label>
                <input  type="text"  value={editingLoaiPhong.Tu}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, Tu: e.target.value })}
                /><br/>
                <label>Giá Thuê:</label>
                <input  type="text"  value={editingLoaiPhong.GiaThue}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, GiaThue: e.target.value })}
                /><br/>
              </div>
              <button className='a-btn' onClick={handleSaveEditLoaiPhong}>️Lưu</button>
              <button className='a-btn' onClick={handleCloseEditLoaiPhong}>Thoát</button>
            </div>
          </div>
          )}
          {isAddModalOpenLoaiPhong && (
          <div className="modal">
            <div className="modal-content-room">
              <h3>THÊM THÔNG TIN LOẠI PHÒNG</h3>
              <div>
                <label>Tên Loại Phòng:</label>
                <input
                  type="text"
                  value={editingLoaiPhong.LoaiPhong}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, LoaiPhong: e.target.value })}
                /><br/>
                <label>Số Người:</label>
                <input
                  type="text"
                  value={editingLoaiPhong.SoNguoi}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, SoNguoi: e.target.value })}
                /><br/>
                <label>Bàn Ghế:</label>
                <input
                  type="text"
                  value={editingLoaiPhong.BanGhe}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, BanGhe: e.target.value })}
                /><br/>
                <label>Giường:</label>
                <input
                  type="text"
                  value={editingLoaiPhong.Giuong}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, Giuong: e.target.value })}
                /><br/>
                <label>Tủ:</label>
                <input
                  type="text"
                  value={editingLoaiPhong.Tu}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, Tu: e.target.value })}
                /><br/>
                <label>Giá Thuê:</label>
                <input
                  type="text"
                  value={editingLoaiPhong.GiaThue}
                  onChange={(e) => setEditingLoaiPhong({ ...editingLoaiPhong, GiaThue: e.target.value })}
                /><br/>
              </div>
              <button className='a-btn' onClick={handleCreateLoaiPhong}>Lưu</button>
              <button className='a-btn' onClick={handleCloseAddLoaiPhong}>Thoát</button>
            </div>
          </div>
          )}
          {showImportDialogLoaiPhong && (
          <div className="modal">
            <div className="modal-content-excel">
              <h3>Nhập danh sách loại phòng từ Excel</h3>
              <input type="file" accept=".xlsx, .xls" onChange={handleImportExcelLoaiPhong} /><br/>
              <button className="a-btn" onClick={handleConfirmImportLoaiPhong}>Đồng Ý Nhập</button>
              <button className="a-btn" onClick={() => setShowImportDialogLoaiPhong(false)}>Hủy</button>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
    
  )
}

export default loaiphongtab