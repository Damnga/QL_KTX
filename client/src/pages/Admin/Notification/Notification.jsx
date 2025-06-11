import React,{useEffect,useState} from 'react'
import "./Notification.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {createThongBao,getAllThongBaoData, editThongBao, removeThongBao} from "../../../routes/thongbao";
import { toast } from 'react-toastify';
import {jwtDecode }from 'jwt-decode';
import { usePhongContext } from '../../../context/PhongContext.jsx';
import { getAll} from "../../../routes/toanha";
import {getAllPhong} from "../../../routes/phong";

const Notification = () => {
    const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const userId = decoded.id; 
      const {phongTheoToa, setPhongTheoToa,selectedMaTN, setSelectedMaTN } = usePhongContext();
      const [searchKeyword, setSearchKeyword] = useState('');
      const [loading, setLoading] = useState(true);
      const [isEditModalOpenThongBao, setIsEditModalOpenThongBao] = useState(false);
      const [editingThongBao, setEditingThongBao] = useState(null);
      const [showDeleteConfirmThongBao, setShowDeleteConfirmThongBao] = useState(false);
      const [roomToDeleteThongBao, setRoomToDeleteThongBao] = useState(null);
      const [isAddModalOpenThongBao, setIsAddModalOpenThongBao] = useState(false); 
      const [ThongBaoListData, setThongBaoListData] = useState([]);
      const [toaNhaList, setToaNhaList] = useState([]);
      const [phonglist, setphonglist] = useState([]);
      const handleDeleteThongBao = (room) => {
          setRoomToDeleteThongBao(room);
          setShowDeleteConfirmThongBao(true);
        };
      const confirmDeleteThongBao = async () => {
          try {
            await removeThongBao(roomToDeleteThongBao.id, token);
            const updated = await getAllThongBaoData(token);
            setThongBaoListData(updated);
            toast.success('Xóa Thành Công');
          } catch (err) {
            toast.error('Thất bại');
          } finally {
            setShowDeleteConfirmThongBao(false);
            setRoomToDeleteThongBao(null);
          }
        };
      const cancelDeleteThongBao = () => {
          setShowDeleteConfirmThongBao(false);
          setRoomToDeleteThongBao(null);
        };
      const handleEditThongBao = (room) => {
          setEditingThongBao(room);
          setIsEditModalOpenThongBao(true);
        };
      const handleSaveEditThongBao = async () => {
          if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
          try {
            await editThongBao(editingThongBao.id, { 
              NoiDung: editingThongBao.NoiDung,
              Tgian: editingThongBao.Tgian,
              MaPhong:editingThongBao.MaPhong,
              MaTK: editingThongBao.MaTK || userId,
            }, token);
            const updated = await getAllThongBaoData(token);
            setThongBaoListData(updated);
            setIsEditModalOpenThongBao(false);
            setEditingThongBao(null);
            toast.success('Thành công');
          } catch (err) {
            toast.error(err?.error || 'Có lỗi xảy ra!');
          }
        };
      const handleCloseEditThongBao = () => {
          setIsEditModalOpenThongBao(false);
          setEditingThongBao(null);
        };
      const handleAddThongBao = () => {
          setEditingThongBao({NoiDung :"",Tgian:new Date().toISOString(), MaTK:userId, MaPhong:""});
          setIsAddModalOpenThongBao(true);
        };
      const handleCloseAddThongBao= () => {
          setIsAddModalOpenThongBao(false);
          setEditingThongBao(null);
        };
      const handleCreateThongBao = async () => {
          if (!window.confirm('Bạn có chắc muốn thêm mới sự kiện này không?')) return;
          try {
            await createThongBao(editingThongBao, token);
            const updated = await getAllThongBaoData(token);
            setThongBaoListData(updated);
            setIsAddModalOpenThongBao(false);
            setEditingThongBao(null);
            toast.success('Thành công');
          } catch (err) {
            toast.error(err?.error || 'Có lỗi xảy ra!');
          }
        };
      useEffect(() => {
          const fetchThongBao = async () => {
            try {
              const datalist = await getAllThongBaoData(token);
              setThongBaoListData(datalist);
            } catch (err) {
              console.error('Lỗi khi tải danh sách:', err);
            } finally {
              setLoading(false);
            }
          };
          fetchThongBao();
        }, [token]);
        const filtered = ThongBaoListData.filter(row =>
          Object.values(row).some(
            value =>
              typeof value === 'string' &&
              value.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        );
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
          useEffect(() => {
            if (selectedMaTN) {
              const filteredPhong = phonglist.filter((phong) =>  parseInt(phong.MaTN) ===  parseInt(selectedMaTN) );
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
  return (
    <div className='notification-admin'> 
        <div className="notification-admin_container">
            <Header_admin/>
        <div >
        <div className="top-bar">
         <button className='a' onClick={handleAddThongBao}>➕Thêm</button>
         <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
       </div>
       <div className="room_table">
         <table>
           <thead>
             <tr>
               <th>STT</th>
               <th>Nội Dung</th>
               <th>Người đăng</th>
               <th>Thời gian </th>
               <th>Tòa nhà</th>
               <th>Phòng nhận thông báo</th>
               <th colSpan="2">Chức Năng</th>
             </tr>
            </thead>
           <tbody>
             {filtered.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.NoiDung}</td>
                <td>{row.Username}</td>
                <td>{new Date(row.Tgian).toLocaleDateString('vi-VN')}</td> 
                <td>{row.TenTN}</td>
                <td>{row.TenPhong}</td>
                <td><button className='a' onClick={() => handleEditThongBao(row)}>✏️Sửa</button></td>
                <td><button className='a' onClick={() => handleDeleteThongBao(row)}>❌Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteConfirmThongBao && (
        <div className="modal">
          <div className="modal-content">
            <h3>Bạn có chắc chắn muốn xóa  không?</h3>
            <button className='a' onClick={confirmDeleteThongBao}>Xóa</button>
            <button className='a' onClick={cancelDeleteThongBao}>Hủy</button>
          </div>
        </div>
      )}
      {isEditModalOpenThongBao && (
  <div className="modal">
    <div className="modal-content">
      <h3>Sửa thông tin thông báo</h3>
      <label>Nội Dung: </label>
      <input
        type="text"
        value={editingThongBao.NoiDung}
        onChange={(e) =>
          setEditingThongBao({ ...editingThongBao, NoiDung: e.target.value })
        }
      />
      <br />
      <label>Tòa Nhà:</label>
      <select
        value={selectedMaTN}
        onChange={(e) => {
          const maTN = e.target.value;
          setSelectedMaTN(maTN);
          setEditingThongBao({ ...editingThongBao, MaPhong: "" });
        }}
      >
        <option value="">-- Chọn tòa nhà --</option>
        {toaNhaList.map((loai) => (
          <option key={loai.MaTN} value={loai.MaTN}>
            {loai.TenTN}
          </option>
        ))}
      </select>
      <br />
      <label>Tên Phòng:</label>
      <select
        value={editingThongBao.MaPhong}
        onChange={(e) =>
          setEditingThongBao({ ...editingThongBao, MaPhong: e.target.value })
        }
      >
        <option value="">-- Chọn phòng --</option>
        {phongTheoToa.map((loai) => (
          <option key={loai.MaPhong} value={loai.MaPhong}>
            {loai.TenPhong}
          </option>
        ))}
      </select>
      <br />
      <button className="a" onClick={handleSaveEditThongBao}>
        Lưu
      </button>
      <button className="a" onClick={handleCloseEditThongBao}>
        Thoát
      </button>
    </div>
  </div>
      )}
      {isAddModalOpenThongBao && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thêm Thông Báo </h3>
            <label>Nội Dung: </label>
            <input type="text" value={editingThongBao.NoiDung} onChange={(e) => setEditingThongBao({ ...editingThongBao, NoiDung: e.target.value })} /><br/>
            <label>Tòa Nhà:</label>
                            <select value={selectedMaTN}
                              onChange={(e) => { const maTN = e.target.value;  setSelectedMaTN(maTN);
                                  setEditingThongBao({ ...editingThongBao, MaPhong: "" });
                              }}>
                              <option value="">-- Chọn tòa nhà --</option>
                                {toaNhaList.map((loai) => (
                                <option key={loai.MaTN} value={loai.MaTN}>{loai.TenTN} </option>
                                ))}
                            </select><br/>
                            <label>Tên Phòng:</label>
                            <select value={editingThongBao.MaPhong}
                              onChange={(e) => setEditingThongBao({ ...editingThongBao, MaPhong: e.target.value })}
                            >
                              <option value="">-- Chọn phòng --</option>
                                {phongTheoToa.map((loai) => (
                              <option key={loai.MaPhong} value={loai.MaPhong}>
                                    {loai.TenPhong}
                              </option>
                              ))}
                            </select>
                            <br/>
            <button className='a' onClick={handleCreateThongBao}>Lưu</button>
            <button className='a' onClick={handleCloseAddThongBao}>Thoát</button>
          </div>
        </div>
      )}
        </div>
        </div>
    </div>
  )
}

export default Notification