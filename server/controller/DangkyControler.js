
import {getAllSinhVienDangKy, getSinhVienDangKyById, createSinhVienDangKy, updateSinhVienDangKy} from "../model/DangkyModel.js";

export const create = async (req, res, next) => {
  try {
    const {Email, MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, CCCD, SDT, Truong, Lop, NienKhoa, MaPhong, NgayBatDau, TrangThai}= req.body;
    const files = req.files;
    const anh = files?.anh?.[0]?.filename;
    const DonXin = files?.DonXin?.[0]?.filename;
    const GiayXacNhanSinhVien = files?.GiayXacNhanSinhVien?.[0]?.filename;
    const CCCDPhoTo = files?.CCCDPhoTo?.[0]?.filename;
    await createSinhVienDangKy({Email, anh, MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, CCCD, SDT, Truong, Lop, NienKhoa, MaPhong, NgayBatDau, TrangThai, DonXin, GiayXacNhanSinhVien, CCCDPhoTo});
    res.status(201).json({ message: 'Tạo dang ky thành công' });
  } catch (err) {
    next(err);
  }
};

export const getDangKy = async (req, res, next) => {
  try {
    const rows = await getAllSinhVienDangKy();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getDangKyId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getSinhVienDangKyById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy ' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const files = req.files;
      const anh = files?.anh?.[0]?.filename;
      const DonXin = files?.DonXin?.[0]?.filename;
      const GiayXacNhanSinhVien = files?.GiayXacNhanSinhVien?.[0]?.filename;
      const CCCDPhoTo = files?.CCCDPhoTo?.[0]?.filename;
      await updateSinhVienDangKy(Email, MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, CCCD, SDT, Truong, Lop, NienKhoa, MaPhong, NgayBatDau, TrangThai, {anh,DonXin, GiayXacNhanSinhVien, CCCDPhoTo, HopDong});
      res.json({ message: 'Cập nhật dang ky thành công' });
    } catch (err) {
      next(err);
    }
  };
