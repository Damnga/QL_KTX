import { useState, useEffect } from 'react';
import "./baotritab.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {createBaoTri, getAllBaoTri, getAllBaoTriData, editBaoTri, removeBaoTri} from "../../../routes/baotri";
import {getAll} from "../../../routes/toanha";
import * as XLSX from 'xlsx';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { usePhongContext } from '../../../context/PhongContext.jsx';
import {getAllPhong} from "../../../routes/phong";
import { toast } from 'react-toastify';
const baotritab = () => {
  const token = localStorage.getItem('token');
  const {phongTheoToa, setPhongTheoToa,selectedMaTN, setSelectedMaTN } = usePhongContext();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditModalOpenBaoTri, setIsEditModalOpenBaoTri] = useState(false);
  const [editingBaoTri, setEditingBaoTri] = useState(null);
  const [showDeleteConfirmBaoTri, setShowDeleteConfirmBaoTri] = useState(false);
  const [roomToDeleteBaoTri, setRoomToDeleteBaoTri] = useState(null);
  const [isAddModalOpenBaoTri, setIsAddModalOpenBaoTri] = useState(false); 
  const [showImportDialogBaoTri, setShowImportDialogBaoTri] = useState(false);
  const [excelDataBaoTri, setExcelDataBaoTri] = useState([]);
  const [baotrilist, setbaotrilist] = useState([]);
  const [baotrilistdata, setbaotrilistdata] = useState([]);
  const [toaNhaList, setToaNhaList] = useState([]);
  const [phonglist, setphonglist] = useState([]);
  
  useEffect(() => {
      const fetchBaoTri = async () => {
        try {
          const data = await getAllBaoTri(token);
          setbaotrilist(data);
        } catch (err) {
          console.error('Lỗi khi tải danh sách:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchBaoTri();
    }, [token]);
  useEffect(() => {
      const fetchBaoTriData = async () => {
        try {
          const data = await getAllBaoTriData(token);
          setbaotrilistdata(data);
        } catch (err) {
          console.error('Lỗi khi tải danh sách:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchBaoTriData();
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
  const handleAddBaoTri = () => {
      setEditingBaoTri({ NoiDung:"", MaPhong:"",ThoiGian:new Date(), TgianBaoTri:null, TrangThai:"Chờ tiếp nhận", GhiChu:"  "});
      setIsAddModalOpenBaoTri(true);
    };
  const handleExportExcelBaoTri = () => {
      const formattedData = baotrilistdata.map((phong) => ({
        NoiDung: phong.NoiDung || "",
        TenPhong: phong.TenPhong || "", 
        ThoiGian: format(new Date(phong.ThoiGian),'dd-MM-yyyy') || "",   
        TgianBaoTri: format(new Date(phong.TgianBaoTri),'dd-MM-yyyy') || "",
        TrangThai: phong.TrangThai || "",
        GhiChu: phong.GhiChu || ""
      }));
      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Danh_Sach_Bao_Tri");
      XLSX.writeFile(wb, "Danh_Sach_Bao_Tri.xlsx");
    };
  const handleEditBaoTri = (id) => {
      setEditingBaoTri(id);
      setIsEditModalOpenBaoTri(true);
    };
  const handleDeleteBaoTri = (row) => {
      setRoomToDeleteBaoTri(row);
      setShowDeleteConfirmBaoTri(true);
    };
  const baotridata = baotrilistdata.filter(row =>
      Object.values(row).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  const confirmDeleteBaoTri = async () => {
      try {
        await removeBaoTri(roomToDeleteBaoTri.id, token);
        const updatedList = await getAllBaoTri(token);
        const updatedListdata = await getAllBaoTriData(token);
        setbaotrilist(updatedList);
        setbaotrilistdata(updatedListdata);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      } finally {
        setShowDeleteConfirmBaoTri(false);
        setRoomToDeleteBaoTri(null);
      }
    };
  const cancelDeleteBaoTri = () => {
      setShowDeleteConfirmBaoTri(false);
      setRoomToDeleteBaoTri(null);
    };
  const handleSaveEditBaoTri = async () => {
      if (!window.confirm('Bạn có chắc chắn muốn lưu thay đổi không?')) return;
      try {
        await editBaoTri(editingBaoTri.id, { 
          NoiDung: editingBaoTri.NoiDung,
          MaPhong: editingBaoTri.MaPhong,
          Thoigian: editingBaoTri.Thoigian,
          TgianBaoTri: editingBaoTri.TgianBaoTri,
          TrangThai: editingBaoTri.TrangThai,
          GhiChu: editingBaoTri.GhiChu,
        }, token);
        const [updatedList, updatedData] = await Promise.all([
          getAllBaoTri(token),
          getAllBaoTriData(token)
          ]);
          setbaotrilist(updatedList);
          setbaotrilistdata(updatedData);
        setIsEditModalOpenBaoTri(false);
        setEditingBaoTri(null);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  const handleCloseEditBaoTri = () => {
      setIsEditModalOpenBaoTri(false);
      setEditingBaoTri(null);
    };
  const handleImportExcelBaoTri = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        setExcelDataBaoTri(data);
      };
      reader.readAsBinaryString(file);
    };
  const handleConfirmImportBaoTri = async () => {
      try {
        await Promise.all(excelDataBaoTri.map(async (item) => {
          const phong = phonglist.find(lp => lp.TenPhong.trim().toLowerCase() === item.TenPhong.trim().toLowerCase());
            await createBaoTri({
              NoiDung: item.NoiDung,
              MaPhong: phong.MaPhong,
              ThoiGian: item.ThoiGian,
              TgianBaoTri: item.TgianBaoTri,
              TrangThai: item.TrangThai,
              GhiChu: item.GhiChu,
            });
        }));
         toast.success('Thành công');
        setShowImportDialogBaoTri(false);
        const updatedList = await getAllBaoTri(token);
        const updatedData = await getAllBaoTriData(token);
        setbaotrilist(updatedList);
        setbaotrilistdata(updatedData);
      } catch (error) {
        ctoast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  const handleCreateBaoTri = async () => {
      if (!window.confirm('Bạn có chắc muốn thêm mới bảo trì này không?')) return;
      try {
        await createBaoTri(editingBaoTri);
        const updatedList = await getAllBaoTri(token);
        const updatedListdata = await getAllBaoTriData(token);
        setbaotrilist(updatedList);
        setbaotrilistdata(updatedListdata);
        setIsAddModalOpenBaoTri(false);
        setEditingBaoTri(null);
         toast.success('Thành công');
      } catch (err) {
        toast.error(err?.error || 'Có lỗi xảy ra!');
      }
    };
  const handleCloseAddBaoTri = () => {
      setIsAddModalOpenBaoTri(false);
      setEditingBaoTri(null);
    };
  return (
    <div className='room'>
          <div className="room_container">
            <Header_admin />
            <div>
              <div className="top-bar">
              <button className='a' onClick={handleAddBaoTri}>➕Thêm</button>
              <button className='a' onClick={() => setShowImportDialogBaoTri(true)}>🗂️Nhập file Excel</button>
              <button className='a' onClick={handleExportExcelBaoTri}>📁Xuất File Excel</button>
              <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
              </div>
              <div className="room_table">                                    
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Phòng</th>
                    <th>Nội Dung</th>
                    <th>Thời Gian Yêu Cầu</th>
                    <th>Thời Gian Bảo Trì</th>
                    <th>Trạng Thái</th>
                    <th colSpan="2">Chức Năng</th>
                  </tr>
                </thead>
                <tbody>
                  {baotridata.map((row, index) =>{ const fullBaoTri = baotrilist.find(p => p.id === row.id); return(
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td>{row.TenPhong}</td>
                       <td>{row.NoiDung}</td>
                      <td>{new Date(row.ThoiGian).toLocaleDateString('vi-VN')}</td>
                      <td>{row.TgianBaoTri && !isNaN(new Date(row.TgianBaoTri))   ? new Date(row.TgianBaoTri).toLocaleDateString("vi-VN")   : ""}</td>
                      <td className={`trangthai ${  row.TrangThai === 'Đã bảo trì' ? 'bg-green' :  row.TrangThai === 'Chờ tiếp nhận' ? 'bg-red' :  'bg-default'}`}> {row.TrangThai}</td>
                      <td><button className='a' onClick={() => handleEditBaoTri(fullBaoTri)}>✏️Sửa</button></td>
                      <td><button className='a' onClick={() => handleDeleteBaoTri(row)}>❌Xóa</button></td>
                    </tr>
                  )})}
                </tbody>
              </table>
              </div>
              {showDeleteConfirmBaoTri && (
                      <div className="modal">
                        <div className="modal-content">
                          <h3>Bạn có chắc chắn muốn xóa không?</h3>
                          <button className='a-btn' onClick={confirmDeleteBaoTri}>Xóa</button>
                          <button className='a-btn' onClick={cancelDeleteBaoTri}>Hủy</button>
                        </div>
                      </div>
              )}
              {isEditModalOpenBaoTri && (
                      <div className="modal">
                        <div className="modal-content-room">
                          <h3>SỬA THÔNG TIN BẢO TRÌ</h3>
                          <div>
                            <label>Thời Gian Bảo Trì:</label>
                            <input type="date" value={editingBaoTri.TgianBaoTri} onChange={(e) => setEditingBaoTri({ ...editingBaoTri, TgianBaoTri: e.target.value })}/>
                            <br/>
                            <label>Trạng Thái</label>
                            <select value={editingBaoTri.TrangThai} onChange={(e) => setEditingBaoTri({ ...editingBaoTri, TrangThai: e.target.value })}>
                                <option value="Đã bảo trì">Đã bảo trì</option>
                                <option value="Chờ tiếp nhận">Chờ tiếp nhận</option>
                            </select>
                            <br/>
                          </div>
                          <button className='a-btn' onClick={handleSaveEditBaoTri}>Lưu</button>
                          <button className='a-btn' onClick={handleCloseEditBaoTri}>Thoát</button>
                        </div>
                      </div>
              )}
              {isAddModalOpenBaoTri && (
                      <div className="modal">
                        <div className="modal-content-room">
                          <h3>THÊM THÔNG TIN BẢO TRÌ</h3>
                          <div>
                            <label>Nội Dung:</label>
                            <input  type="text"  value={editingBaoTri.NoiDung}
                              onChange={(e) => setEditingBaoTri({ ...editingBaoTri, NoiDung: e.target.value })}
                            /><br/>
                            <label>Tòa Nhà:</label>
                            <select value={selectedMaTN}
                              onChange={(e) => { const maTN = e.target.value;  setSelectedMaTN(maTN);
                                  setEditingBaoTri({ ...editingBaoTri, MaPhong: "" });
                              }}>
                              <option value="">-- Chọn tòa nhà --</option>
                                {toaNhaList.map((loai) => (
                                <option key={loai.MaTN} value={loai.MaTN}>{loai.TenTN} </option>
                                ))}
                            </select><br/>
                            <label>Tên Phòng:</label>
                            <select value={editingBaoTri.MaPhong}
                              onChange={(e) => setEditingBaoTri({ ...editingBaoTri, MaPhong: e.target.value })}
                            >
                              <option value="">-- Chọn phòng --</option>
                                {phongTheoToa.map((loai) => (
                              <option key={loai.MaPhong} value={loai.MaPhong}>
                                    {loai.TenPhong}
                              </option>
                              ))}
                            </select>
                            <br/>
                          </div>
                          <button className='a-btn' onClick={handleCreateBaoTri}>Lưu</button>
                          <button className='a-btn' onClick={handleCloseAddBaoTri}>Thoát</button>
                        </div>
                      </div>
              )}
              {showImportDialogBaoTri && (
                      <div className="modal">
                        <div className="modal-content-excel">
                          <h3>Nhập danh sách bảo trì từ Excel</h3>
                          <input type="file" accept=".xlsx, .xls" onChange={handleImportExcelBaoTri} /><br/>
                          <button className="a-btn" onClick={handleConfirmImportBaoTri}>Đồng Ý Nhập</button>
                          <button className="a-btn" onClick={() => setShowImportDialogBaoTri(false)}>Hủy</button>
                        </div>
                      </div>
              )}
            </div>
          </div>
    </div>
  )
}

export default baotritab