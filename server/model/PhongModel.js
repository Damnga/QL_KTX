import db from '../config/database.js';

export const getAllPhong = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM phong');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phòng:', error);
    throw error;
  }
};
export const getAllPhongData = async () => {
  try {
const [rows] = await db.query(`SELECT toanha.MaTN, phong.MaPhong, phong.TenPhong, loaiphong.LoaiPhong, toanha.TenTN, phong.TrangThai,loaiphong.SoNguoi, phong.GhiChu, COUNT(hopdong.id) AS SoLuongHopDong FROM phong JOIN loaiphong ON phong.MaLoai = loaiphong.MaLoai JOIN toanha ON phong.MaTN = toanha.MaTN  LEFT JOIN hopdong ON phong.MaPhong = hopdong.MaPhong GROUP BY   phong.MaPhong, phong.TenPhong,  loaiphong.LoaiPhong,   toanha.TenTN,  phong.TrangThai,  loaiphong.SoNguoi, phong.GhiChu`);
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phòng:', error);
    throw error;
  }
};

export const getPhongById = async (MaPhong) => {
  try {
    const [rows] = await db.query('SELECT phong.MaPhong, phong.TenPhong, phong.MaLoai, phong.MaTN, phong.TrangThai, phong.GhiChu, toanha.TenTN FROM phong,toanha WHERE phong.MaTN = toanha.MaTN AND phong.MaPhong = ?', [MaPhong]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phòng:', error);
    throw error;
  }
};
export const getTenPhongByIdTK = async (id) => {
  try {
    const [rows] = await db.query('select sinhvien.id,phong.MaPhong, TenPhong from taikhoan,sinhvien,hopdong,phong where taikhoan.MaSV = sinhvien.id and sinhvien.id=hopdong.MaSV and hopdong.MaPhong = phong.MaPhong and sinhvien.id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phòng:', error);
    throw error;
  }
};
export const getTenPhongByTenPhongToaNha = async (TenPhong,TenTN) => {
  try {
const [rows] = await db.query(`
    SELECT 
        HoTen,
        NgaySinh,
        Truong,
        hopdong.NgayBatDau,
        hopdong.NgayKetThuc,
        TenPhong,
        TenTN,
        hopdong.TrangThai AS trangthaihopdong 
    FROM taikhoan
    JOIN sinhvien ON taikhoan.MaSV = sinhvien.id
    JOIN hopdong ON sinhvien.id = hopdong.MaSV
    JOIN phong ON phong.MaPhong = hopdong.MaPhong
    JOIN toanha ON phong.MaTN = toanha.MaTN
     WHERE Tenphong = ? and TenTN = ?
`,[TenPhong,TenTN]);
     return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phòng:', error);
    throw error;
  }
};
export const createPhong = async (phong) => {
  try {
    const { TenPhong, MaLoai, MaTN, TrangThai, GhiChu } = phong;

    const [existingPhong] = await db.query(
      'SELECT * FROM phong WHERE TenPhong = ? AND MaTN = ?',
      [TenPhong, MaTN]
    );

    if (existingPhong.length > 0) {
      const error = new Error('Phòng đã tồn tại trong tòa nhà này');
      error.statusCode = 400;
      throw error;
    }

    await db.query(
      'INSERT INTO phong (TenPhong, MaLoai, MaTN, TrangThai, GhiChu) VALUES (?, ?, ?, ?, ?)',
      [TenPhong, MaLoai, MaTN, TrangThai, GhiChu]
    );
  } catch (error) {
    console.error('Error in createPhong:', error);
    throw error;
  }
};
export const updatePhong = async (id, newPhong) => {
  try {
    const oldPhong = await getPhongById(id);
    if (!oldPhong) throw new Error('Phòng không tồn tại');

    const { TenPhong, MaLoai, MaTN, TrangThai, GhiChu } = newPhong;
    const [existingPhong] = await db.query(
      'SELECT * FROM phong WHERE TenPhong = ? AND MaTN = ? AND MaPhong != ?',
      [TenPhong || oldPhong.TenPhong, MaTN || oldPhong.MaTN, id]
    );

    if (existingPhong.length > 0) {
      const error = new Error('Phòng đã tồn tại trong tòa nhà này');
      error.statusCode = 400;
      throw error;
    }

    await db.query(
      'UPDATE phong SET TenPhong = ?, MaLoai = ?, MaTN = ?, TrangThai = ?, GhiChu = ? WHERE MaPhong = ?',
      [
        TenPhong || oldPhong.TenPhong,
        MaLoai || oldPhong.MaLoai,
        MaTN || oldPhong.MaTN,
        TrangThai || oldPhong.TrangThai,
        GhiChu || oldPhong.GhiChu,
        id
      ]
    );
  } catch (error) {
    console.error('Error in updatePhong:', error);
    throw error;
  }
};
export const deletePhong = async (MaPhong) => {
  try {
    await db.query('DELETE FROM phong WHERE MaPhong = ?', [MaPhong]);
  } catch (error) {
    console.error('Error in deletePhong:', error);
    throw error;
  }
};
