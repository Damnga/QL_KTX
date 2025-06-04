import db from '../config/database.js';

export const getAllToaNha = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM toanha');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách toa nha:', error);
    throw error;
  }
};

export const getToaNhaById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM toanha WHERE MaTN = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách toa nha:', error);
    throw error;
  }
};

export const createToaNha = async (phong) => {
  try {
    const { TenTN } = phong;

    // Kiểm tra trùng tên
    const [rows] = await db.query(
      'SELECT * FROM toanha WHERE TenTN = ?',
      [TenTN]
    );

    if (rows.length > 0) {
      throw new Error('Tên tòa nhà đã tồn tại');
    }

    await db.query(
      'INSERT INTO toanha (TenTN) VALUES (?)',
      [TenTN]
    );
  } catch (error) {
    console.error('Error in createToaNha:', error);
    throw error;
  }
};

export const updateToaNha = async (id, newToaNha) => {
  try {
    const oldToaNha = await getToaNhaById(id);
    if (!oldToaNha) throw new Error('ToaNha not found');

    const TenTN = newToaNha.TenTN || oldToaNha.TenTN;

    // Check trùng tên nhưng bỏ qua chính bản ghi đang cập nhật
    const [existing] = await db.query(
      'SELECT * FROM toanha WHERE TenTN = ? AND MaTN != ?',
      [TenTN, id]
    );

    if (existing.length > 0) {
      throw new Error('Tên tòa nhà đã tồn tại');
    }

    await db.query(
      'UPDATE toanha SET TenTN = ? WHERE MaTN = ?',
      [TenTN, id]
    );
  } catch (error) {
    console.error('Error in updateToaNha:', error);
    throw error;
  }
};

export const deleteToaNha = async (id) => {
  try {
    await db.query('DELETE FROM toanha WHERE MaTN = ?', [id]);
  } catch (error) {
    console.error('Error in deleteToaNha:', error);
    throw error;
  }
};
