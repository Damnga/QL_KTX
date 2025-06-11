
import {getAllBaiViet,getAllBaiVietData, getBaiVietById, createBaiViet, updateBaiViet, deleteBaiViet } from "../model/BaivietModel.js"

export const create = async (req, res, next) => {
  try {
    const {NoiDung, MaTK, Tgian} = req.body;
    const anh = req.file?.filename
    await createBaiViet({NoiDung, MaTK, Tgian, anh});
    res.status(201).json({ message: 'Tạo bai viet thành công' });
  } catch (err) {
    next(err);
  }
};

export const getBaiViet = async (req, res, next) => {
  try {
    const rows = await getAllBaiViet();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getBaiVietData = async (req, res, next) => {
  try {
    const rows = await getAllBaiVietData();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getBaiVietId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getBaiVietById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy bai viet' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const anh = req.file?.filename;
      const {NoiDung, MaTK, Tgian } = req.body;
      await updateBaiViet(id, {NoiDung, MaTK, Tgian, anh});
      res.json({ message: 'Cập nhật bai viet thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteBaiViet(id);
    res.json({ message: 'Xóa bai viet thành công' });
  } catch (err) {
    next(err);
  }
};
