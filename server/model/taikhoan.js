import db from '../config/database.js';

export const getAllTaiKhoan = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM taikhoan');
    return rows;
  } catch (error) {
    console.error('Error in getAllTaiKhoan:', error);
    throw error;
  }
};

export const getTaiKhoanByEmail = async (email) => {
  try {
    const [rows] = await db.query('SELECT * FROM taikhoan WHERE email = ?', [email]);
    return rows[0];
  } catch (error) {
    console.error('Error in getTaiKhoanByEmail:', error);
    throw error;
  }
};

export const getTaiKhoanById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM taikhoan WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error in getTaiKhoanById:', error);
    throw error;
  }
};

export const createTaiKhoan = async (taikhoan) => {
  try {
    const { Username, Email, Password, MaPQ, TrangThai, MaND, anh } = taikhoan;
    await db.query(
      'INSERT INTO taikhoan (Username, Email, Password, MaPQ, TrangThai, MaND, anh) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [Username, Email, Password, MaPQ, TrangThai, MaND, anh]
    );
  } catch (error) {
    console.error('Error in createTaiKhoan:', error);
    throw error;
  }
};

export const updateTaiKhoan = async (id, newTaiKhoan) => {
  try {
    const oldTaiKhoan = await getTaiKhoanById(id);
    if (!oldTaiKhoan) throw new Error('Tai khoan not found');
    const Username = newTaiKhoan.Username || oldTaiKhoan.Username;
    const Email = newTaiKhoan.Email || oldTaiKhoan.Email;
    const Password = newTaiKhoan.Password || oldTaiKhoan.Password;
    const MaPQ = newTaiKhoan.MaPQ || oldTaiKhoan.MaPQ;
    const TrangThai = newTaiKhoan.TrangThai || oldTaiKhoan.TrangThai;
    const MaND = newTaiKhoan.MaND || oldTaiKhoan.MaND;
    const anh = newTaiKhoan.anh || oldTaiKhoan.anh;
    await db.query(
      'UPDATE taikhoan SET Username = ?, Email = ?, Password = ?, MaPQ = ?, TrangThai = ?, MaND = ?, anh = ? WHERE id = ?',
      [Username, Email, Password, MaPQ, TrangThai, MaND, anh, id]
    );
  } catch (error) {
    console.error('Error in updateTaiKhoan:', error);
    throw error;
  }
};

export const deleteTaiKhoan = async (id) => {
  try {
    await db.query('DELETE FROM taikhoan WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteTaiKhoan:', error);
    throw error;
  }
};
