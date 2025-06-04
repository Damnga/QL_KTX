import db from '../config/database.js';

export const getAllHoSo = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM hoso');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách ho so:', error);
    throw error;
  }
};

export const getHoSoById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM hoso WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách ho so:', error);
    throw error;
  }
};

export const createHoSo = async (hoadon) => {
  try {
    const {DonXin, GiayXacNhanSinhVien, CCCDPhoTo, HopDong, MaHD} = hoadon;
    await db.query(
      'INSERT INTO hoso (DonXin, GiayXacNhanSinhVien, CCCDPhoTo, MaHD) VALUES (?, ?, ?, ?)',
      [DonXin, GiayXacNhanSinhVien, CCCDPhoTo,MaHD]
    );
  } catch (error) {
    console.error('Error in createHoSo:', error);
    throw error;
  }
};

export const updateHoSo = async (MaHD, newHoSo) => {
  try {
    const oldHoSo = await getHoSoById(MaHD);
    if (!oldHoSo) throw new Error('Ho So not found');
    const DonXin = newHoSo.DonXin || oldHoSo.DonXin;
    const GiayXacNhanSinhVien = newHoSo.GiayXacNhanSinhVien || oldHoSo.GiayXacNhanSinhVien;
    const CCCDPhoTo = newHoSo.CCCDPhoTo || oldHoSo.CCCDPhoTo;
    const HopDong = newHoSo.HopDong || oldHoSo.HopDong;
    await db.query(
      'UPDATE hoso SET DonXin = ?, GiayXacNhanSinhVien = ?, CCCDPhoTo = ?, HopDong = ? WHERE MaHD = ?',
      [DonXin, GiayXacNhanSinhVien, CCCDPhoTo, HopDong, MaHD]
    );
  } catch (error) {
    console.error('Error in updateHoSo:', error);
    throw error;
  }
};

export const deleteHoSo = async (id) => {
  try {
    await db.query('DELETE FROM hoso WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteHoSo:', error);
    throw error;
  }
};
