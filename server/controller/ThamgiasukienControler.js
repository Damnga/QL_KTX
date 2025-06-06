
import {getAllThamGiaSuKien, getThamGiaSukienById,getThamGiaSukienByIdSinhVien, createThamGiaSuKien, updateThamGiaSukien, deleteThamGiaSuKien } from "../model/ThamgiasukienModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaSV, MaSK, Tgian} = req.body;
    await createThamGiaSuKien({MaSV, MaSK, Tgian});
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
export const getThamGiSuKienIdSinhVien = async (req, res, next) => {
  try {
    const MaSV = req.params.MaSV;
    const phong = await getThamGiaSukienByIdSinhVien(MaSV);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy tham gia' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaSV, MaSK, Tgian} = req.body;
      await updateThamGiaSukien(id, {MaSV, MaSK, Tgian});
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
