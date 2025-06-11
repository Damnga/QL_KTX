import { useState, useEffect } from 'react';
import "./ServiceManagment.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {createDichVu, getAllDichVu, editDichVu, removeDichVu} from "../../../routes/dichvu";
const ServiceManagment = () => {
  const token = localStorage.getItem('token');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditModalOpenDichVu, setIsEditModalOpenDichVu] = useState(false);
  const [editingDichVu, setEditingDichVu] = useState(null);
  const [showDeleteConfirmDichVu, setShowDeleteConfirmDichVu] = useState(false);
  const [roomToDeleteDichVu, setRoomToDeleteDichVu] = useState(null);
  const [isAddModalOpenDichVu, setIsAddModalOpenDichVu] = useState(false); 
  const [DichVulist, setDichVulist] = useState([]);
  const [showImportDialogDichVu, setShowImportDialogDichVu] = useState(false);
  const [excelDataDichVu, setExcelDataDichVu] = useState([]);
  const [selectedDichVu, setSelectedDichVu] = useState(null);
  const handleDeleteDichVu = (room) => {
            setRoomToDeleteDichVu(room);
            setShowDeleteConfirmDichVu(true);
    };
  const confirmDeleteDichVu = async () => {
            try {
              await removeDichVu(roomToDeleteDichVu.id, token);
              const updatedList = await getAllDichVu(token);
              setDichVulist(updatedList);
            } catch (err) {
              toast.error('Thất Bại');
            } finally {
              setShowDeleteConfirmDichVu(false);
              setRoomToDeleteDichVu(null);
            }
    };
  const cancelDeleteDichVu = () => {
            setShowDeleteConfirmDichVu(false);
            setRoomToDeleteDichVu(null);
    };
  const handleEditDichVu = (room) => {
            setEditingDichVu(room);
            setIsEditModalOpenDichVu(true);
    };
  const handleSaveEditDichVu = async () => {
            if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
            try {
              await editDichVu(editingDichVu.id, { 
                TenDV: editingDichVu.TenDV,
                DonGia: editingDichVu.DonGia,
                ThoiHan: editingDichVu.ThoiHan,
                }, token);
              const updatedList = await getAllDichVu(token);
              setDichVulist(updatedList);
              setIsEditModalOpenDichVu(false);
              setEditingDichVu(null);
              toast.success('Thành công');
            } catch (err) {
              toast.error(err?.error || 'Có lỗi xảy ra!');
            }
    };
  const handleCloseEditDichVu = () => {
            setIsEditModalOpenDichVu(false);
            setEditingDichVu(null);
    };
  const handleAddDichVu = () => {
            setEditingDichVu({TenDV:"",DonGia:"", ThoiHan:"" });
            setIsAddModalOpenDichVu(true);
    };
  const handleCloseAddDichVu = () => {
            setIsAddModalOpenDichVu(false);
            setEditingDichVu(null);
    };
  const handleCreateDichVu = async () => {
            if (!window.confirm('Bạn có chắc muốn thêm dich vu này không?')) return;
            try {
              await createDichVu(editingDichVu, token);
              const updatedList = await getAllDichVu(token);
              setDichVulist(updatedList);
              setIsAddModalOpenDichVu(false);
              setEditingDichVu(null);
              toast.success('Thành công');
            } catch (err) {
              ctoast.error(err?.error || 'Có lỗi xảy ra!');
            }
    };
  useEffect(() => {
        const fetchDichVu = async () => {
              try {
                const data = await getAllDichVu(token);
                setDichVulist(data);
              } catch (err) {
                console.error('Lỗi khi tải danh sách:', err);
              } finally {
                setLoading(false);
              }
            };
            fetchDichVu();
    }, [token]);
  const handleImportExcelDichVu = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
              const bstr = evt.target.result;
              const wb = XLSX.read(bstr, { type: 'binary' });
              const sheetName = wb.SheetNames[0];
              const sheet = wb.Sheets[sheetName];
              const data = XLSX.utils.sheet_to_json(sheet);
              setExcelDataDichVu(data);
            };
            reader.readAsBinaryString(file);
    };
  const handleConfirmImportDichVu = async () => {
            try {
              await Promise.all(excelDataDichVu.map(async (item) => {
                  await createDichVu({ 
                    TenDV: item.TenDV,
                    DonGia: item.DonGia,
                    ThoiHan: item.ThoiHan,
                  },token);
              }));
             toast.success('Thành công');
              setShowImportDialogDichVu(false);
              const updatedList = await getAllDichVu(token);
              setDichVulist(updatedList);
            } catch (error) {
              ctoast.error(err?.error || 'Có lỗi xảy ra!');
            }
    };
  const handleExportExcelDichVu = () => {
          const ws = XLSX.utils.json_to_sheet(DichVulist); 
          const wb = XLSX.utils.book_new(); 
          XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Dich Vu");
          XLSX.writeFile(wb, 'Danh_Sach_Dich_Vu.xlsx');
    };
  const dichvu = DichVulist.filter(row =>
            Object.values(row).some(
              value =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchKeyword.toLowerCase())
            )
    );
  return (
    <div className='service'>
      <div className="service_container">
        <Header_admin/>
        <div >
          <div className="top-bar">
            <button className='a' onClick={handleAddDichVu}>➕Thêm</button>
            <button className='a' onClick={() => setShowImportDialogDichVu(true)}>🗂️Nhập file Excel</button>
            <button className='a' onClick={handleExportExcelDichVu}>📁Xuất File Excel</button>
            <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          </div>
          <div className="room_table">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Dịch Vụ</th>
              <th>Đơn Giá</th>
              <th>Thời Hạn</th>
              <th>Số người đăng ký</th>
              <th colSpan="2">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {dichvu.map((row, index) => (
            <tr key={row.id} onClick={(e) => {   if (e.target.tagName !== 'BUTTON') {  setSelectedDichVu(row);} }}>
              <td>{index + 1}</td>
              <td>{row.TenDV}</td>
              <td>{row.DonGia}</td>
              <td>{row.ThoiHan}</td>
              <td>5</td>
              <td><button className='a' onClick={(e) => { e.stopPropagation(); handleEditDichVu(row); }}>✏️Sửa</button> </td>
              <td><button className='a' onClick={(e) => { e.stopPropagation(); handleDeleteDichVu(row); }}>❌Xóa</button>  </td>
            </tr>
            ))}
          </tbody>
        </table>
          </div>
          {showDeleteConfirmDichVu && (
        <div className="modal">
          <div className="modal-content">
            <h3>Bạn có chắc chắn muốn dich vu nhà này không?</h3>
            <button className='a-btn' onClick={confirmDeleteDichVu}>Xóa</button>
            <button className='a-btn' onClick={cancelDeleteDichVu}>Hủy</button>
          </div>
        </div>
          )}
          {isEditModalOpenDichVu && (
          <div className="modal">
          <div className="modal-content-room">
            <h3>SỬA THÔNG TIN DỊCH VỤ</h3>
            <label>Tên Dịch Vụ:</label>
            <input type="text" value={editingDichVu.TenDV} onChange={(e) => setEditingDichVu({ ...editingDichVu, TenDV: e.target.value })} /><br/>
            <label>Đơn Giá:</label>
            <input type="text" value={editingDichVu.DonGia} onChange={(e) => setEditingDichVu({ ...editingDichVu, DonGia: e.target.value })} /><br/>
            <label>Thời Hạn:</label>
            <input type="text" value={editingDichVu.ThoiHan} onChange={(e) => setEditingDichVu({ ...editingDichVu, ThoiHan: e.target.value })} /><br/>
            <button className='a-btn' onClick={handleSaveEditDichVu}>Lưu</button>
            <button className='a-btn' onClick={handleCloseEditDichVu}>Thoát</button>
          </div>
          </div>
          )}
          {isAddModalOpenDichVu && (
        <div className="modal">
          <div className="modal-content-room">
            <h3>THÊM THÔNG TIN DỊCH VỤ</h3>
            <label>Tên Dịch Vụ:</label>
            <input type="text" value={editingDichVu.TenDV} onChange={(e) => setEditingDichVu({ ...editingDichVu, TenDV: e.target.value })} /><br/>
            <label>Đơn Giá:</label>
            <input type="text" value={editingDichVu.DonGia} onChange={(e) => setEditingDichVu({ ...editingDichVu, DonGia: e.target.value })} /><br/>
            <label>Thời Hạn:</label>
            <input type="text" value={editingDichVu.ThoiHan} onChange={(e) => setEditingDichVu({ ...editingDichVu, ThoiHan: e.target.value })} /><br/>
            <button className='a-btn' onClick={handleCreateDichVu}>Lưu</button>
            <button className='a-btn' onClick={handleCloseAddDichVu}>Thoát</button>
          </div>
        </div>
          )}
          {showImportDialogDichVu && (
        <div className="modal">
          <div className="modal-content-room">
            <h3>Nhập danh sách DichVu từ Excel</h3>
            <input type="file" accept=".xlsx, .xls" onChange={handleImportExcelDichVu} /><br />
            <button className="a-btn" onClick={handleConfirmImportDichVu }>Đồng Ý Nhập</button>
            <button className="a-btn" onClick={() => setShowImportDialogDichVu(false)}>Hủy</button>
          </div>
        </div>
          )}
        </div>
      </div>
      
    </div>
  )
}

export default ServiceManagment
