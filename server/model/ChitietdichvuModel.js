import db from '../config/database.js';

export const getAllChiTietDichVu = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM chitietdichvu');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chi tiet dich vu :', error);
    throw error;
  }
};

export const getChiTietDichVuById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM chitietdichvu WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chi tiet dich vu:', error);
    throw error;
  }
};

export const createChiTietDichVu = async (hoadon) => {
  try {
    const {MaTTDV, MaDV, GhiChu} = hoadon;
    await db.query(
      'INSERT INTO chitietdichvu (MaTTDV, MaDV, GhiChu) VALUES (?, ?, ?)',
      [MaTTDV, MaDV, GhiChu]
    );
  } catch (error) {
    console.error('Error in createChiTietDichVu:', error);
    throw error;
  }
};

export const updateChiTietDichVu = async (id, newDichVu) => {
  try {
    const oldDichVu = await getChiTietDichVuById(id);
    if (!oldDichVu) throw new Error('Chi Tiet dich vu not found');
    const MaTTDV = newDichVu.MaTTDV || oldDichVu.MaTTDV;
    const MaDV = newDichVu.MaDV || oldDichVu.MaDV;
    const GhiChu = newDichVu.GhiChu || oldDichVu.GhiChu;
    await db.query(
      'UPDATE chitietdichvu SET MaTTDV = ?, MaDV = ?, GhiChu = ? WHERE id = ?',
      [MaTTDV, MaDV, GhiChu, id]
    );
  } catch (error) {
    console.error('Error in updateChiTietDichVu:', error);
    throw error;
  }
};

export const deleteChiTietDichVu = async (id) => {
  try {
    await db.query('DELETE FROM chitietdichvu WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteChiTietDichVu:', error);
    throw error;
  }
};
