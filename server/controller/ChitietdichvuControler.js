
import {getAllChiTietDichVu, getChiTietDichVuById, createChiTietDichVu, updateChiTietDichVu, deleteChiTietDichVu} from "../model/ChitietdichvuModel.js"

export const create = async (req, res, next) => {
  try {
    const {TaTTDV, MaDV, GhiChu} = req.body;
    await createChiTietDichVu({TaTTDV, MaDV, GhiChu});
    res.status(201).json({ message: 'Tạo chi tiet dich vu thành công' });
  } catch (err) {
    next(err);
  }
};

export const getChiTietDichVu = async (req, res, next) => {
  try {
    const rows = await getAllChiTietDichVu();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getChiTietDichVuId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getChiTietDichVuById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy chi tiet dich vu' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {TaTTDV, MaDV, GhiChu} = req.body;
      await updateChiTietDichVu(id, {TaTTDV, MaDV, GhiChu});
      res.json({ message: 'Cập nhật chi tiet dich vu thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteChiTietDichVu(id);
    res.json({ message: 'Xóa chi tiet dich vu thành công' });
  } catch (err) {
    next(err);
  }
};
