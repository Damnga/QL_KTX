import db from '../config/database.js';

export const getAllThamGiaSuKien = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM dangkysukien');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tham gia:', error);
    throw error;
  }
};

export const getThamGiaSukienById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM dangkysukien WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dang ky:', error);
    throw error;
  }
};
export const getThamGiaSukienByIdSinhVien = async (MaSV) => {
  try {
    const [rows] = await db.query('SELECT * FROM dangkysukien WHERE MaSV = ?', [MaSV]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dang ky:', error);
    throw error;
  }
};

export const createThamGiaSuKien = async (hoadon) => {
  try {
    const {MaSV, MaSK, Tgian, TrangThai, GhiChu} = hoadon;
    await db.query(
      'INSERT INTO dangkysukien (MaSV, MaSK, Tgian) VALUES (?, ?, ?)',
      [MaSV, MaSK, Tgian, TrangThai, GhiChu]
    );
  } catch (error) {
    console.error('Error in create tham gia :', error);
    throw error;
  }
};

export const updateThamGiaSukien = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getBaiVietById(id);
    if (!oldBaoTri) throw new Error('tham gia not found');
    const MaSV = newBaoTri.MaSV || oldBaoTri.MaSV;
    const MaSK = newBaoTri.MaSK || oldBaoTri.MaSK;
    const Tgian = newBaoTri.Tgian || oldBaoTri.Tgian;
  
    await db.query(
      'UPDATE dangkysukien SET MaSV = ?, MaSK = ?, Tgian = ? WHERE id = ?',
      [MaSV, MaSK, Tgian, id]
    );
  } catch (error) {
    console.error('Error in update tham gia: ', error);
    throw error;
  }
};

export const deleteThamGiaSuKien = async (id) => {
  try {
    await db.query('DELETE FROM dangkysukien WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in delete tham gia:', error);
    throw error;
  }
};
