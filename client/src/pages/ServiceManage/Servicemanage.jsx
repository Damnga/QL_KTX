import React, { useState, useMemo } from 'react';
import "./Servicemanage.css"
import Header_admin from '../../component/Header_admin/Header_admin';
const Servicemanage = () => {
  const initialData = [
      { id: 1, customer: 'Nguyễn Văn A', amount: 500000, date: '2025-04-01', status: 'Quá Hạn' },
      { id: 2, customer: 'Trần Thị B', amount: 1200000, date: '2025-04-03', status: 'Chưa thanh toán' },
      { id: 3, customer: 'Lê Văn C', amount: 800000, date: '2025-04-05', status: 'Đã thanh toán' },
      { id: 4, customer: 'Phạm D', amount: 1500000, date: '2025-04-07', status: 'Chưa thanh toán' },
      { id: 5, customer: 'Võ E', amount: 2000000, date: '2025-04-09', status: 'Đã thanh toán' },
      { id: 6, customer: 'Lý F', amount: 450000, date: '2025-04-11', status: 'Chưa thanh toán' },
      { id: 7, customer: 'Hà G', amount: 1100000, date: '2025-04-13', status: 'Đã thanh toán' },
      { id: 8, customer: 'Nguyễn H', amount: 900000, date: '2025-04-15', status: 'Chưa thanh toán' },
      { id: 9, customer: 'Trần I', amount: 1300000, date: '2025-04-17', status: 'Đã thanh toán' },
      { id: 10, customer: 'Lê J', amount: 1700000, date: '2025-04-19', status: 'Chưa thanh toán' },
      { id: 11, customer: 'Phạm K', amount: 600000, date: '2025-04-21', status: 'Đã thanh toán' },
      { id: 12, customer: 'Võ L', amount: 1400000, date: '2025-04-23', status: 'Chưa thanh toán' },
      { id: 13, customer: 'Lý M', amount: 800000, date: '2025-04-25', status: 'Đã thanh toán' },
      { id: 14, customer: 'Hà N', amount: 1500000, date: '2025-04-27', status: 'Chưa thanh toán' },
      { id: 15, customer: 'Nguyễn O', amount: 900000, date: '2025-04-29', status: 'Đã thanh toán' },
      { id: 16, customer: 'Trần P', amount: 1200000, date: '2025-05-01', status: 'Chưa thanh toán' },
      { id: 17, customer: 'Lê Q', amount: 650000, date: '2025-05-03', status: 'Đã thanh toán' },
      { id: 18, customer: 'Phạm R', amount: 2000000, date: '2025-05-05', status: 'Quá hạn' },
      { id: 19, customer: 'Võ S', amount: 700000, date: '2025-05-07', status: 'Đã thanh toán' },
      { id: 20, customer: 'Lý T', amount: 800000, date: '2025-05-09', status: 'Quá hạn' },
      { id: 21, customer: 'Lê Văn X', amount: 1000000, date: '2025-05-11', status: 'Quá hạn' },
    ];
  
    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
  
    const columns = [
      { key: 'customer', label: 'Khách hàng' },
      { key: 'amount', label: 'Số tiền' },
      { key: 'date', label: 'Ngày' },
      { key: 'status', label: 'Trạng thái' },
    ];
  
    const filteredData = useMemo(() => {
      let filtered = [...data];
      if (searchTerm) {
        filtered = filtered.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      if (sortConfig.key) {
        filtered.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
          if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });
      }
      return filtered;
    }, [data, searchTerm, sortConfig]);
  
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  
    const handleSort = (key) => {
      setSortConfig((prev) => ({
        key,
        direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
      }));
    };
  return (
    <div className='servicemanage'>
      <div className="container">
      <Header_admin />
        <div className="button-panel">
          <button className="btn btn-primary">TÒA A1</button>
          <button className="btn btn-secondary">TÒA A2</button>
          <button className="btn btn-success">TÒA A3</button>
          <button className="btn btn-danger">TÒA A4</button>
          <button className="btn btn-warning">TÒA A5</button>
          <button className="btn btn-info">TÒA A6</button>
        </div>
        <div className="invoice">
          <input type="text" placeholder="Tìm kiếm..." className="invoice-search-input"value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}/>
          <table className="invoice-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} onClick={() => handleSort(col.key)}>
                    {col.label}
                    {sortConfig.key === col.key && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id}>
                  <td>{row.customer}</td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                  <td className={`status-cell ${row.status === 'Đã thanh toán' ? 'status-paid' : row.status === 'Chưa thanh toán' ? 'status-unpaid' : 'status-overdue'}`}>{row.status}</td>
                </tr>
              ))}
              {Array.from({ length: rowsPerPage - paginatedData.length }).map((_, idx) => (
                <tr key={`empty-${idx}`}>
                  <td colSpan="4">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="invoice-pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>⏮ Trang đầu</button>
            <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}>◀ Trước</button>
            <span>Trang {currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages}>Sau ▶</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Trang cuối ⏭</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Servicemanage