
import {getAllThamGiaSuKien, getThamGiaSukienById, createThamGiaSuKien, updateThamGiaSukien, deleteThamGiaSuKien } from "../model/ThamgiasukienModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaSV, MaSK, Tgian, TrangThai, GhiChu} = req.body;
    await createThamGiaSuKien({MaSV, MaSK, Tgian, TrangThai, GhiChu});
    res.status(201).json({ message: 'Tạo tham gia thành công' });
  } catch (err) {
    next(err);
  }
};

export const getThamGiaSuKien = async (req, res, next) => {
  try {
    const rows = await getAllThamGiaSuKien();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getThamGiSuKienId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getThamGiaSukienById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy tham gia' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const anh = req.file?.filename;
      const {MaSV, MaSK, Tgian, TrangThai, GhiChu} = req.body;
      await updateThamGiaSukien(id, {MaSV, MaSK, Tgian, TrangThai, GhiChu});
      res.json({ message: 'Cập nhật tham gia thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteThamGiaSuKien(id);
    res.json({ message: 'Xóa tham gia thành công' });
  } catch (err) {
    next(err);
  }
};
