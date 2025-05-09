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
    const {DonXin, GiayXacNhanSinHVien, CCCDPhoTo, HopDong, MaHD} = hoadon;
    await db.query(
      'INSERT INTO hoso (DonXin, GiayXacNhanSinHVien, CCCDPhoTo, HopDong, MaHD) VALUES (?, ?, ?, ?, ?)',
      [DonXin, GiayXacNhanSinHVien, CCCDPhoTo, HopDong, MaHD]
    );
  } catch (error) {
    console.error('Error in createHoSo:', error);
    throw error;
  }
};

export const updateHoSo = async (id, newHoSo) => {
  try {
    const oldHoSo = await getHoSoById(id);
    if (!oldHoSo) throw new Error('Ho So not found');
    const DonXin = newHoSo.DonXin || oldHoSo.DonXin;
    const GiayXacNhanSinHVien = newHoSo.GiayXacNhanSinHVien || oldHoSo.GiayXacNhanSinHVien;
    const CCCDPhoTo = newHoSo.CCCDPhoTo || oldHoSo.CCCDPhoTo;
    const HopDong = newHoSo.HopDong || oldHoSo.HopDong;
    const MaHD = newHoSo.MaHD || oldHoSo.MaHD;
    await db.query(
      'UPDATE hoso SET DonXin = ?, GiayXacNhanSinHVien = ?, CCCDPhoTo = ?, HopDong = ?, MaHD = ? WHERE id = ?',
      [DonXin, GiayXacNhanSinHVien, CCCDPhoTo, HopDong, MaHD, id]
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
