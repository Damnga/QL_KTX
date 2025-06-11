import React,{useEffect,useState} from 'react'
import "./Eventtab.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {createSuKien, getAllSuKien,getAllSuKienData, editSuKien, removeSuKien} from "../../../routes/sukien";
import { toast } from 'react-toastify';
import {jwtDecode }from 'jwt-decode';

const Eventtab = () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.id; 
   
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditModalOpenSuKien, setIsEditModalOpenSuKien] = useState(false);
  const [editingSuKien, setEditingSuKien] = useState(null);
  const [showDeleteConfirmSuKien, setShowDeleteConfirmSuKien] = useState(false);
  const [roomToDeleteSuKien, setRoomToDeleteSuKien] = useState(null);
  const [isAddModalOpenSuKien, setIsAddModalOpenSuKien] = useState(false); 
  const [SuKienList, setSuKienList] = useState([]);
  const [SuKienListData, setSuKienListData] = useState([]);
  const handleDeleteSuKien = (room) => {
      setRoomToDeleteSuKien(room);
      setShowDeleteConfirmSuKien(true);
    };
  const confirmDeleteSuKien = async () => {
      try {
        await removeSuKien(roomToDeleteSuKien.id, token);
        const updated = await getAllSuKien(token);
        setSuKienListData(updated);
      } catch (err) {
        toast.error('Thất bại');
      } finally {
        setShowDeleteConfirmSuKien(false);
        setRoomToDeleteSuKien(null);
      }
    };
  const cancelDeleteSuKien = () => {
      setShowDeleteConfirmSuKien(false);
      setRoomToDeleteSuKien(null);
    };
  const handleEditSuKien = (room) => {
      setEditingSuKien(room);
      setIsEditModalOpenSuKien(true);
    };
  const handleSaveEditSuKien = async () => {
      if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
      try {
        await editSuKien(editingSuKien.id, { 
          TenSK: editingSuKien.TenSK,
          NoiDung: editingSuKien.NoiDung,
          TgianBatDau: editingSuKien.TgianBatDau,
          TgianKetThuc: editingSuKien.TgianKetThuc,
          anh:editingSuKien.anh,
          TrangThai:editingSuKien.TrangThai
        }, token);
        const updated = await getAllSuKienData(token);
        setSuKienListData(updated);
        setIsEditModalOpenSuKien(false);
        setEditingSuKien(null);
        toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  const handleCloseEditSuKien = () => {
      setIsEditModalOpenSuKien(false);
      setEditingSuKien(null);
    };
  const handleAddSuKien = () => {
      setEditingSuKien({ TenSK: "",NoiDung :"",MaTK:userId,TgianBatDau:"",TgianKetThuc:"",anh:"",TrangThai:" "});
      setIsAddModalOpenSuKien(true);
    };
  const handleCloseAddSuKien = () => {
      setIsAddModalOpenSuKien(false);
      setEditingSuKien(null);
    };
  const handleCreateSuKien = async () => {
      if (!window.confirm('Bạn có chắc muốn thêm mới sự kiện này không?')) return;
      try {
        await createSuKien(editingSuKien);
        const updated = await getAllSuKienData(token);
        setSuKienListData(updated);
        setIsAddModalOpenSuKien(false);
        setEditingSuKien(null);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  useEffect(() => {
      const fetchSuKien = async () => {
        try {
          const data = await getAllSuKien(token);
          setSuKienList(data);
          const datalist = await getAllSuKien(token);
          setSuKienListData(datalist);
        } catch (err) {
          console.error('Lỗi khi tải danh sách:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchSuKien();
    }, [token]);
    const filtered = SuKienListData.filter(row =>
      Object.values(row).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  return (
    <div className='eventpost'>
      <div className="eventpost_container">
        <Header_admin/>
        <div >
        <div className="top-bar">
         <button className='a' onClick={handleAddSuKien}>➕Thêm</button>
         <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
       </div>
       <div className="room_table">
         <table>
           <thead>
             <tr>
               <th>STT</th>
               <th>Tên Sự Kiện</th>
               <th>Nội Dung</th>
               <th>Ảnh</th>
               <th>Người đăng</th>
               <th>Thời gian bắt đầu</th>
               <th>Thời gian kết thúc</th>
               <th>Số người đăng ký</th>
               <th>Trạng Thái</th>
               <th colSpan="2">Chức Năng</th>
             </tr>
            </thead>
           <tbody>
             {filtered.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.TenSK}</td>
                <td>{row.NoiDung}</td>
                <td><img src={`http://localhost:3000/uploads/${row.anh}`} alt="Ảnh sinh viên"  style={{ width: '80px', height: '60px', objectFit: 'cover' }} /></td>
                <td>{row.Username}</td>
                <td>{new Date(row.TgianBatDau).toLocaleDateString('vi-VN')}</td>
                <td>{new Date(row.TgianKetThuc).toLocaleDateString('vi-VN')}</td> 
                <td>{row.SoNguoiThamGia}</td>
                <td className={`trangthai ${ row.TrangThai?.trim().toLowerCase() === 'sắp diễn ra' ? 'bg-green' : row.TrangThai?.trim().toLowerCase() === 'đã diễn ra' ? 'bg-red' :  row.TrangThai?.trim().toLowerCase() === 'đang diễn ra' ? 'bg-yellow' : 'bg-default'}`}>  {row.TrangThai}</td>                <td><button className='a' onClick={() => handleEditSuKien(row)}>✏️Sửa</button></td>
                <td><button className='a' onClick={() => handleDeleteSuKien(row)}>❌Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteConfirmSuKien && (
        <div className="modal">
          <div className="modal-content">
            <h3>Bạn có chắc chắn muốn xóa  không?</h3>
            <button className='a-btn' onClick={confirmDeleteSuKien}>Xóa</button>
            <button className='a-btn' onClick={cancelDeleteSuKien}>Hủy</button>
          </div>
        </div>
      )}
      {isEditModalOpenSuKien && (
        <div className="modal">
          <div className="modal-content-room">
            <h3>Sửa thông tin sự kiện</h3>
            <label>Tên Sự kiện: </label>
            <input type="text" value={editingSuKien.TenSK} onChange={(e) => setEditingSuKien({ ...editingSuKien, TenSK: e.target.value })} /><br/>
            <label>Nội Dung: </label>
            <input type="text" value={editingSuKien.NoiDung} onChange={(e) => setEditingSuKien({ ...editingSuKien, NoiDung: e.target.value })} /><br/>
            <label>Thời gian băt đâù: </label>
            <input type="date" value={editingSuKien.TgianBatDau} onChange={(e) => setEditingSuKien({ ...editingSuKien, TgianBatDau: e.target.value })} /><br/>
            <label>Thời gian kêt thúc: </label>
            <input type="date" value={editingSuKien.TgianKetThuc} onChange={(e) => setEditingSuKien({ ...editingSuKien, TgianKetThuc: e.target.value })} /><br/>
            <label>Ảnh:</label>
            <input type="file" onChange={(e) => setEditingSuKien({ ...editingSuKien, anh: e.target.files[0] })} /><br/>
            <button className='a-btn' onClick={handleSaveEditSuKien}>Lưu</button>
            <button className='a-btn' onClick={handleCloseEditSuKien}>Thoát</button>
          </div>
        </div>
      )}
      {isAddModalOpenSuKien && (
        <div className="modal">
          <div className="modal-content-room">
            <h3>Thêm Thông Tin Sự kiện</h3>
            <label>Tên Sự kiện: </label>
            <input type="text" value={editingSuKien.TenSK} onChange={(e) => setEditingSuKien({ ...editingSuKien, TenSK: e.target.value })} /><br/>
            <label>Nội Dung: </label>
            <input type="text" value={editingSuKien.NoiDung} onChange={(e) => setEditingSuKien({ ...editingSuKien, NoiDung: e.target.value })} /><br/>
            <label>Thời gian băt đâù: </label>
            <input type="date" value={editingSuKien.TgianBatDau} onChange={(e) => setEditingSuKien({ ...editingSuKien, TgianBatDau: e.target.value })} /><br/>
            <label>Thời gian kêt thúc: </label>
            <input type="date" value={editingSuKien.TgianKetThuc} onChange={(e) => setEditingSuKien({ ...editingSuKien, TgianKetThuc: e.target.value })} /><br/>
            <label>Ảnh:</label>
            <input type="file" onChange={(e) => setEditingSuKien({ ...editingSuKien, anh: e.target.files[0] })} /><br/>
            <button className='a-btn' onClick={handleCreateSuKien}>Lưu</button>
            <button className='a-btn' onClick={handleCloseAddSuKien}>Thoát</button>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}

export default Eventtab