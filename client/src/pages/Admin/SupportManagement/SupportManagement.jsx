import React,{useEffect,useState} from 'react'
import "./SupportManagement.css";
import Header_admin from "../../../component/Header_admin/Header_admin";
import {createGopY, getAllGopY, editGopY, removeGopY} from "../../../routes/gopy";
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

const SupportManagemant = () => {
  const token = localStorage.getItem('token');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [DichVulist, setDichVulist] = useState([]);
  useEffect(() => {
          const fetchDichVu = async () => {
                try {
                  const data = await getAllGopY(token);
                  setDichVulist(data);
                } catch (err) {
                  toast.error('Lỗi khi tải danh sách:', err);
                } finally {
                  setLoading(false);
                }
              };
              fetchDichVu();
      }, [token]);
    const dichvu = DichVulist.filter(row =>
              Object.values(row).some(
                value =>
                  typeof value === 'string' &&
                  value.toLowerCase().includes(searchKeyword.toLowerCase())
              )
  );
  if (loading) return <p>Đang tải...</p>;

  return (
    <div className='support-admin'>
      <div className='support-admin-component'>
          <Header_admin/>
        <div >
          <div className="top-bar">
            <input className="search" placeholder="Tìm kiếm..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
          </div>
          <div className="room_table">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Sinh Viên Góp ý </th>
              <th>Nội Dung</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {dichvu.map((row, index) => (
            <tr key={row.id} >
                <td>{index + 1}</td>
                <td>{row.HoTen}</td>
                <td>{row.NoiDung}</td>
                <td>{new Date(row.Tgian).toLocaleDateString('vi-VN')}</td>
            </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportManagemant