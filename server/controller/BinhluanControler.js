import {getAllBinhLuan, getBinhLuanById,getBinhLuanByIdData, createBinhLuan, updateBinhLuan, deleteBinhLuan} from "../model/BinhluanModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaBV, MaTK, NoiDung, Tgian} = req.body;
    await createBinhLuan({MaBV, MaTK, NoiDung, Tgian});
    res.status(201).json({ message: 'Tạo BINH LUAN thành công' });
  } catch (err) {
    next(err);
  }
};
export const getBinhLuan = async (req, res, next) => {
  try {
    const rows = await getAllBinhLuan();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getBinhLuanIdData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getBinhLuanByIdData(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy binh luan' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getBinhLuanId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getBinhLuanById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy binh luan' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaBV, MaTK, NoiDung, Tgian} = req.body;
      await updateBinhLuan(id, {MaBV, MaTK, NoiDung, Tgian});
      res.json({ message: 'Cập nhật binh luan thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteBinhLuan(id);
    res.json({ message: 'Xóa binh luan thành công' });
  } catch (err) {
    next(err);
  }
};
