import db from '../config/database.js';

export const getAllTuongTac = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM tuongtac');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tuong tac:', error);
    throw error;
  }
};

export const getTuongTacById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM tuongtac WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tuong tac:', error);
    throw error;
  }
};

export const createTuongTac = async (hoadon) => {
  try {
    const {MaTK, MaBV, Tgian} = hoadon;
    await db.query(
      'INSERT INTO tuongtac (MaTK, MaBV, Tgian) VALUES (?, ?, ?)',
      [MaTK, MaBV, Tgian]
    );
  } catch (error) {
    console.error('Error in create tuong tac:', error);
    throw error;
  }
};

export const updateTuongTac = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getTuongTacById(id);
    if (!oldBaoTri) throw new Error('tuong tac not found');
    const MaTK = newBaoTri.MaTK || oldBaoTri.MaTK;
    const MaBV = newBaoTri.MaBV || oldBaoTri.MaBV;
    const Tgian = newBaoTri.Tgian || oldBaoTri.Tgian;
    await db.query(
      'UPDATE tuongtac SET MaTK = ?, MaBV = ?, Tgian = ? WHERE id = ?',
      [MaTK, MaBV, Tgian, id]
    );
  } catch (error) {
    console.error('Error in update tuong tac:', error);
    throw error;
  }
};

export const deleteTuongTac = async (id) => {
  try {
    await db.query('DELETE FROM tuongtac WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in delete tuong tac:', error);
    throw error;
  }
};
