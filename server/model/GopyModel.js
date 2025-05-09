import db from '../config/database.js';

export const getAllGopY = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM gopy');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách gopy:', error);
    throw error;
  }
};

export const getGopYById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM gopy WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách gop y:', error);
    throw error;
  }
};

export const createGopY = async (hoadon) => {
  try {
    const {MaSV, NoiDung, Tgian, GhiChu} = hoadon;
    await db.query('INSERT INTO gopy (MaSV, NoiDung, Tgian, GhiChu) VALUES (?, ?, ?, ?)',[MaSV, NoiDung, Tgian, GhiChu]);
  } catch (error) {
    console.error('Error in createGopY:', error);
    throw error;
  }
};

export const updateGopY = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getBaoTriById(id);
    if (!oldBaoTri) throw new Error('Bao tri not found');
    const MaSV = newBaoTri.MaSV || oldBaoTri.MaSV;
    const NoiDung = newBaoTri.NoiDung || oldBaoTri.NoiDung;
    const Tgian = newBaoTri.Tgian || oldBaoTri.Tgian;
    const GhiChu = newBaoTri.GhiChu || oldBaoTri.GhiChu;
    await db.query(
      'UPDATE baotri SET MaSV = ?, NoiDung = ?, Tgian = ?, GhiChu = ? WHERE id = ?',
      [MaSV, NoiDung, Tgian, GhiChu, id]
    );
  } catch (error) {
    console.error('Error in updateGopY:', error);
    throw error;
  }
};

export const deleteGopY = async (id) => {
  try {
    await db.query('DELETE FROM gopy WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteGopy:', error);
    throw error;
  }
};
