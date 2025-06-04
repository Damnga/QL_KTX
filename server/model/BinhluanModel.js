import db from '../config/database.js';

export const getAllBinhLuan = async () => {
  try {
    const [rows] = await db.query('SELECT binhluan.MaBV, binhluan.Tgian,binhluan.NoiDung,taikhoan.anh,taikhoan.Username FROM binhluan,taikhoan where binhluan.MaTK = taikhoan.id');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách binh luan:', error);
    throw error;
  }
};

export const getBinhLuanById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM binhluan WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách binh luan:', error);
    throw error;
  }
};

export const getBinhLuanByIdData = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM binhluan WHERE MaBV = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách binh luan:', error);
    throw error;
  }
};

export const createBinhLuan = async (hoadon) => {
  try {
    const {MaBV, MaTK, NoiDung, Tgian} = hoadon;
    await db.query(
      'INSERT INTO binhluan (MaBV, MaTK, NoiDung, Tgian) VALUES (?, ?, ?, ?)',
      [MaBV, MaTK, NoiDung, Tgian]
    );
  } catch (error) {
    console.error('Error in create binh luan:', error);
    throw error;
  }
};

export const updateBinhLuan = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getBinhLuanById(id);
    if (!oldBaoTri) throw new Error('binh luan not found');
    const MaBV = newBaoTri.MaBV || oldBaoTri.MaBV;
    const MaTK = newBaoTri.MaTK || oldBaoTri.MaTK;
    const NoiDung = newBaoTri.NoiDung || oldBaoTri.NoiDung;
    const Tgian = newBaoTri.Tgian || oldBaoTri.Tgian;
    await db.query(
      'UPDATE binhluan SET MaBV = ?, MaTK = ?, NoiDung = ?, Tgian = ? WHERE id = ?',
      [MaBV, MaTK, NoiDung, Tgian, id]
    );
  } catch (error) {
    console.error('Error in update binh luan:', error);
    throw error;
  }
};

export const deleteBinhLuan = async (id) => {
  try {
    await db.query('DELETE FROM binhluan WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in delete Binh Luan:', error);
    throw error;
  }
};
