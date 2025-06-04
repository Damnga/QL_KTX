import db from '../config/database.js';

export const getAllSuKien = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM sukien');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách su kien:', error);
    throw error;
  }
};
export const getAllSuKienData = async () => {
  try {
    const [rows] = await db.query('SELECT sukien.id,TenSK,NoiDung,Username,TgianBatDau,TgianKetThuc, sukien.anh FROM sukien,taikhoan where sukien.MaTK=taikhoan.id');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách su kien:', error);
    throw error;
  }
};

export const getSuKienById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM sukien WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách su kien:', error);
    throw error;
  }
};

export const createSuKien = async (hoadon) => {
  try {
    const {TenSK, NoiDung, MaTK, TgianBatDau, TgianKetThuc, anh} = hoadon;
    await db.query(
      'INSERT INTO sukien (TenSK, NoiDung, MaTK, TgianBatDau, TgianKetThuc, anh) VALUES (?, ?, ?, ?, ?, ?)',
      [TenSK, NoiDung, MaTK, TgianBatDau, TgianKetThuc, anh]
    );
  } catch (error) {
    console.error('Error in create su kien :', error);
    throw error;
  }
};

export const updateSuKien = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getSuKienById(id);
    if (!oldBaoTri) throw new Error('su kien not found');
    const TenSK = newBaoTri.TenSK || oldBaoTri.TenSK;
    const NoiDung = newBaoTri.NoiDung || oldBaoTri.NoiDung;
    const MaTK = newBaoTri.MaTK || oldBaoTri.MaTK;
    const TgianBatDau = newBaoTri.TgianBatDau || oldBaoTri.TgianBatDau;
    const TgianKetThuc = newBaoTri.TgianKetThuc || oldBaoTri.TgianKetThuc;
    const anh = newBaoTri.anh || oldBaoTri.anh;
    await db.query(
      'UPDATE sukien SET TenSK = ?, NoiDung = ?, MaTK = ?, TgianBatDau = ?, TgianKetThuc = ?, anh = ? WHERE id = ?',
      [TenSK, NoiDung, MaTK, TgianBatDau, TgianKetThuc, anh, id]
    );
  } catch (error) {
    console.error('Error in update su kien: ', error);
    throw error;
  }
};

export const deleteSuKien = async (id) => {
  try {
    await db.query('DELETE FROM sukien WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in delete sukien:', error);
    throw error;
  }
};
