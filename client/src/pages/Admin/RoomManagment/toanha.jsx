import { useState,useEffect } from 'react';
import Header_admin from "../../../component/Header_admin/Header_admin";
import { create, getAll, edit, remove } from "../../../routes/toanha";
import "./toanha.css";
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
const toanha = () => {
  const token = localStorage.getItem('token');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingToaNha, setEditingToaNha] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [toaNhaList, setToaNhaList] = useState([]);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const handleDelete = (room) => {
      setRoomToDelete(room);
      setShowDeleteConfirm(true);
    };
  const confirmDelete = async () => {
      try {
        await remove(roomToDelete.MaTN, token);
        const updatedList = await getAll(token);
        setToaNhaList(updatedList);
      } catch (err) {
        console.error('Lỗi khi xóa:', err);
        alert('Không thể xóa tòa nhà');
      } finally {
        setShowDeleteConfirm(false);
        setRoomToDelete(null);
      }
    };
  const cancelDelete = () => {
      setShowDeleteConfirm(false);
      setRoomToDelete(null);
    };
  const handleEdit = (room) => {
      setEditingToaNha(room);
      setIsEditModalOpen(true);
    };
  const handleSaveEdit = async () => {
      if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
      try {
        await edit(editingToaNha.MaTN, { TenTN: editingToaNha.TenTN }, token);
        const updatedList = await getAll(token);
        setToaNhaList(updatedList);
        setIsEditModalOpen(false);
        setEditingToaNha(null);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  const handleCloseEdit = () => {
      setIsEditModalOpen(false);
      setEditingToaNha(null);
    };
  const handleAddToaNha = () => {
      setEditingToaNha({ TenTN: "" });
      setIsAddModalOpen(true);
    };
  const handleCloseAddToaNha = () => {
      setIsAddModalOpen(false);
      setEditingToaNha(null);
    };
  const handleCreate = async () => {
      if (!window.confirm('Bạn có chắc muốn thêm mới tòa nhà này không?')) return;
      try {
        await create(editingToaNha);
        const updatedList = await getAll(token);
        setToaNhaList(updatedList);
        setIsAddModalOpen(false);
        setEditingToaNha(null);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
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
    }, [token]);
  const handleImportExcel = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log("Dữ liệu Excel:", data);
        setExcelData(data);
      };
      reader.readAsBinaryString(file);
    };
  const handleConfirmImport = async () => {
      try {
        await Promise.all(excelData.map(async (item) => {
          if (item.TenTN) {
            await create({ TenTN: item.TenTN });
          } else {
            console.warn("Thiếu TenTN:", item);
          }
        }));
         toast.success('Thành công');
        setShowImportDialog(false);
        const updatedList = await getAll(token);
        setToaNhaList(updatedList);
      } catch (error) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(toaNhaList); 
    const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, "Danh Sách Tòa Nhà");
    XLSX.writeFile(wb, 'Danh_Sach_Toa_Nha.xlsx');
    };
  const filteredData = toaNhaList.filter(row =>
      Object.values(row).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  return (
    <div className='room'>
      <div className="room_container">
        <Header_admin />
        <div >
        <div className="top-bar">
         <button className='a' onClick={handleAddToaNha}>➕Thêm</button>
         <button className='a' onClick={() => setShowImportDialog(true)}>🗂️Nhập file Excel</button>
         <button className='a' onClick={handleExportExcel}>📁Xuất File Excel</button>
         <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
       </div>
       <div className="room_table">
         <table>
           <thead>
             <tr>
               <th>STT</th>
               <th>Tên Tòa Nhà</th>
               <th colSpan="2">Chức Năng</th>
             </tr>
            </thead>
           <tbody>
             {filteredData.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.TenTN}</td>
                <td><button className='a' onClick={() => handleEdit(row)}>✏️Sửa</button></td>
                <td><button className='a' onClick={() => handleDelete(row)}>❌Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Bạn có chắc chắn muốn xóa tòa nhà này không?</h3>
            <button className='a-btn' onClick={confirmDelete}>Xóa</button>
            <button className='a-btn' onClick={cancelDelete}>Hủy</button>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content-room">
            <h3>SỬA THÔNG TIN TÒA NHÀ</h3>
            <label>Tên Tòa Nhà: </label>
            <input type="text" value={editingToaNha.TenTN} onChange={(e) => setEditingToaNha({ ...editingToaNha, TenTN: e.target.value })} /><br/>
            <button className='a-btn' onClick={handleSaveEdit}>Lưu</button>
            <button className='a-btn' onClick={handleCloseEdit}>Thoát</button>
          </div>
        </div>
      )}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content-room">
            <h3>THÊM THÔNG TIN TÒA NHÀ</h3>
            <label>Tên Tòa Nhà: </label>
            <input type="text" value={editingToaNha.TenTN} onChange={(e) => setEditingToaNha({ ...editingToaNha, TenTN: e.target.value })} /><br/>
            <button className='a-btn' onClick={handleCreate}>Lưu</button>
            <button className='a-btn' onClick={handleCloseAddToaNha}>Thoát</button>
          </div>
        </div>
      )}
      {showImportDialog && (
        <div className="modal">
          <div className="modal-content-excel">
            <h3>Nhập danh sách Tòa Nhà từ Excel</h3>
            <input type="file" accept=".xlsx, .xls" onChange={handleImportExcel} /><br />
            <button className="a-btn" onClick={handleConfirmImport}>Đồng Ý Nhập</button>
            <button className="a-btn" onClick={() => setShowImportDialog(false)}>Hủy</button>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>

  );
};

export default toanha;
