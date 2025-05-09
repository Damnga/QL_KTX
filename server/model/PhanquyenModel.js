import db from '../config/database.js';

export const getAllPhanQuyen = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM phanquyen');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phan quyen:', error);
    throw error;
  }
};

export const getPhanQuyenById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM phanquyen WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phan quyen:', error);
    throw error;
  }
};

export const createPhanQuyen = async (hoadon) => {
  try {
    const {TenPQ} = hoadon;
    await db.query( 'INSERT INTO phanquyen (TenPQ) VALUES (?)',[TenPQ]);
  } catch (error) {
    console.error('Error in createphanquyen:', error);
    throw error;
  }
};

export const updatePhanQuyen = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getPhanQuyenById(id);
    if (!oldBaoTri) throw new Error('phan quyen not found');
    const TenPQ = newBaoTri.TenPQ || oldBaoTri.TenPQ;
    await db.query( 'UPDATE phanquyen SET TenPQ = ? WHERE id = ?', [TenPQ, id]);
  } catch (error) {
    console.error('Error in updatePhanQuyen:', error);
    throw error;
  }
};

export const deletePhanQuyen = async (id) => {
  try {
    await db.query('DELETE FROM phanquyen WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in delete phan quyen:', error);
    throw error;
  }
};
