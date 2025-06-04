import db from '../config/database.js';

export const getAllNguoiThan = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM nguoithan');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nguoithan:', error);
    throw error;
  }
};

export const getNguoiThanById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM nguoithan WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nguoithan:', error);
    throw error;
  }
};
export const getNguoiThanByIdSinhVien = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM nguoithan WHERE MaSV= ?', [id]);
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nguoithan:', error);
    throw error;
  }
};

export const createNguoiThan = async (hoadon) => {
  try {
    const {MaSV, HoTen, SDT, DiaChi, QuanHe} = hoadon;
    await db.query(
      'INSERT INTO nguoithan (MaSV, HoTen, SDT, DiaChi, QuanHe) VALUES (?, ?, ?, ?, ?)',
      [MaSV, HoTen, SDT, DiaChi, QuanHe]
    );
  } catch (error) {
    console.error('Error in createNguoithan:', error);
    throw error;
  }
};

export const updateNguoiThan = async (id, newNguoithan) => {
  try {
    const oldNguoithan = await getNguoiThanById(id);
    if (!oldNguoithan) throw new Error('nguoi than not found');
    const MaSV = newNguoithan.MaSV || oldNguoithan.MaSV;
    const HoTen = newNguoithan.HoTen || oldNguoithan.HoTen;
    const SDT = newNguoithan.SDT || oldNguoithan.SDT;
    const DiaChi = newNguoithan.DiaChi || oldNguoithan.DiaChi;
    const QuanHe = newNguoithan.QuanHe || oldNguoithan.QuanHe;
    await db.query(
      'UPDATE nguoithan SET MaSV = ?, HoTen = ?, SDT = ?, DiaChi = ?, QuanHe = ? WHERE id = ?',
      [MaSV, HoTen, SDT, DiaChi, QuanHe, id]
    );
  } catch (error) {
    console.error('Error in updateNguoiThan:', error);
    throw error;
  }
};

export const deleteNguoiThan = async (id) => {
  try {
    await db.query('DELETE FROM nguoithan WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteNguoiThan:', error);
    throw error;
  }
};
