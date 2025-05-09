
import {getAllDichVu, getDichVuById, createDichVu, updateDichVu, deleteDichVu} from "../model/DichvuModel.js"

export const create = async (req, res, next) => {
  try {
    const {TenDV, DonGia, ThoiHan} = req.body;
    await createDichVu({TenDV, DonGia, ThoiHan});
    res.status(201).json({ message: 'Tạo dich vu thành công' });
  } catch (err) {
    next(err);
  }
};

export const getDichVu = async (req, res, next) => {
  try {
    const rows = await getAllDichVu();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getDichVuId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getDichVuById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy dich vu' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {TenDV, DonGia, ThoiHan} = req.body;
      await updateDichVu(id, {TenDV, DonGia, ThoiHan});
      res.json({ message: 'Cập nhật dich vu thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDichVu(id);
    res.json({ message: 'Xóa dich vu thành công' });
  } catch (err) {
    next(err);
  }
};
