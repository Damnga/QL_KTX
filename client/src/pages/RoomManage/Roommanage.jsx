import React, { useState, useMemo } from 'react';
import "./Roommanage.css";
import Header_admin from '../../component/Header_admin/Header_admin';

const Roonmanage = () => {
  const initialData = [
    { id: 1, name: 'Nguyễn Văn A', age: 22, email: 'a@gmail.com' },
    { id: 2, name: 'Trần Thị B', age: 25, email: 'b@gmail.com' },
    { id: 3, name: 'Lê Văn C', age: 29, email: 'c@gmail.com' },
    { id: 4, name: 'Phạm D', age: 30, email: 'd@gmail.com' },
    { id: 5, name: 'Võ E', age: 20, email: 'e@gmail.com' },
    { id: 6, name: 'Lý F', age: 28, email: 'f@gmail.com' },
    { id: 7, name: 'Võ E', age: 20, email: 'e@gmail.com' },
    { id: 8, name: 'Lý F', age: 28, email: 'f@gmail.com' },
    { id: 9, name: 'Nguyễn Văn A', age: 22, email: 'a@gmail.com' },
    { id: 10, name: 'Trần Thị B', age: 25, email: 'b@gmail.com' },
    { id: 11, name: 'Lê Văn C', age: 29, email: 'c@gmail.com' },
    { id: 12, name: 'Phạm D', age: 30, email: 'd@gmail.com' },
    { id: 13, name: 'Võ E', age: 20, email: 'e@gmail.com' },
    { id: 14, name: 'Lý F', age: 28, email: 'f@gmail.com' },
    { id: 15, name: 'Võ E', age: 20, email: 'e@gmail.com' },
    { id: 16, name: 'Lý F', age: 28, email: 'f@gmail.com' },
  ];
  
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [editRowId, setEditRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const rowsPerPage = 10;
  const columns = [
    { key: 'name', label: 'Họ tên' },
    { key: 'age', label: 'Tuổi' },
    { key: 'email', label: 'Email' },
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

  // Tính toán và phân trang dữ liệu
  const paginatedData = useMemo(() => {
    const dataToDisplay = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // Tính toán số hàng trống cần thêm vào
    const rowsToAdd = rowsPerPage - dataToDisplay.length;
    const emptyRows = Array.from({ length: rowsToAdd }, (_, index) => ({
      id: `empty-${index}`, // Tạo id duy nhất cho mỗi hàng trống
      name: '',
      age: '',
      email: '',
    }));

    return [...dataToDisplay, ...emptyRows];
  }, [filteredData, currentPage]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleEdit = (id) => {
    const row = data.find((d) => d.id === id);
    setEditRowId(id);
    setEditedRow({ ...row });
  };

  const handleSave = (id) => {
    const updated = data.map((row) => (row.id === id ? editedRow : row));
    setData(updated);
    setEditRowId(null);
    setEditedRow({});
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((row) => row.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const handleDeleteSelected = () => {
    setData((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
    setSelectedIds([]);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentIds = paginatedData.map((row) => row.id);
    const allSelected = currentIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...currentIds])]);
    }
  };

  return (
    <div className='roommanage'>
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
        <div className="table-wrapper">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
          <table className="custom-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} onClick={() => handleSort(col.key)}>
                    {col.label}
                    {sortConfig.key === col.key && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                  </th>
                ))}
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {editRowId === row.id && row.name ? (
                        <input
                          value={editedRow[col.key]}
                          onChange={(e) =>
                            setEditedRow((prev) => ({ ...prev, [col.key]: e.target.value }))
                          }
                        />
                      ) : (
                        row[col.key] || ''
                      )}
                    </td>
                  ))}
                  <td>
                    {editRowId === row.id ? (
                      <button onClick={() => handleSave(row.id)}>💾 Lưu</button>
                    ) : (
                      row.name && <button onClick={() => handleEdit(row.id)}>✏️ Sửa</button> 
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedIds.length > 0 && (
            <button className="delete-selected-btn" onClick={handleDeleteSelected}>
              Xoá các dòng đã chọn ({selectedIds.length})
            </button>
          )}
          <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>⏮ Trang đầu</button>
            <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}>◀ Trước</button>
            <span>Trang {currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages}>Sau ▶</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Trang cuối ⏭</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roonmanage;
