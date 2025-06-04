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
export const getAllThongBaoData = async () => {
  try {
    const [rows] = await db.query('SELECT thongbao.id, NoiDung, Tgian, Username,TenTN, TenPhong,thongbao.MaTK FROM thongbao,taikhoan,phong,toanha where thongbao.MaTK = taikhoan.id and thongbao.MaPhong=phong.MaPhong and phong.MaTN = toanha.MaTN order by Tgian desc');
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
    const { NoiDung, Tgian, MaTK, MaPhong} = phong;
    await db.query(
      'INSERT INTO thongbao ( NoiDung, Tgian, MaTK, MaPhong) VALUES (?, ?, ?, ?)',
      [NoiDung, Tgian, MaTK, MaPhong]
    );
  } catch (error) {
    console.error('Error in createThongBao:', error);
    throw error;
  }
};

export const updateThongBao = async (id, newPhong) => {
  try {
    const oldPhong = await getThongBaoById(id);
    if (!oldPhong) throw new Error('thong bao not found');
    const NoiDung = newPhong.NoiDung || oldPhong.NoiDung;
    const Tgian = newPhong.Tgian || oldPhong.Tgian;
    const MaTK = newPhong.MaTK || oldPhong.MaTK;
    const MaPhong = newPhong.MaPhong || oldPhong.MaPhong;
    await db.query(
      'UPDATE thongbao SET NoiDung = ?, Tgian = ?, MaTK = ?, MaPhong = ? WHERE id = ?',
      [NoiDung, Tgian, MaTK, MaPhong,id]
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
