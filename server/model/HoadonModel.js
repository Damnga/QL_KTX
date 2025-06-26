import db from '../config/database.js';

export const getAllHoaDon = async () => {
  try {
    const [rows] = await db.query('SELECT h.id, TenTN, TenPhong, h.GhiChu, h.TgianBatDau, h.TgianKetThuc, SUM((cthd.SoSau - cthd.SoDau) * cthd.DonGia) AS TongTien, h.NgayThanhToan, tk.Username, h.TrangThai FROM hoadon h LEFT JOIN taikhoan tk ON tk.id = h.MaNguoiLap LEFT JOIN phong p ON h.MaPhong = p.MaPhong LEFT JOIN chitiethoadon cthd ON h.id = cthd.MaHD LEFT JOIN toanha tn ON p.MaTN = tn.MaTN GROUP BY h.id ORDER BY h.id DESC');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hoa don:', error);
    throw error;
  }
};

export const getHoaDonById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM hoadon WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hoa don:', error);
    throw error;
  }
};

export const getHoaDonByIdMaSV = async (id) => {
  try {
    const [rows] = await db.query('SELECT sinhvien.id, hoadon.GhiChu, hoadon.TgianBatDau, hoadon.TgianKetThuc, hoadon.NgayThanhToan, hoadon.MaNguoiLap,SUM((chitiethoadon.SoSau - chitiethoadon.SoDau) * chitiethoadon.DonGia) AS TongTien , hoadon.TrangThai FROM sinhvien JOIN hopdong ON sinhvien.id = hopdong.MaSV JOIN phong ON hopdong.MaPhong = phong.MaPhong JOIN hoadon ON phong.MaPhong = hoadon.MaPhong JOIN chitiethoadon ON hoadon.id = chitiethoadon.MaHD WHERE sinhvien.id = ? group by hoadon.id', [id]);
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hoa don:', error);
    throw error;
  }
};

export const createHoaDon = async (hoadon) => {
  try {
    const { MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc } = hoadon;
    const [result] =  await db.query(
      'INSERT INTO hoadon ( MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc]
    );
     return { id: result.insertId, message: "Tạo hóa đơn thành công" };
  } catch (error) {
    throw error;
  }
};

export const updateHoaDon = async (id, newHoaDon) => {
  try {
    const oldHoaDon = await getHoaDonById(id);
    if (!oldHoaDon) throw new Error('HoaDon not found');
    const MaPhong = newHoaDon.MaPhong || oldHoaDon.MaPhong;
    const NgayLap = newHoaDon.NgayLap || oldHoaDon.NgayLap;
    const MaNguoiLap = newHoaDon.MaNguoiLap || oldHoaDon.MaNguoiLap;
    const TrangThai = newHoaDon.TrangThai || oldHoaDon.TrangThai;
    const NgayThanhToan = newHoaDon.NgayThanhToan || oldHoaDon.NgayThanhToan;
    const GhiChu = newHoaDon.GhiChu || oldHoaDon.GhiChu;
    const TgianBatDau = newHoaDon.TgianBatDau || oldHoaDon.TgianBatDau;
    const TgianKetThuc = newHoaDon.TgianKetThuc || oldHoaDon.TgianKetThuc;
    await db.query(
      'UPDATE hoadon SET MaPhong = ?, NgayLap = ?, MaNguoiLap = ?, TrangThai = ?, NgayThanhToan = ?, GhiChu = ?, TgianBatDau = ?, TgianKetThuc = ? WHERE id = ?',
      [MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc,id]
    );
  } catch (error) {
    console.error('Error in updateHoaDon:', error);
    throw error;
  }
};

export const deleteHoaDon = async (id) => {
  try {
    await db.query('DELETE FROM hoadon WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteHoaDon:', error);
    throw error;
  }
};
