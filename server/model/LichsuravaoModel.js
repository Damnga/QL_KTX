import db from '../config/database.js';

export const getAllLichSuRaVao = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM lichsuravao');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách lich su ra vao:', error);
    throw error;
  }
};

export const getLichSuRaVaoById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM lichsuravao WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách lich su ra vao:', error);
    throw error;
  }
};

export const createLichSuRaVao = async (hoadon) => {
  try {
    const {MaSV, LoaiHoatDong, Tgian, TrangThai} = hoadon;
    await db.query(
      'INSERT INTO lichsuravao (MaSV, LoaiHoatDong, Tgian, TrangThai) VALUES (?, ?, ?, ?)',
      [MaSV, LoaiHoatDong, Tgian, TrangThai]
    );
  } catch (error) {
    console.error('Error in createLichsuravao:', error);
    throw error;
  }
};


