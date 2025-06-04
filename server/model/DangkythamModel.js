import db from '../config/database.js';

export const getAllDangKyTham = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM dangkytham');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dang ky tham:', error);
    throw error;
  }
};

export const getDangKyThamById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM dawngkytham WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dangkytham:', error);
    throw error;
  }
};
export const getDangKyThamByIdSinhVien = async (id) => {
  try {
    const [rows] = await db.query('SELECT sinhvien.id,nguoithan.HoTen,nguoithan.QuanHe,TgianBatDau,TgianKetThuc,dangkytham.TrangThai FROM sinhvien,nguoithan,dangkytham WHERE sinhvien.id = nguoithan.MaSV AND nguoithan.id=dangkytham.MaNT and sinhvien.id = ?', [id]);
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dangkytham:', error);
    throw error;
  }
};

export const createDangKyTham = async (hoadon) => {
  try {
    const {TgianBatDau, TgianKetThuc, MaNT, TrangThai, GhiChu} = hoadon;
    await db.query(
      'INSERT INTO dangkytham (TgianBatDau, TgianKetThuc, MaNT, TrangThai, GhiChu) VALUES (?, ?, ?, ?, ?)',
      [TgianBatDau, TgianKetThuc, MaNT, TrangThai, GhiChu]
    );
  } catch (error) {
    console.error('Error in createDangKyTham:', error);
    throw error;
  }
};

export const updateDangKyTham = async (id, newdangky) => {
  try {
    const olddangky = await getDangKyThamById(id);
    if (!olddangky) throw new Error('dang ky not found');
    const TgianBatDau = newdangky.TgianBatDau || olddangky.TgianBatDau;
    const TgianKetThuc = newdangky.TgianKetThuc || olddangky.TgianKetThuc;
    const MaNT = newdangky.MaNT || olddangky.MaNT;
    const TrangThai = newdangky.TrangThai || olddangky.TrangThai;
    const GhiChu = newdangky.GhiChu || olddangky.GhiChu;
    await db.query(
      'UPDATE dangkytham SET TgianBatDau = ?, TgianKetThuc = ?, MaNT = ?, TrangThai = ?, GhiChu = ? WHERE id = ?',
      [TgianBatDau, TgianKetThuc, MaNT, TrangThai, GhiChu, id]
    );
  } catch (error) {
    console.error('Error in updateDangkytham:', error);
    throw error;
  }
};

export const deleteDangKyTham = async (id) => {
  try {
    await db.query('DELETE FROM dangkytham WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteDangkytham:', error);
    throw error;
  }
};
