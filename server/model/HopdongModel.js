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
export const getHopDongByMaSV = async (id) => {
  try {
    const [rows] = await db.query('SELECT sinhvien.id, CCCD, hopdong.id, hopdong.trangthai  FROM hopdong,sinhvien WHERE sinhvien.id = hopdong.MaSV and  sinhvien.id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hopdong:', error);
    throw error;
  }
};
export const getHopDongByIdTaiKhoan = async (id) => {
  try {
    const [rows] = await db.query('SELECT taikhoan.id,DonXin,GiayXacNhanSinhVien,CCCDPhoTo,HopDong FROM taikhoan,sinhvien,hopdong,hoso WHERE taikhoan.MaSV = sinhvien.id and sinhvien.id = hopdong.MaSV and hopdong.id=hoso.MaHD AND taikhoan.id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hopdong:', error);
    throw error;
  }
};

export const createHopDong = async (hoadon) => {
  try {
    const {MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu} = hoadon;
     const [result] = await db.query(
      'INSERT INTO hopdong ( MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu]
    );
    return { id: result.insertId };
  } catch (error) {
    console.error('Error in createSinhvien:', error);
    throw error;
  }
};

export const updateHopDong = async (id, newHopDong) => {
  try {
    const oldHopDong = await getHopDongById(id);
    if (!oldHopDong) throw new Error('HopDong not found');
    const MaSV = newHopDong.MaSV || oldHopDong.MaSV;
    const MaPhong = newHopDong.MaPhong || oldHopDong.MaPhong;
    const NgayBatDau = newHopDong.NgayBatDau || oldHopDong.NgayBatDau;
    const NgayKetThuc = newHopDong.NgayKetThuc || oldHopDong.NgayKetThuc;
    const ThoiHan = newHopDong.ThoiHan || oldHopDong.ThoiHan;
    const TrangThai = newHopDong.TrangThai || oldHopDong.TrangThai;
    const GhiChu = newHopDong.GhiChu || oldHopDong.GhiChu;
    await db.query(
      'UPDATE hopdong SET MaSV = ?, MaPhong = ?, NgayBatDau = ?, NgayKetThuc = ?, ThoiHan = ?, TrangThai = ?, GhiChu = ? WHERE id = ?',
      [ MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu,id]
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
