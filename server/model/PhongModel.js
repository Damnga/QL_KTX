import db from '../config/database.js';

export const getAllPhong = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM phong');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phòng:', error);
    throw error;
  }
};

export const getPhongById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM phong WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phòng:', error);
    throw error;
  }
};

export const createPhong = async (phong) => {
  try {
    const { TenPhong,MaLoai,MaTN,anh,TrangThai,GhiChu } = phong;
    await db.query(
      'INSERT INTO phong (TenPhong,MaLoai,MaTN,anh,TrangThai,GhiChu ) VALUES (?, ?, ?, ?, ?, ?)',
      [TenPhong,MaLoai,MaTN,anh,TrangThai,GhiChu]
    );
  } catch (error) {
    console.error('Error in createPhong:', error);
    throw error;
  }
};

export const updatePhong = async (id, newPhong) => {
  try {
    const oldPhong = await getPhongById(id);
    if (!oldPhong) throw new Error('Phong not found');
    const TenPhong = newPhong.TenPhong || oldPhong.TenPhong;
    const MaLoai = newPhong.MaLoai || oldPhong.MaLoai;
    const MaTN = newPhong.MaTN || oldPhong.MaTN;
    const anh = newPhong.anh || oldPhong.anh;
    const TrangThai = newPhong.TrangThai || oldPhong.TrangThai;
    const GhiChu = newPhong.GhiChu || oldPhong.GhiChu;
    await db.query(
      'UPDATE phong SET TenPhong = ?, MaLoai = ?, MaTN = ?, anh = ?, TrangThai = ?, GhiChu = ? WHERE id = ?',
      [TenPhong, MaLoai, MaTN, anh, TrangThai, GhiChu, id]
    );
  } catch (error) {
    console.error('Error in updatePhong:', error);
    throw error;
  }
};

export const deletePhong = async (id) => {
  try {
    await db.query('DELETE FROM phong WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deletePhong:', error);
    throw error;
  }
};
