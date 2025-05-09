
import {getAllPhong, getPhongById, createPhong, updatePhong, deletePhong } from "../model/PhongModel.js"

export const create = async (req, res, next) => {
  try {
    const {TenPhong, MaLoai, MaTN, TrangThai, GhiChu} = req.body;
    const anh = req.file?.filename || null;
    await createPhong({TenPhong, MaLoai, MaTN, anh, TrangThai, GhiChu});
    res.status(201).json({ message: 'Tạo phòng thành công' });
  } catch (err) {
    next(err);
  }
};

export const getPhong = async (req, res, next) => {
  try {
    const rows = await getAllPhong();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getPhongId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getPhongById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy phòng' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const anh = req.file?.filename;
      const { TenPhong, MaLoai, MaTN, TrangThai, GhiChu } = req.body;
      await updatePhong(id, { TenPhong, MaLoai, MaTN, anh, TrangThai, GhiChu });
      res.json({ message: 'Cập nhật phòng thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deletePhong(id);
    res.json({ message: 'Xóa phòng thành công' });
  } catch (err) {
    next(err);
  }
};
