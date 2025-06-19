import db from '../config/database.js';

export const getAllKyLuat = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM kyluat');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách kyluat:', error);
    throw error;
  }
};

export const getKyLuatById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM kyluat WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách kyluat:', error);
    throw error;
  }
};
export const getKyLuatByIdSinhVien = async (id) => {
  try {
    const [rows] = await db.query('SELECT kyluat.id as ID, sinhvien.id,NgayViPham,NoiDungViPham,HinhThucXuLy FROM kyluat,sinhvien WHERE sinhvien.id = kyluat.MaSV AND sinhvien.id = ?', [id]);
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách kyluat:', error);
    throw error;
  }
};

export const createKyLuat = async (hoadon) => {
  try {
    const {MaSV, NgayViPham, NoiDungViPham, HinhThucXuLy, GhiChu} = hoadon;
    await db.query(
      'INSERT INTO kyluat (MaSV, NgayViPham, NoiDungViPham, HinhThucXuLy, GhiChu) VALUES (?, ?, ?, ?, ?)',
      [MaSV, NgayViPham, NoiDungViPham, HinhThucXuLy, GhiChu]
    );
  } catch (error) {
    console.error('Error in createKyLuat:', error);
    throw error;
  }
};

export const updateKyLuat = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getKyLuatById(id);
    if (!oldBaoTri) throw new Error('ky luat not found');
    const MaSV = newBaoTri.MaSV || oldBaoTri.MaSV;
    const NgayViPham = newBaoTri.NgayViPham || oldBaoTri.NgayViPham;
    const NoiDungViPham = newBaoTri.NoiDungViPham || oldBaoTri.NoiDungViPham;
    const HinhThucXuLy = newBaoTri.HinhThucXuLy || oldBaoTri.HinhThucXuLy;
    const GhiChu = newBaoTri.GhiChu || oldBaoTri.GhiChu;
    await db.query(
      'UPDATE kyluat SET MaSV = ?, NgayViPham = ?, NoiDungViPham = ?, HinhThucXuLy = ?, GhiChu = ? WHERE id = ?',
      [MaSV, NgayViPham, NoiDungViPham, HinhThucXuLy, GhiChu, id]
    );
  } catch (error) {
    console.error('Error in updateBaoTri:', error);
    throw error;
  }
};

export const deleteKyLuat = async (id) => {
  try {
    await db.query('DELETE FROM kyluat WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteKyLuat:', error);
    throw error;
  }
};
