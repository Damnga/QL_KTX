import db from '../config/database.js';

export const getAllBaiViet = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM baiviet');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bai viet:', error);
    throw error;
  }
};
export const getAllBaiVietData = async () => {
  try {
const [rows] = await db.query(`
  SELECT 
    baiviet.id,
    baiviet.NoiDung,
    taikhoan.Username,
    baiviet.Tgian,
    baiviet.anh AS anhbaiviet,
    taikhoan.anh AS anhnguoidung,
    COUNT(DISTINCT tuongtac.id) AS SoLuotLike,
    COUNT(DISTINCT binhluan.id) AS SoLuotBinhLuan
  FROM baiviet
  JOIN taikhoan ON baiviet.MaTK = taikhoan.id
  LEFT JOIN tuongtac ON baiviet.id = tuongtac.MaBV
  LEFT JOIN binhluan ON baiviet.id = binhluan.MaBV
  GROUP BY 
    baiviet.id, baiviet.NoiDung, taikhoan.Username, baiviet.Tgian, baiviet.anh, taikhoan.anh
  ORDER BY baiviet.id DESC
`);    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bai viet:', error);
    throw error;
  }
};

export const getBaiVietById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM baiviet WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách baiviet:', error);
    throw error;
  }
};

export const createBaiViet = async (hoadon) => {
  try {
    const {NoiDung, MaTK, Tgian, anh} = hoadon;
    await db.query(
      'INSERT INTO baiviet (NoiDung, MaTK, Tgian, anh) VALUES ( ?, ?, ?, ?)',
      [NoiDung, MaTK, Tgian, anh]
    );
  } catch (error) {
    console.error('Error in create bai viet :', error);
    throw error;
  }
};

export const updateBaiViet = async (id, newBaoTri) => {
  try {
    const oldBaoTri = await getBaiVietById(id);
    if (!oldBaoTri) throw new Error('bai viet not found');
    const NoiDung = newBaoTri.NoiDung || oldBaoTri.NoiDung;
    const MaTK = newBaoTri.MaTK || oldBaoTri.MaTK;
    const Tgian = newBaoTri.Tgian || oldBaoTri.Tgian;
    const anh = newBaoTri.anh || oldBaoTri.anh;
    await db.query(
      'UPDATE baiviet SET  NoiDung = ?, MaTK = ?, Tgian = ?, anh = ? WHERE id = ?',
      [NoiDung, MaTK, Tgian, anh, id]
    );
  } catch (error) {
    console.error('Error in update bai viet: ', error);
    throw error;
  }
};

export const deleteBaiViet = async (id) => {
  try {
    await db.query('DELETE FROM baiviet WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in delete bai viet:', error);
    throw error;
  }
};
