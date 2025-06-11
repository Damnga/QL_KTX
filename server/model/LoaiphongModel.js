import db from '../config/database.js';

export const getAllLoaiPhong = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM loaiphong');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách loai phòng:', error);
    throw error;
  }
};

export const getLoaiPhongById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM loaiphong WHERE MaLoai = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách loai phòng:', error);
    throw error;
  }
};

export const createLoaiPhong = async (loaiphong) => {
  try {
    const { LoaiPhong, SoNguoi, BanGhe, Giuong, Tu, GiaThue, GhiChu } = loaiphong;
    await db.query(
      'INSERT INTO loaiphong (LoaiPhong, SoNguoi, BanGhe, Giuong, Tu, GiaThue, GhiChu) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [LoaiPhong, SoNguoi, BanGhe, Giuong, Tu, GiaThue, GhiChu]
    );
  } catch (error) {
    console.error('Error in createLoaiPhong:', error);
    throw error;
  }
};

export const updateLoaiPhong = async (id, newLoaiPhong) => {
  try {
    const oldLoaiPhong = await getLoaiPhongById(id);
    if (!oldLoaiPhong) throw new Error('LoaiPhong not found');
    const LoaiPhong = newLoaiPhong.LoaiPhong || oldLoaiPhong.LoaiPhong;
    const SoNguoi = newLoaiPhong.SoNguoi || oldLoaiPhong.SoNguoi;
    const BanGhe = newLoaiPhong.BanGhe || oldLoaiPhong.BanGhe;
    const Giuong = newLoaiPhong.Giuong || oldLoaiPhong.Giuong;
    const Tu = newLoaiPhong.Tu || oldLoaiPhong.Tu;
    const GiaThue = newLoaiPhong.GiaThue || oldLoaiPhong.GiaThue;
    const GhiChu = newLoaiPhong.GhiChu || oldLoaiPhong.GhiChu;
    await db.query(
      'UPDATE loaiphong SET LoaiPhong = ?, SoNguoi = ?, BanGhe = ?, Giuong = ?,Tu = ?, GiaThue = ?, GhiChu = ? WHERE MaLoai = ?',
      [LoaiPhong, SoNguoi, BanGhe, Giuong, Tu, GiaThue, GhiChu, id]
    );
  } catch (error) {
    console.error('Error in updateLoaiPhong:', error);
    throw error;
  }
};

export const deleteLoaiPhong = async (id) => {
  try {
    await db.query('DELETE FROM loaiphong WHERE MaLoai = ?', [id]);
  } catch (error) {
    console.error('Error in deleteLoaiPhong:', error);
    throw error;
  }
};
