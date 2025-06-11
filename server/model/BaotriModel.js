import db from '../config/database.js';

export const getAllBaoTri = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM baotri');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bao tri:', error);
    throw error;
  }
};

export const getAllBaoTriData = async () => {
  try {
    const [rows] = await db.query('SELECT baotri.id ,TenPhong, NoiDung, ThoiGian, TgianBaoTri, baotri.TrangThai, baotri.GhiChu FROM baotri,phong where phong.MaPhong=baotri.Maphong');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bao tri:', error);
    throw error;
  }
};
export const getAllBaoTriPhong = async (TenPhong,TenTN) => {
  try {
    const [rows] = await db.query('SELECT TenPhong, NoiDung, ThoiGian, TgianBaoTri, baotri.TrangThai FROM baotri,phong,toanha where phong.MaTN = toanha.MaTN and phong.MaPhong=baotri.Maphong and TenPhong=? and TenTN=?',[TenPhong,TenTN]);
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bao tri:', error);
    throw error;
  }
};

export const getBaoTriById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM baotri WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bao tri:', error);
    throw error;
  }
};

export const createBaoTri = async (hoadon) => {
  try {
    const {NoiDung, MaPhong, ThoiGian, TgianBaoTri, TrangThai, GhiChu} = hoadon;
    await db.query(
      'INSERT INTO baotri (NoiDung, MaPhong, ThoiGian, TgianBaoTri, TrangThai, GhiChu) VALUES (?, ?, ?, ?, ?, ?)',
      [NoiDung, MaPhong, ThoiGian, TgianBaoTri, TrangThai, GhiChu]
    );
  } catch (error) {
    console.error('Error in createBaoTri:', error);
    throw error;
  }
};

export const updateBaoTri = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getBaoTriById(id);
    if (!oldBaoTri) throw new Error('Bao tri not found');
    const NoiDung = newBaoTri.NoiDung || oldBaoTri.NoiDung;
    const MaPhong = newBaoTri.MaPhong || oldBaoTri.MaPhong;
    const ThoiGian = newBaoTri.ThoiGian || oldBaoTri.ThoiGian;
    const TgianBaoTri = newBaoTri.TgianBaoTri || oldBaoTri.TgianBaoTri;
    const TrangThai = newBaoTri.TrangThai || oldBaoTri.TrangThai;
    const GhiChu = newBaoTri.GhiChu || oldBaoTri.GhiChu;
    await db.query(
      'UPDATE baotri SET NoiDung = ?, MaPhong = ?, ThoiGian = ?, TgianBaoTri = ?, TrangThai = ?, GhiChu = ? WHERE id = ?',
      [NoiDung, MaPhong, ThoiGian, TgianBaoTri, TrangThai, GhiChu, id]
    );
  } catch (error) {
    console.error('Error in updateBaoTri:', error);
    throw error;
  }
};

export const deleteBaoTri = async (id) => {
  try {
    await db.query('DELETE FROM baotri WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteBaoTri:', error);
    throw error;
  }
};
