
import {getAllPhanQuyen, getPhanQuyenById, createPhanQuyen, updatePhanQuyen, deletePhanQuyen} from "../model/PhanquyenModel.js"

export const create = async (req, res, next) => {
  try {
    const {TenPQ} = req.body;
    await createPhanQuyen({TenPQ});
    res.status(201).json({ message: 'Tạo phan quyen thành công' });
  } catch (err) {
    next(err);
  }
};

export const getPhanQuyen = async (req, res, next) => {
  try {
    const rows = await getAllPhanQuyen();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getPhanQuyenId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getPhanQuyenById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy phan quyen' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {TenPQ} = req.body;
      await updatePhanQuyen(id, {TenPQ});
      res.json({ message: 'Cập nhật phan quyen thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deletePhanQuyen(id);
    res.json({ message: 'Xóa phan quyen thành công' });
  } catch (err) {
    next(err);
  }
};
