import db from '../config/database.js';

export const getAllHoaDon = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM hoadon');
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

export const createHoaDon = async (hoadon) => {
  try {
    const { MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc } = hoadon;
    await db.query(
      'INSERT INTO hoadon ( MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc]
    );
  } catch (error) {
    console.error('Error in createHoaDon:', error);
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
