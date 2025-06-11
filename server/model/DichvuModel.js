import db from '../config/database.js';

export const getAllDichVu = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM dichvu');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dich vu :', error);
    throw error;
  }
};

export const getDichVuById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM dichvu WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dich vu:', error);
    throw error;
  }
};

export const createDichVu = async (hoadon) => {
  try {
    const {TenDV, DonGia, ThoiHan} = hoadon;
    await db.query(
      'INSERT INTO dichvu (TenDV, DonGia, ThoiHan) VALUES (?, ?, ?)',
      [TenDV, DonGia, ThoiHan]
    );
  } catch (error) {
    console.error('Error in createDicVu:', error);
    throw error;
  }
};

export const updateDichVu = async (id, newDichVu) => {
  try {
    const oldDichVu = await getDichVuById(id);
    if (!oldDichVu) throw new Error('dich vu not found');
    const TenDV = newDichVu.TenDV || oldDichVu.TenDV;
    const DonGia = newDichVu.DonGia || oldDichVu.DonGia;
    const ThoiHan = newDichVu.ThoiHan || oldDichVu.ThoiHan;
    await db.query(
      'UPDATE dichvu SET TenDV = ?, DonGia = ?, ThoiHan = ? WHERE id = ?',
      [TenDV, DonGia, ThoiHan, id]
    );
  } catch (error) {
    console.error('Error in updateDichVu:', error);
    throw error;
  }
};

export const deleteDichVu = async (id) => {
  try {
    await db.query('DELETE FROM dichvu WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteDichVu:', error);
    throw error;
  }
};
