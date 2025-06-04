import { useState, useEffect } from 'react';
import "./RoomManagment.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {createPhong, getAllPhong, getAllPhongData, editPhong, removePhong,getByIdTenPhongTenTN} from "../../../routes/phong";
import {getAllLoaiPhong } from "../../../routes/loaiphong";
import {getAll} from "../../../routes/toanha";
import * as XLSX from 'xlsx';
import { usePhongContext } from '../../../context/PhongContext.jsx';
import { toast } from 'react-toastify';
const phongtab = () => {
  const {setPhongTheoToa,selectedMaTN} = usePhongContext();
  const token = localStorage.getItem('token');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditModalOpenPhong, setIsEditModalOpenPhong] = useState(false);
  const [editingPhong, setEditingPhong] = useState(null);
  const [showDeleteConfirmPhong, setShowDeleteConfirmPhong] = useState(false);
  const [roomToDeletePhong, setRoomToDeletePhong] = useState(null);
  const [isAddModalOpenPhong, setIsAddModalOpenPhong] = useState(false); 
  const [showImportDialogPhong, setShowImportDialogPhong] = useState(false);
  const [excelDataPhong, setExcelDataPhong] = useState([]);
  const [phonglist, setphonglist] = useState([]);
  const [phonglistdata, setphonglistdata] = useState([]);
  const [loaiphonglist, setloaiphonglist] = useState([]);
  const [toaNhaList, setToaNhaList] = useState([]);
  const [showViewDialogPhong, setShowViewDialogPhong] = useState(false);
  const [dsSinhVienPhong, setDsSinhVienPhong] = useState([]);
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
      const fetchPhongData = async () => {
        try {
          const data = await getAllPhongData(token);
          setphonglistdata(data);
        } catch (err) {
          console.error('Lỗi khi tải danh sách:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchPhongData();
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
  const handleAddPhong = () => {
      setEditingPhong({TenPhong:"", MaLoai:"",MaTN:"", TrangThai:"", GhiChu:" "});
      setIsAddModalOpenPhong(true);
    };
  const handleExportExcelPhong = () => {
    const formattedData = phonglistdata.map((phong) => ({
      TenPhong: phong.TenPhong || "",
      LoaiPhong: phong.LoaiPhong || "", 
      TenTN: phong.TenTN || "",   
      TrangThai: phong.TrangThai || "",
      SoNguoi: phong.SoNguoi || "",
      GhiChu: phong.GhiChu || ""
    }));
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Danh_Sach_Phong");
    XLSX.writeFile(wb, "Danh_Sach_Phong.xlsx");
    };
  const handleEditPhong = (room) => {
      setEditingPhong(room);
      setIsEditModalOpenPhong(true);
    };
  const handleDeletePhong = (room) => {
      setRoomToDeletePhong(room);
      setShowDeleteConfirmPhong(true);
    };
  const phongdata = phonglistdata.filter(row =>
      Object.values(row).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  const confirmDeletePhong = async () => {
      try {
        await removePhong(roomToDeletePhong.MaPhong, token);
        const updatedList = await getAllPhong(token);
        const updatedListdata = await getAllPhongData(token);
        setphonglist(updatedList);
        setphonglistdata(updatedListdata);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      } finally {
        setShowDeleteConfirmPhong(false);
        setRoomToDeletePhong(null);
      }
    };
  const cancelDeletePhong = () => {
      setShowDeleteConfirmPhong(false);
      setRoomToDeletePhong(null);
    };
  const handleSaveEditPhong = async () => {
      if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
      try {
        await editPhong(editingPhong.MaPhong, { 
          TenPhong: editingPhong.TenPhong,
          MaLoai: editingPhong.MaLoai,
          MaTN: editingPhong.MaTN,
          TrangThai: editingPhong.TrangThai,
          GhiChu: editingPhong.GhiChu,
        }, token);
        const [updatedList, updatedData] = await Promise.all([
          getAllPhong(token),
          getAllPhongData(token)
          ]);
          setphonglist(updatedList);
          setphonglistdata(updatedData);
        setIsEditModalOpenPhong(false);
        setEditingPhong(null);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  const handleCloseEditPhong = () => {
      setIsEditModalOpenPhong(false);
      setEditingPhong(null);
    };
  const handleImportExcelPhong = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log("Dữ liệu Excel:", data);
        setExcelDataPhong(data);
      };
      reader.readAsBinaryString(file);
    };
  const handleConfirmImportPhong = async () => {
      try {
        await Promise.all(excelDataPhong.map(async (item) => {
          const loaiphong = loaiphonglist.find(lp => lp.LoaiPhong === item.LoaiPhong);
          const toanha = toaNhaList.find(tn => tn.TenTN === item.TenTN);
            await createPhong({
              TenPhong: item.TenPhong,
              MaLoai: loaiphong.MaLoai,
              MaTN: toanha.MaTN,
              TrangThai: item.TrangThai,
              GhiChu: item.GhiChu,
            });
        }));
        
        setShowImportDialogPhong(false);
        const updatedList = await getAllPhong(token);
        const updatedData = await getAllPhongData(token);
        setphonglist(updatedList);
        setphonglistdata(updatedData); 
        toast.success('Thành công');
      } catch (error) {
       toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  const handleCreatePhong = async () => {
    if (!window.confirm('Bạn có chắc muốn thêm mới phòng này không?')) return;
    try {
        await createPhong(editingPhong);
        const updatedList = await getAllPhong(token);
        const updatedListdata = await getAllPhongData(token);
        setphonglist(updatedList); 
        setphonglistdata(updatedListdata); 
        setSearchKeyword(""); 
        setIsAddModalOpenPhong(false); 
        setEditingPhong(null);
        toast.success('Thành công');
    } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
    }
    };
  const handleCloseAddPhong = () => {
      setIsAddModalOpenPhong(false);
      setEditingPhong(null);
    };
  return (
     <div className='room'>
        <div className="room_container">
            <Header_admin />
            <div>
            <div className="top-bar">
              <button className='a' onClick={handleAddPhong}>➕Thêm</button>
              <button className='a' onClick={() => setShowImportDialogPhong(true)}>🗂️Nhập file Excel</button>
              <button className='a' onClick={handleExportExcelPhong}>📁Xuất File Excel</button>
              <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
            </div>
            <div className="room_table">                                    
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Phòng</th>
                    <th>Loại Phòng</th>
                    <th>Tòa Nhà</th>
                    <th>Trạng Thái</th>
                    <th>Số Người trong Phòng</th>
                    <th colSpan="2">Chức Năng</th>
                  </tr>
                </thead>
                <tbody>
                  {phongdata.map((row, index) =>{ const fullPhong = phonglist.find(p => p.MaPhong === row.MaPhong); return(
                    <tr key={row.id}  onClick={(e) => { if (e.target.tagName !== 'BUTTON') { getByIdTenPhongTenTN(row.TenPhong, row.TenTN).then(data => { setDsSinhVienPhong(data); setShowViewDialogPhong(true); }); setShowViewDialogPhong(true);}}}>
                      <td >{index + 1}</td>
                      <td>{row.TenPhong}</td>
                      <td>{row.LoaiPhong}</td>
                      <td>{row.TenTN}</td>
                      <td className={`trangthai ${  row.TrangThai === 'Trống' ? 'bg-green' :  row.TrangThai === 'Đã đầy' ? 'bg-red' :  row.TrangThai === 'Còn chỗ' ? 'bg-yellow' :  row.TrangThai === 'Đang Sửa Chữa' ? 'bg-orange' :  'bg-default'}`}> {row.TrangThai}</td>
                      <td>{row.SoLuongHopDong}/{row.SoNguoi}</td>
                      <td><button className='a' onClick={() => handleEditPhong(fullPhong)}>✏️Sửa</button></td>
                      <td><button className='a' onClick={() => handleDeletePhong(row)}>❌Xóa</button></td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
            {showDeleteConfirmPhong && (
          <div className="modal">
            <div className="modal-content">
              <h3>Bạn có chắc chắn muốn xóa phòng này không?</h3>
              <button className='a-btn' onClick={confirmDeletePhong}>Xóa</button>
              <button className='a-btn' onClick={cancelDeletePhong}>Hủy</button>
            </div>
          </div>
            )}
            {isEditModalOpenPhong && (
          <div className="modal">
            <div className="modal-content-room">
              <h3>SỬA THÔNG TIN PHÒNG</h3>
              <div>
                <label>Tên Phòng:</label>
                <input  type="text"  value={editingPhong.TenPhong}
                  onChange={(e) => setEditingPhong({ ...editingPhong, TenPhong: e.target.value })}
                /><br/>
                <label>Loại Phòng:</label>
                <select value={editingPhong.MaLoai}
                  onChange={(e) => setEditingPhong({ ...editingPhong, MaLoai: e.target.value })}
                ><br/>
                  <option value="">-- Chọn loại phòng --</option>
                    {loaiphonglist.map((loai) => (
                  <option key={loai.MaLoai} value={loai.MaLoai}>
                        {loai.LoaiPhong}
                  </option>
                  ))}
                </select><br/>
                <label>Tòa Nhà:</label>
                <select value={editingPhong.MaTN}
                  onChange={(e) => setEditingPhong({ ...editingPhong, MaTN: e.target.value })}
                >
                  <option value="">-- Chọn tòa nhà --</option>
                    {toaNhaList.map((loai) => (
                  <option key={loai.MaTN} value={loai.MaTN}>
                        {loai.TenTN}
                  </option>
                  ))}
                </select><br/>
                <label>Trạng Thái:</label>
                <select value={editingPhong.TrangThai}  onChange={(e) => setEditingPhong({ ...editingPhong, TrangThai: e.target.value })}>
                  <option value="">-- Chọn Trạng Thái --</option>
                  <option value="Trống">Trống</option>
                  <option value="Đã đầy">Đã đầy</option>
                  <option value="Còn chỗ">Còn chỗ</option>
                  <option value="Đang Sửa Chữa">Đang sửa chữa</option>
                </select><br/>
              </div>
              <button className='a-btn' onClick={handleSaveEditPhong}>Lưu</button>
              <button className='a-btn' onClick={handleCloseEditPhong}>Thoát</button>
            </div>
          </div>
            )}
            {isAddModalOpenPhong && (
          <div className="modal">
            <div className="modal-content-room">
              <h3>THÊM THÔNG TIN PHÒNG</h3>
              <div>
                Tên Phòng:<br/>
                <input  type="text"  value={editingPhong.TenPhong}  onChange={(e) => setEditingPhong({ ...editingPhong, TenPhong: e.target.value })}/><br/>
                Loại Phòng:<br/>
                <select value={editingPhong.MaLoai}  onChange={(e) => setEditingPhong({ ...editingPhong, MaLoai: e.target.value })} >
                  <option value="">-- Chọn loại phòng --</option>
                    {loaiphonglist.map((loai) => (
                    <option key={loai.MaLoai} value={loai.MaLoai}>  {loai.LoaiPhong} </option>
                    ))}
                </select><br/>
                Tòa Nhà:<br/>
                <select value={editingPhong.MaTN}  onChange={(e) => setEditingPhong({ ...editingPhong, MaTN: e.target.value })} >
                  <option value="">-- Chọn tòa nhà --</option>
                    {toaNhaList.map((loai) => (
                      <option key={loai.MaTN} value={loai.MaTN}> {loai.TenTN}</option>
                    ))}
                </select><br/>
                Trạng Thái:<br/>
                <select value={editingPhong.TrangThai}  onChange={(e) => setEditingPhong({ ...editingPhong, TrangThai: e.target.value })}>
                  <option value="">-- Chọn Trạng Thái --</option>
                  <option value="Trống">Trống</option>
                  <option value="Đã Đầy">Đã đầy</option>
                  <option value="Còn Chỗ">Còn chỗ</option>
                  <option value="Đang Sửa Chữa">Đang sửa chữa</option>
                </select><br/>
              </div>
              <button className='a-btn' onClick={handleCreatePhong}>Lưu</button>
              <button className='a-btn' onClick={handleCloseAddPhong}>Thoát</button>
            </div>
          </div>
            )}
            {showImportDialogPhong && (
          <div className="modal">
            <div className="modal-content-excel">
              <h3>Nhập danh sách phòng từ Excel</h3>
              <input type="file" accept=".xlsx, .xls" onChange={handleImportExcelPhong} /><br/>
              <button className="a-btn" onClick={handleConfirmImportPhong}>Đồng Ý Nhập</button>
              <button className="a-btn" onClick={() => setShowImportDialogPhong(false)}>Hủy</button>
            </div>
          </div>
            )}
            {showViewDialogPhong && (
            <div className="modal">
              <div className="modal-content-room-view">
                <h3>Danh sách sinh viên đang ở phòng</h3>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Họ Tên</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Trạng Thái Hợp Đồng</th>
                  </tr>
                </thead>
                <tbody>
                  {dsSinhVienPhong.map((sv, idx) => (
                  <tr key={sv.id}>
                    <td>{idx + 1}</td>
                    <td>{sv.HoTen}</td>
                    <td>{new Date(sv.NgayBatDau).toLocaleDateString('vi-VN')}</td>
                    <td>{new Date(sv.NgayKetThuc).toLocaleDateString('vi-VN')}</td>
                    <td>{sv.trangthaihopdong}</td>
                  </tr>
                  ))}
                </tbody>
                <br />
                <button className="a-btn" onClick={() => setShowViewDialogPhong(false)}>Đóng</button>
                </div>
                </div>
            )}
            </div>
        </div>
    </div>
  )
}

export default phongtab