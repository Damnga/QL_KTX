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
export const getLichSuRaVaoByIdSinhVien = async (id) => {
  try {
    const [rows] = await db.query('SELECT sinhvien.id,LoaiHoatDong,Tgian,lichsuravao.TrangThai FROM lichsuravao,sinhvien  WHERE sinhvien.id=lichsuravao.MaSV AND  sinhvien.id = ?', [id]);
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách lich su ra vao:', error);
    throw error;
  }
};

export const createLichSuRaVao = async (hoadon) => {
  try {
    const {MaSV, LoaiHoatDong, Tgian, TrangThai} = hoadon;
    await db.query(
      'INSERT INTO lichsuravao (MaSV, LoaiHoatDong, Tgian, TrangThai) VALUES (?, ?, NOW(), ?)',
      [MaSV, LoaiHoatDong, TrangThai]
    );
  } catch (error) {
    console.error('Error in createLichsuravao:', error);
    throw error;
  }
};


