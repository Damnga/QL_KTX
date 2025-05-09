import db from '../config/database.js';

export const getAllHopDong = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM hopdong');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hop dong:', error);
    throw error;
  }
};

export const getHopDongById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM hopdong WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hopdong:', error);
    throw error;
  }
};

export const createHopDong = async (hoadon) => {
  try {
    const {MaHD, MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu } = hoadon;
    await db.query(
      'INSERT INTO hoadon (MaHD, MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [MaHD, MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu]
    );
  } catch (error) {
    console.error('Error in createHopDong:', error);
    throw error;
  }
};

export const updateHopDong = async (id, newHopDong) => {
  try {
    const oldHopDong = await getHopDongById(id);
    if (!oldHopDong) throw new Error('HopDong not found');
    const MaHD = newHopDong.MaHD || oldHopDong.MaHD;
    const MaSV = newHopDong.MaSV || oldHopDong.MaSV;
    const MaPhong = newHopDong.MaPhong || oldHopDong.MaPhong;
    const NgayBatDau = newHopDong.NgayBatDau || oldHopDong.NgayBatDau;
    const NgayKetThuc = newHopDong.NgayKetThuc || oldHopDong.NgayKetThuc;
    const ThoiHan = newHopDong.ThoiHan || oldHopDong.ThoiHan;
    const TrangThai = newHopDong.TrangThai || oldHopDong.TrangThai;
    const GhiChu = newHopDong.GhiChu || oldHopDong.GhiChu;
    await db.query(
      'UPDATE hopdong SET MaHD = ?, MaSV = ?, MaPhong = ?, NgayBatDau = ?, NgayKetThuc = ?, ThoiHan = ?, TrangThai = ?, GhiChu = ? WHERE id = ?',
      [MaHD, MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu,id]
    );
  } catch (error) {
    console.error('Error in updateHopDong:', error);
    throw error;
  }
};

export const deleteHopDong = async (id) => {
  try {
    await db.query('DELETE FROM hopdong WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteHopDong:', error);
    throw error;
  }
};
