
import {getAllSuKien,getAllSuKienData, getSuKienById, createSuKien, updateSuKien, deleteSuKien } from "../model/SukienModel.js";

export const create = async (req, res, next) => {
  try {
    const {TenSK, NoiDung, MaTK, TgianBatDau, TgianKetThuc,TrangThai} = req.body;
    const anh = req.file?.filename || null;
    await createSuKien({TenSK, NoiDung, MaTK, TgianBatDau, TgianKetThuc, anh, TrangThai});
    res.status(201).json({ message: 'Tạo su kien thành công' });
  } catch (err) {
    next(err);
  }
};

export const getSuKien = async (req, res, next) => {
  try {
    const rows = await getAllSuKien();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getSuKienData = async (req, res, next) => {
  try {
    const rows = await getAllSuKienData();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getSuKienId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getSuKienById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy su kien' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const anh = req.file?.filename;
      const { TenSK, NoiDung, MaTK, TgianBatDau, TgianKetThuc,TrangThai} = req.body;
      await updateSuKien(id, {TenSK, NoiDung, MaTK, TgianBatDau, TgianKetThuc, anh,TrangThai});
      res.json({ message: 'Cập nhật su kien thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteSuKien(id);
    res.json({ message: 'Xóa su kien thành công' });
  } catch (err) {
    next(err);
  }
};
