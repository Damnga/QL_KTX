import db from '../config/database.js';

export const getAllChiTietHoaDon = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM chitiethoadon');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chi tiet hoa don:', error);
    throw error;
  }
};
export const getAllChiTietHoaDonData = async (MaHD) => {
  try {
    const [rows] = await db.query('SELECT * FROM chitiethoadon where MaHD = ?',[MaHD]);
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chi tiet hoa don:', error);
    throw error;
  }
};
export const getChiTietHoaDonById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM chitiethoadon WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chi tiet hoa don:', error);
    throw error;
  }
};

export const createChiTietHoaDon = async (hoadon) => {
  try {
    const {MaHD, TenKhoanThu, SoDau, SoSau, DonGia, GhiChu } = hoadon;
    await db.query(
      'INSERT INTO chitiethoadon (MaHD, TenKhoanThu, SoDau, SoSau, DonGia, GhiChu) VALUES (?, ?, ?, ?, ?, ?)',
      [MaHD, TenKhoanThu, SoDau, SoSau, DonGia, GhiChu]
    );
  } catch (error) {
    console.error('Error in createChiTietHoaDon:', error);
    throw error;
  }
};

export const updateChiTietHoaDon = async (id, newChiTietHoaDon) => {
  try {
    const oldChiTietHoaDon = await getChiTietHoaDonById(id);
    if (!oldChiTietHoaDon) throw new Error('ChiTietHoaDon not found');
    const MaHD = newChiTietHoaDon.MaHD || oldChiTietHoaDon.MaHD;
    const TenKhoanThu = newChiTietHoaDon.TenKhoanThu || oldChiTietHoaDon.TenKhoanThu;
    const SoDau = newChiTietHoaDon.SoDau || oldChiTietHoaDon.SoDau;
    const SoSau = newChiTietHoaDon.SoSau || oldChiTietHoaDon.SoSau;
    const DonGia = newChiTietHoaDon.DonGia || oldChiTietHoaDon.DonGia;
    const GhiChu = newChiTietHoaDon.GhiChu || oldChiTietHoaDon.GhiChu;
    await db.query(
      'UPDATE chitiethoadon SET MaHD = ?, TenKhoanThu = ?, SoDau = ?, SoSau = ?, DonGia = ?, GhiChu = ? WHERE id = ?',
      [MaHD, TenKhoanThu, SoDau, SoSau, DonGia, GhiChu, id]
    );
  } catch (error) {
    console.error('Error in updateChiTietHoaDon:', error);
    throw error;
  }
};

export const deleteChiTietHoaDon = async (id) => {
  try {
    await db.query('DELETE FROM chitiethoadon WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteChiTietHoaDon:', error);
    throw error;
  }
};
