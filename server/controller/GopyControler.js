
import {getAllGopY, getGopYById,getGopYByIdSinhVien, createGopY, updateGopY, deleteGopY} from "../model/GopyModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaSV, NoiDung, Tgian, GhiChu} = req.body;
    await createGopY({MaSV, NoiDung, Tgian, GhiChu});
    res.status(201).json({ message: 'Tạo gop y thành công' });
  } catch (err) {
    next(err);
  }
};

export const getGopY = async (req, res, next) => {
  try {
    const rows = await getAllGopY();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getGopYId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getGopYById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy GOP Y' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getGopYIdSinhVien = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getGopYByIdSinhVien(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy GOP Y' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaSV, NoiDung, Tgian, GhiChu} = req.body;
      await updateGopY(id, {MaSV, NoiDung, Tgian, GhiChu});
      res.json({ message: 'Cập nhật GOP Y thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteGopY(id);
    res.json({ message: 'Xóa gop y thành công' });
  } catch (err) {
    next(err);
  }
};
