import React, { useState } from 'react';
import "./RoomManagment.css";
import Header_admin from "../../../component/Header_admin/Header_admin";

const RoomManagment = () => {
  const initialData = [
    { id: 1, tenPhong: 'P101', toaNha: 'A', loaiPhong: 'Đơn', soNguoi: '1', status: 'trống' },
    { id: 2, tenPhong: 'P102', toaNha: 'A', loaiPhong: 'Đôi', soNguoi: '2', status: 'đã thuê' },
    { id: 3, tenPhong: 'P201', toaNha: 'B', loaiPhong: 'VIP', soNguoi: '3', status: 'trống' },
    { id: 4, tenPhong: 'P202', toaNha: 'B', loaiPhong: 'Đơn', soNguoi: '1', status: 'đã thuê' },
    { id: 5, tenPhong: 'P301', toaNha: 'C', loaiPhong: 'VIP', soNguoi: '4', status: 'trống' },
    { id: 6, tenPhong: 'P302', toaNha: 'C', loaiPhong: 'Đôi', soNguoi: '2', status: 'trống' },
    { id: 7, tenPhong: 'P303', toaNha: 'C', loaiPhong: 'Đơn', soNguoi: '1', status: 'đã thuê' },
    { id: 8, tenPhong: 'P101', toaNha: 'A', loaiPhong: 'Đơn', soNguoi: '1', status: 'trống' },
    { id: 9, tenPhong: 'P102', toaNha: 'A', loaiPhong: 'Đôi', soNguoi: '2', status: 'đã thuê' },
    { id: 10, tenPhong: 'P201', toaNha: 'B', loaiPhong: 'VIP', soNguoi: '3', status: 'trống' },
    { id: 11, tenPhong: 'P202', toaNha: 'B', loaiPhong: 'Đơn', soNguoi: '1', status: 'đã thuê' },
    { id: 12, tenPhong: 'P301', toaNha: 'C', loaiPhong: 'VIP', soNguoi: '4', status: 'trống' },
    { id: 13, tenPhong: 'P302', toaNha: 'C', loaiPhong: 'Đôi', soNguoi: '2', status: 'trống' },
    { id: 14, tenPhong: 'P303', toaNha: 'C', loaiPhong: 'Đơn', soNguoi: '1', status: 'đã thuê' }
  ];
  const a = [
    { id: 1, tenPhong: 'P101', toaNha: 'A', loaiPhong: 'Đơn', soNguoi: '1', status: 'trống' },
    { id: 2, tenPhong: 'P102', toaNha: 'A', loaiPhong: 'Đôi', soNguoi: '2', status: 'đã thuê' },
    { id: 3, tenPhong: 'P201', toaNha: 'B', loaiPhong: 'VIP', soNguoi: '3', status: 'trống' },
    { id: 4, tenPhong: 'P202', toaNha: 'B', loaiPhong: 'Đơn', soNguoi: '1', status: 'đã thuê' },
    { id: 5, tenPhong: 'P301', toaNha: 'C', loaiPhong: 'VIP', soNguoi: '4', status: 'trống' },
    { id: 6, tenPhong: 'P302', toaNha: 'C', loaiPhong: 'Đôi', soNguoi: '2', status: 'trống' },
    
  ];
  const B = [
    { id: 1, tenPhong: 'P101', toaNha: 'A', loaiPhong: 'Đơn', soNguoi: '1', status: 'trống' },
    { id: 2, tenPhong: 'P102', toaNha: 'A', loaiPhong: 'Đôi', soNguoi: '2', status: 'đã thuê' },
   
  ];
  const [data, setData] = useState(initialData);
  const [dataA, setDataA] = useState(a);
  const [dataB, setDataB] = useState(B);
  const [currentTab, setCurrentTab] = useState('ds');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);  
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleDelete = (room) => {
    setRoomToDelete(room);
    setShowDeleteConfirm(true);
  };
  const handleSaveNewRoom = () => {
    setData([...data, { ...editingRoom, id: data.length + 1 }]);
    setIsAddModalOpen(false);
    setEditingRoom(null);
  };
  const handleCloseAdd = () => {
    setIsAddModalOpen(false);
    setEditingRoom(null);
  };
  const handleAddRoom = () => {
    setEditingRoom({ id: null, tenPhong: '', toaNha: '', loaiPhong: '', soNguoi: '', status: 'trống' });
    setIsAddModalOpen(true);
  };
  const confirmDelete = () => {
    setData(data.filter(room => room.id !== roomToDelete.id));
    setShowDeleteConfirm(false);
    setRoomToDelete(null);
  };
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setRoomToDelete(null);
  };
  const handleEdit = (room) => {
    setEditingRoom(room);
    setIsEditModalOpen(true);
  };
  const handleSaveEdit = () => {
    setData(data.map(room =>
      room.id === editingRoom.id ? editingRoom : room
    ));
    setIsEditModalOpen(false);
    setEditingRoom(null);
  };
  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditingRoom(null);
  };
  const filteredData = data.filter(row =>
    Object.values(row).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );
  const filteredDataA = dataA.filter(row =>
    Object.values(row).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );
  const filteredDataB = dataB.filter(row =>
    Object.values(row).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    <div className='room'>
      <div className="room_container">
        <Header_admin/>
        <div className="room_button">
          <button className={`btn toanha ${currentTab === 'toanha' ? 'active-toanha' : ''}`} onClick={() => setCurrentTab('toanha')}> Tòa Nhà</button>
          <button className={`btn phong ${currentTab === 'phong' ? 'active-phong' : ''}`} onClick={() => setCurrentTab('phong')}> Loại Phòng</button>
          <button className={`btn ds ${currentTab === 'ds' ? 'active-ds' : ''}`}onClick={() => setCurrentTab('ds')}>Danh Sách Phòng</button>
          <button className={`btn baotri ${currentTab === 'baotri' ? 'active-baotri' : ''}`} onClick={() => setCurrentTab('baotri')}>Bảo Trì Phòng</button>
        </div>
        {currentTab === 'ds' && (
         <div className="top-bar">
            <button className='a' onClick={handleAddRoom}>Thêm</button>
            <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
         </div>
        )}
        {currentTab === 'ds' && (
          <div className="room_table">
            <table>
              <thead>
                <tr>
                  <th>Tên Phòng</th>
                  <th>Tòa Nhà</th>
                  <th>Loại Phòng</th>
                  <th>Số Người</th>
                  <th>Trạng Thái</th>
                  <th colspan="2">Chức Năng</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(row => (
                  <tr key={row.id}>
                    <td>{row.tenPhong}</td>
                    <td>{row.toaNha}</td>
                    <td>{row.loaiPhong}</td>
                    <td>{row.soNguoi}</td>
                    <td className={row.status === 'trống' ? 'text-green' : 'text-red'}>
                      {row.status === 'trống' ? 'Còn Trống' : 'Đã Thuê'}
                    </td>
                    <td><button className='a' onClick={() => handleEdit(row)}>Sửa</button></td>
                    <td><button className='a' onClick={() => handleDelete(row)}>Xóa</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {currentTab === 'toanha' && (
          <div className="room_table">
          <table>
            <thead>
              <tr>
                <th>Tên Phòng</th>
                <th>Tòa Nhà</th>
                <th>Loại Phòng</th>
                <th>Số Người</th>
                <th>Trạng Thái</th>
                <th colspan="2">Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataB.map(row => (
                <tr key={row.id}>
                  <td>{row.tenPhong}</td>
                  <td>{row.toaNha}</td>
                  <td>{row.loaiPhong}</td>
                  <td>{row.soNguoi}</td>
                  <td className={row.status === 'trống' ? 'text-green' : 'text-red'}>
                    {row.status === 'trống' ? 'Còn Trống' : 'Đã Thuê'}
                  </td>
                  <td><button className='a' onClick={() => handleEdit(row)}>Sửa</button></td>
                  <td><button className='a' onClick={() => handleDelete(row)}>Xóa</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        {currentTab === 'phong' && (
          <div className="room_table">
          <table>
            <thead>
              <tr>
                <th>Tên Phòng</th>
                <th>Tòa Nhà</th>
                <th>Loại Phòng</th>
                <th>Số Người</th>
                <th>Trạng Thái</th>
                <th colspan="2">Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataA.map(row => (
                <tr key={row.id}>
                  <td>{row.tenPhong}</td>
                  <td>{row.toaNha}</td>
                  <td>{row.loaiPhong}</td>
                  <td>{row.soNguoi}</td>
                  <td className={row.status === 'trống' ? 'text-green' : 'text-red'}>
                    {row.status === 'trống' ? 'Còn Trống' : 'Đã Thuê'}
                  </td>
                  <td><button className='a' onClick={() => handleEdit(row)}>Sửa</button></td>
                  <td><button className='a' onClick={() => handleDelete(row)}>Xóa</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        {currentTab === 'baotri' && (
          <div className="room_table">
            <h3>Danh sách bảo trì phòng sẽ hiển thị ở đây.</h3>
          </div>
        )}
        {showDeleteConfirm && (
          <div className="modal">
            <div className="modal-content">
              <h3>Bạn có chắc chắn muốn xóa phòng này không?</h3>
              <button className='a' onClick={confirmDelete}>Xóa</button>
              <button className='a' onClick={cancelDelete}>Hủy</button>
            </div>
          </div>
        )}
        {isEditModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Sửa thông tin phòng</h3>
              <div>
                <label>Tên Phòng:</label>
                <input
                  type="text"
                  value={editingRoom.tenPhong}
                  onChange={(e) => setEditingRoom({ ...editingRoom, tenPhong: e.target.value })}
                />
              </div>
              <div>
                <label>Trạng Thái:</label>
                <select
                  value={editingRoom.status}
                  onChange={(e) => setEditingRoom({ ...editingRoom, status: e.target.value })}
                >
                  <option value="trống">Còn Trống</option>
                  <option value="đã thuê">Đã Thuê</option>
                </select>
              </div>
              <button className='a' onClick={handleSaveEdit}>Lưu</button>
              <button className='a' onClick={handleCloseEdit}>Thoát</button>
            </div>
          </div>
        )}
        {isAddModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Thêm Thông Tin Phòng</h3>
              <div>
                <label>Tên Phòng:</label>
                <input
                  type="text"
                  value={editingRoom.tenPhong}
                  onChange={(e) => setEditingRoom({ ...editingRoom, tenPhong: e.target.value })}
                />
              </div>
              <div>
                <label>Tòa Nhà:</label>
                <input
                  type="text"
                  value={editingRoom.toaNha}
                  onChange={(e) => setEditingRoom({ ...editingRoom, toaNha: e.target.value })}
                />
              </div>
              <div>
                <label>Loại Phòng:</label>
                <input
                  type="text"
                  value={editingRoom.loaiPhong}
                  onChange={(e) => setEditingRoom({ ...editingRoom, loaiPhong: e.target.value })}
                />
              </div>
              <div>
                <label>Số Người:</label>
                <input
                  type="number"
                  value={editingRoom.soNguoi}
                  onChange={(e) => setEditingRoom({ ...editingRoom, soNguoi: e.target.value })}
                />
              </div>
              <div>
                <label>Trạng Thái:</label>
                <select
                  value={editingRoom.status}
                  onChange={(e) => setEditingRoom({ ...editingRoom, status: e.target.value })}
                >
                  <option value="trống">Còn Trống</option>
                  <option value="đã thuê">Đã Thuê</option>
                </select>
              </div>
              <button className='a' onClick={handleSaveNewRoom}>Lưu</button>
              <button className='a' onClick={handleCloseAdd}>Thoát</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomManagment;
