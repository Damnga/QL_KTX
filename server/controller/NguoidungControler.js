
import {getAllNguoiDung, getNguoiDungById, createNguoiDung, updateNguoiDung, deleteNguoiDung} from "../model/NguoidungModel.js"

export const create = async (req, res, next) => {
  try {
    const {TenND} = req.body;
    await createNguoiDung({TenND});
    res.status(201).json({ message: 'Tạo nguoi dung thành công' });
  } catch (err) {
    next(err);
  }
};

export const getNguoiDung = async (req, res, next) => {
  try {
    const rows = await getAllNguoiDung();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getNguoiDungId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getNguoiDungById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy nguoi dung' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {TenND} = req.body;
      await updateNguoiDung(id, {TenND});
      res.json({ message: 'Cập nhật nguoidung thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteNguoiDung(id);
    res.json({ message: 'Xóa nguoi dung thành công' });
  } catch (err) {
    next(err);
  }
};
