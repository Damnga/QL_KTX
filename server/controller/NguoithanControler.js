
import {getAllNguoiThan,getNguoiThanByIdSinhVien, getNguoiThanById, createNguoiThan, updateNguoiThan, deleteNguoiThan} from "../model/NguoithanModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaSV, HoTen, SDT, DiaChi, QuanHe} = req.body;
    await createNguoiThan({MaSV, HoTen, SDT, DiaChi, QuanHe});
    res.status(201).json({ message: 'Tạo nguoi than thành công' });
  } catch (err) {
    next(err);
  }
};

export const getNguoiThan = async (req, res, next) => {
  try {
    const rows = await getAllNguoiThan();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getNguoiThanId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getNguoiThanById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy nguoi than' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getNguoiThanIdSinhVien = async (req, res, next) => {
  try {
    const id = req.params.MaSV;
    const phong = await getNguoiThanByIdSinhVien(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy nguoi than' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaSV, HoTen, SDT, DiaChi, QuanHe} = req.body;
      await updateNguoiThan(id, {MaSV, HoTen, SDT, DiaChi, QuanHe});
      res.json({ message: 'Cập nhật nguoi than thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteNguoiThan(id);
    res.json({ message: 'Xóa nguoi than thành công' });
  } catch (err) {
    next(err);
  }
};
