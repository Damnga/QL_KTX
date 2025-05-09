import db from '../config/database.js';

export const getAllNguoiDung = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM nguoidung');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nguoidung:', error);
    throw error;
  }
};

export const getNguoiDungById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM nguoidung WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nguoi dung:', error);
    throw error;
  }
};

export const createNguoiDung = async (hoadon) => {
  try {
    const {TenND} = hoadon;
    await db.query( 'INSERT INTO nguoidung (TenND) VALUES (?)',[TenND]);
  } catch (error) {
    console.error('Error in createBaoTri:', error);
    throw error;
  }
};

export const updateNguoiDung = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getNguoiDungById(id);
    if (!oldBaoTri) throw new Error('Nguoi Dung not found');
    const TenND = newBaoTri.TenND || oldBaoTri.TenND;
    await db.query( 'UPDATE baotri SET TenND = ? WHERE id = ?', [TenND, id]);
  } catch (error) {
    console.error('Error in updateNguoiDung:', error);
    throw error;
  }
};

export const deleteNguoiDung = async (id) => {
  try {
    await db.query('DELETE FROM nguoidung WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteNguoiDUng:', error);
    throw error;
  }
};
