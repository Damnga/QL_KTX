import db from '../config/database.js';

export const getAllTinNhan = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM tinnhan');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tin nhan:', error);
    throw error;
  }
};

export const getTinNhanById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM tinnhan WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tin nhan:', error);
    throw error;
  }
};

export const createTinNhan = async (hoadon) => {
  try {
    const {NoiDung, Tgian, NguoiNhan, NguoiGui} = hoadon;
    await db.query(
      'INSERT INTO tinnhan (NoiDung, Tgian, NguoiNhan, NguoiGui) VALUES (?, ?, ?, ?)',
      [NoiDung, Tgian, NguoiNhan, NguoiGui]
    );
  } catch (error) {
    console.error('Error in createTinNhan:', error);
    throw error;
  }
};

export const updateTinNhan = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getTinNhanById(id);
    if (!oldBaoTri) throw new Error('Tin Nhan not found');
    const NoiDung = newBaoTri.NoiDung || oldBaoTri.NoiDung;
    const Tgian = newBaoTri.Tgian || oldBaoTri.Tgian;
    const NguoiNhan = newBaoTri.NguoiNhan || oldBaoTri.NguoiNhan;
    const NguoiGui = newBaoTri.NguoiGui || oldBaoTri.NguoiGui;
    await db.query(
      'UPDATE tinnhan SET NoiDung = ?, Tgian = ?, NguoiNhan = ?, NguoiGui = ? WHERE id = ?',
      [NoiDung, Tgian, NguoiNhan, NguoiGui, id]
    );
  } catch (error) {
    console.error('Error in update Tin Nhan:', error);
    throw error;
  }
};

export const deleteTinNhan = async (id) => {
  try {
    await db.query('DELETE FROM tinnhan WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteTin Nhan:', error);
    throw error;
  }
};
