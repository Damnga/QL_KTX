import db from '../config/database.js';

export const getAllThongBao = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM thongbao');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thong bao:', error);
    throw error;
  }
};

export const getThongBaoById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM thongbao WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thong bao:', error);
    throw error;
  }
};

export const createThongBao = async (phong) => {
  try {
    const { NoiDung, Tgian, MaTK, MaPhong, anh } = phong;
    await db.query(
      'INSERT INTO phong (NoiDung, Tgian, MaTK, MaPhong, and ) VALUES (?, ?, ?, ?, ?)',
      [NoiDung, Tgian, MaTK, MaPhong, anh]
    );
  } catch (error) {
    console.error('Error in createThongBao:', error);
    throw error;
  }
};

export const updateThongBao = async (id, newPhong) => {
  try {
    const oldPhong = await getPhongById(id);
    if (!oldPhong) throw new Error('thong bao not found');
    const NoiDung = newPhong.NoiDung || oldPhong.NoiDung;
    const Tgian = newPhong.Tgian || oldPhong.Tgian;
    const MaTK = newPhong.MaTK || oldPhong.MaTK;
    const MaPhong = newPhong.MaPhong || oldPhong.MaPhong;
    const anh = newPhong.anh || oldPhong.anh;
    await db.query(
      'UPDATE thongbao SET NoiDung = ?, Tgian = ?, MaTK = ?, MaPhong = ?, anh = ? WHERE id = ?',
      [NoiDung, Tgian, MaTK, MaPhong, anh, id]
    );
  } catch (error) {
    console.error('Error in updateTHONGBAO:', error);
    throw error;
  }
};

export const deleteThongBao = async (id) => {
  try {
    await db.query('DELETE FROM thongbao WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteThongBao:', error);
    throw error;
  }
};
