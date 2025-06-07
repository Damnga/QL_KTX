import db from '../config/database.js';

export const getAllSinhVienDangKy = async () => {
  try {
    const [rows] = await db.query('SELECT * from dangky');
    return rows;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh vien dang ky:', error);
    throw error;
  }
};
export const getSinhVienDangKyById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM dangky WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sinh vien dang ky:', error);
    throw error;
  }
};
export const createSinhVienDangKy = async (hoadon) => {
  try {
    const {Email, anh, MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, CCCD, SDT, Truong, Lop, NienKhoa, MaPhong, NgayBatDau, TrangThai, DonXin, GiayXacNhanSinhVien, CCCDPhoTo } = hoadon;
     const [result] = await db.query(
      'INSERT INTO dangky (Email, anh, MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, CCCD, SDT, Truong, Lop, NienKhoa, MaPhong, NgayBatDau, TrangThai, DonXin, GiayXacNhanSinhVien, CCCDPhoTo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [Email, anh, MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, CCCD, SDT, Truong, Lop, NienKhoa, MaPhong, NgayBatDau, TrangThai, DonXin, GiayXacNhanSinhVien, CCCDPhoTo]
    );
    return { id: result.insertId };
  } catch (error) {
    console.error('Error in createSinhvienDangKy:', error);
    throw error;
  }
};

export const updateSinhVienDangKy = async (id, newHoSo) => {
  try {
    const oldHoSo = await getSinhVienDangKyById(id);
    if (!oldHoSo) throw new Error('Sinh Vien dang ky not found');
    const Email = newHoSo.Email || oldHoSo.Email;
    const anh = newHoSo.anh || oldHoSo.anh;
    const MaSV = newHoSo.MaSV || oldHoSo.MaSV;
    const HoTen = newHoSo.HoTen || oldHoSo.HoTen;
    const NgaySinh = newHoSo.NgaySinh || oldHoSo.NgaySinh;
    const QueQuan = newHoSo.QueQuan || oldHoSo.QueQuan;
    const GioiTinh = newHoSo.GioiTinh || oldHoSo.GioiTinh;
    const CCCD = newHoSo.CCCD || oldHoSo.CCCD;
    const SDT = newHoSo.SDT || oldHoSo.SDT;
    const Truong = newHoSo.Truong || oldHoSo.Truong;
    const Lop = newHoSo.Lop || oldHoSo.Lop;
    const NienKhoa = newHoSo.NienKhoa || oldHoSo.NienKhoa;
    const MaPhong = newHoSo.MaPhong || oldHoSo.MaPhong;
    const NgayBatDau = newHoSo.NgayBatDau || oldHoSo.NgayBatDau;
    const DonXin = newHoSo.DonXin || oldHoSo.DonXin;
    const TrangThai = newHoSo.TrangThai || oldHoSo.TrangThai;
    const GiayXacNhanSinhVien = newHoSo.GiayXacNhanSinhVien || oldHoSo.GiayXacNhanSinhVien;
    const CCCDPhoTo = newHoSo.CCCDPhoTo || oldHoSo.CCCDPhoTo;
    
    await db.query(
      'UPDATE dangky SET Email=?,anh=?, MaSV = ?, HoTen = ?,NgaySinh=?, QueQuan = ?, GioiTinh = ?, CCCD = ?, SDT = ?, Truong = ?, Lop = ?, NienKhoa = ?,MaPhong=?, NgayBatDau=?, TrangThai=?, DonXin=?, GiayXacNhanSinhVien=?, CCCDPhoto=? WHERE id = ?',
      [Email, anh, MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, CCCD, SDT, Truong, Lop, NienKhoa, MaPhong, NgayBatDau, TrangThai, DonXin, GiayXacNhanSinhVien, CCCDPhoTo,id]
    );
  } catch (error) {
    console.error('Error in updateSinhVienDangKy:', error);
    throw error;
  }
};
