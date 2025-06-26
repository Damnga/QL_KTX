import db from '../config/database.js';

export const getAllSinhVien = async () => {
  try {
    const [rows] = await db.query('SELECT  sinhvien.id ,sinhvien.MaSV,sinhvien.anh,sinhvien.HoTen, sinhvien.NgaySinh,sinhvien.Email,hopdong.id AS IDHopDong, sinhvien.GioiTinh,sinhvien.QueQuan,sinhvien.CCCD,sinhvien.SDT,sinhvien.Truong,sinhvien.Lop,sinhvien.NienKhoa,sinhvien.GhiChu,hopdong.MaPhong,hopdong.NgayBatDau,hopdong.NgayKetThuc,hopdong.ThoiHan,hopdong.GhiChu, hopdong.TrangThai FROM sinhvien,phong,hopdong where sinhvien.id = hopdong.MaSV and hopdong.MaPhong=phong.MaPhong and sinhvien.TrangThai IN ("Chờ duyệt", "Chờ nhận phòng", "Đã duyệt")');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh vien:', error);
    throw error;
  }
};
export const getAllSinhVienData = async () => {
  try {
    const [rows] = await db.query('SELECT sinhvien.id,sinhvien.anh,sinhvien.HoTen, sinhvien.NgaySinh,sinhvien.Email, sinhvien.GioiTinh, sinhvien.QueQuan, phong.TenPhong,hopdong.TrangThai FROM sinhvien,phong,hopdong where sinhvien.id = hopdong.MaSV and hopdong.MaPhong=phong.MaPhong and hopdong.TrangThai IN ("Đang ở", "Sắp hết hạn", "Hết hạn", "Đã thanh lý","Đã nhận phòng ")');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh vien:', error);
    throw error;
  }
};

export const getSinhVienById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM sinhvien WHERE id = ?', [id]);
    return rows[0]; 
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh vien:', error);
    throw error;
  }
};
export const getSinhVienByIdSinhVien = async (id) => {
  try {
    const [rows] = await db.query('SELECT taikhoan.id AS MaTK FROM sinhvien,taikhoan WHERE taikhoan.MaSV = sinhvien.id and sinhvien.id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh vien:', error);
    throw error;
  }
};
export const getSinhVienByCCCD = async (CCCD) => {
  try {
    const [rows] = await db.query('SELECT * FROM sinhvien WHERE CCCD = ?', [CCCD]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh vien:', error);
    throw error;
  }
};

export const getSinhVienByIdUser = async (id) => {
  try {
    const [rows] = await db.query('SELECT sinhvien.id as MaSV, sinhvien.anh,NgayBatDau,sinhvien.Email,Lop, taikhoan.id,HoTen,QueQuan,SDT,NgaySinh,GioiTinh,Truong,NienKhoa,hopdong.TrangThai,TenPhong,TenTN FROM taikhoan,sinhvien,hopdong,phong,toanha WHERE phong.MaTN = toanha.MaTN AND taikhoan.MaSV = sinhvien.id and sinhvien.id = hopdong.MaSV and hopdong.MaPhong = phong.MaPhong and taikhoan.id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh vien:', error);
    throw error;
  }
};

export const createSinhVien = async (hoadon) => {
  try {
    const {MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, anh, GhiChu,TrangThai} = hoadon;
     const [result] = await db.query(
      'INSERT INTO sinhvien (MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, anh, GhiChu,TrangThai) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
      [MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, anh, GhiChu,TrangThai]
    );
    return { id: result.insertId };
  } catch (error) {
    console.error('Error in createSinhvien:', error);
    throw error;
  }
};

export const updateSinhVien = async (id, newHoSo) => {
  try {
    const oldHoSo = await getSinhVienById(id);
    if (!oldHoSo) throw new Error('Sinh Vien not found');
    const MaSV = newHoSo.MaSV || oldHoSo.MaSV;
    const HoTen = newHoSo.HoTen || oldHoSo.HoTen;
    const NgaySinh = newHoSo.NgaySinh || oldHoSo.NgaySinh;
    const QueQuan = newHoSo.QueQuan || oldHoSo.QueQuan;
    const GioiTinh = newHoSo.GioiTinh || oldHoSo.GioiTinh;
    const Email = newHoSo.Email || oldHoSo.Email;
    const CCCD = newHoSo.CCCD || oldHoSo.CCCD;
    const SDT = newHoSo.SDT || oldHoSo.SDT;
    const Truong = newHoSo.Truong || oldHoSo.Truong;
    const Lop = newHoSo.Lop || oldHoSo.Lop;
    const NienKhoa = newHoSo.NienKhoa || oldHoSo.NienKhoa;
    const anh = newHoSo.anh || oldHoSo.anh;
    const GhiChu = newHoSo.GhiChu || oldHoSo.GhiChu;
    await db.query(
      'UPDATE sinhvien SET MaSV = ?, HoTen = ?,NgaySinh=?, QueQuan = ?, GioiTinh = ?, Email = ?, CCCD = ?, SDT = ?, Truong = ?, Lop = ?, NienKhoa = ?, anh = ?, GhiChu = ? WHERE id = ?',
      [MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, anh, GhiChu,id]
    );
  } catch (error) {
    console.error('Error in updateSinhVien:', error);
    throw error;
  }
};

export const deleteSinhVien = async (id) => {
  try {
    await db.query('DELETE FROM sinhvien WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error in deleteSinhVien:', error);
    throw error;
  }
};
