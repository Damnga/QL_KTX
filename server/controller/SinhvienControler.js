
import {getAllSinhVien, getAllSinhVienData,getSinhVienByIdSinhVien, getSinhVienById,getSinhVienByIdUser, createSinhVien, updateSinhVien, deleteSinhVien } from "../model/SinhvienModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, GhiChu} = req.body;
    const anh = req.file?.filename || null;
    const newSinhVien = await createSinhVien({MaSV, HoTen, NgaySinh, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, anh, GhiChu});
    res.status(201).json({...newSinhVien, message: 'Tạo sinh vien thành công' });
  } catch (err) {
    next(err);
  }
};

export const getSinhVien = async (req, res, next) => {
  try {
    const rows = await getAllSinhVien();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getSinhVienData = async (req, res, next) => {
  try {
    const rows = await getAllSinhVienData();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getSinhVienId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getSinhVienById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy sinh vien' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};

export const getSinhVienIdUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getSinhVienByIdUser(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy sinh vien' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getSinhVienIdSinhVien = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getSinhVienByIdSinhVien(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy sinh vien' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const anh = req.file?.filename;
      const { MaSV, HoTen,NgaySinh, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, GhiChu} = req.body;
      await updateSinhVien(id, {MaSV, HoTen,NgaySinh, QueQuan, GioiTinh, Email, CCCD, SDT, Truong, Lop, NienKhoa, anh, GhiChu});
      res.json({ message: 'Cập nhật sinh vien thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteSinhVien(id);
    res.json({ message: 'Xóa sinh vien thành công' });
  } catch (err) {
    next(err);
  }
};
