import db from '../config/database.js';

export const getAllHoaDonDichVu = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM thanhtoandichvu');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hoa don dich vu :', error);
    throw error;
  }
};

export const getHoaDonDichVuById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM thanhtoandichvu WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hoa don dich vu:', error);
    throw error;
  }
};

export const createHoaDonDichVu = async (hoadon) => {
  try {
    const {MaHD, TgianBatDau, TgianKetThuc, TrangThai, GhiChu, NgayLap, NguoiLap, NgayThanhToan} = hoadon;
    await db.query(
      'INSERT INTO thanhtoandichvu (MaHD, TgianBatDau, TgianKetThuc, TrangThai, GhiChu, NgayLap, NguoiLap, NgayThanhToan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [MaHD, TgianBatDau, TgianKetThuc, TrangThai, GhiChu, NgayLap, NguoiLap, NgayThanhToan]
    );
  } catch (error) {
    console.error('Error in createHoaDonDichVu:', error);
    throw error;
  }
};

export const updateHoaDonDichVu = async (id, newDichVu) => {
  try {
    const oldDichVu = await getHoaDonDichVuById(id);
    if (!oldDichVu) throw new Error('Hoa Don dich vu not found');
    const MaHD = newDichVu.MaHD || oldDichVu.MaHD;
    const TgianBatDau = newDichVu.TgianBatDau || oldDichVu.TgianBatDau;
    const TgianKetThuc = newDichVu.TgianKetThuc || oldDichVu.TgianKetThuc;
    const TrangThai = newDichVu.TrangThai || oldDichVu.MaTTTrangThaiDV;
    const GhiChu = newDichVu.GhiChu || oldDichVu.GhiChu;
    const NgayLap = newDichVu.NgayLap || oldDichVu.NgayLap;
    const NguoiLap = newDichVu.NguoiLap || oldDichVu.NguoiLap;
    const NgayThanhToan = newDichVu.NgayThanhToan || oldDichVu.NgayThanhToan;
    await db.query(
      'UPDATE thanhtoandichvu SET MaHD = ?, TgianBatDau = ?, TgianKetThuc = ?,TrangThai = ?, GhiChu = ?, NgayLap = ?,NguoiLap = ?, NgayThanhToan = ? WHERE id = ?',
      [MaHD, TgianBatDau, TgianKetThuc, TrangThai, GhiChu, NgayLap, NguoiLap, NgayThanhToan, id]
    );
  } catch (error) {
    console.error('Error in updateChiTietDichVu:', error);
    throw error;
  }
};

export const deleteHoaDonDichVu = async (id) => {
  try {
    await db.query('DELETE FROM thanhtoandichvu WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteHoaDonDichVu:', error);
    throw error;
  }
};
