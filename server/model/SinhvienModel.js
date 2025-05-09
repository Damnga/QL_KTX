import db from '../config/database.js';

export const getAllSinhVien = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM sinhvien');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh vien:', error);
    throw error;
  }
};

export const getSinhVienById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM sinhvien WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh vien:', error);
    throw error;
  }
};

export const createSinhVien = async (hoadon) => {
  try {
    const {MaSV, HoTen, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, anh, GhiChu, MaND} = hoadon;
    await db.query(
      'INSERT INTO sinhvien (MaSV, HoTen, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, anh, GhiChu, MaND) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [MaSV, HoTen, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, Anh, GhiChu, MaND]
    );
  } catch (error) {
    console.error('Error in createSinhvien:', error);
    throw error;
  }
};

export const updateSinhVien = async (id, newHoSo) => {
  try {
    const oldHoSo = await getHoSoById(id);
    if (!oldHoSo) throw new Error('Sinh Vien not found');
    const MaSV = newHoSo.MaSV || oldHoSo.MaSV;
    const HoTen = newHoSo.HoTen || oldHoSo.HoTen;
    const QueQuan = newHoSo.QueQuan || oldHoSo.QueQuan;
    const GioiTinh = newHoSo.GioiTinh || oldHoSo.GioiTinh;
    const Email = newHoSo.Email || oldHoSo.Email;
    const CCCD = newHoSo.CCCD || oldHoSo.CCCD;
    const SDT = newHoSo.SDT || oldHoSo.SDT;
    const Truong = newHoSo.Truong || oldHoSo.Truong;
    const Lop = newHoSo.Lop || oldHoSo.Lop;
    const NienKhoa = newHoSo.NienKhoa || oldHoSo.NienKhoa;
    const anh = newHoSo.anh || oldHoSo.anh;
    const GhiChu = newHoSo.GhiChu || oldHoSo.GhiChu;
    const MaND = newHoSo.MaND || oldHoSo.MaND;
    await db.query(
      'UPDATE hoso SET MaSV = ?, HoTen = ?, QueQuan = ?, GioiTinh = ?, Email = ?, CCCD = ?, SDT = ?, Truong = ?, Lop = ?, NienKhoa = ?, anh = ?, GhiChu = ?, MaND = ? WHERE id = ?',
      [MaSV, HoTen, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, anh, GhiChu, MaND, id]
    );
  } catch (error) {
    console.error('Error in updateSinhVien:', error);
    throw error;
  }
};

export const deleteSinhVien = async (id) => {
  try {
    await db.query('DELETE FROM sinhvien WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteSinhVien:', error);
    throw error;
  }
};
