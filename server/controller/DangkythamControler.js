
import {getAllDangKyTham,getDangKyThamByIdSinhVien, getDangKyThamById, createDangKyTham, updateDangKyTham, deleteDangKyTham} from "../model/DangkythamModel.js"

export const create = async (req, res, next) => {
  try {
    const {TgianBatDau, TgianKetThuc, MaNT, TrangThai, GhiChu} = req.body;
    await createDangKyTham({TgianBatDau, TgianKetThuc, MaNT, TrangThai, GhiChu});
    res.status(201).json({ message: 'Tạo dang ky thành công' });
  } catch (err) {
    next(err);
  }
};

export const getDangKyTham = async (res, next) => {
  try {
    const rows = await getAllDangKyTham();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getDangKyThamId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getDangKyThamById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy dang ky ' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getDangKyThamIdSinhVien = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getDangKyThamByIdSinhVien(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy dang ky ' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {TgianBatDau, TgianKetThuc, MaNT, TrangThai, GhiChu} = req.body;
      await updateDangKyTham(id, {TgianBatDau, TgianKetThuc, MaNT, TrangThai, GhiChu});
      res.json({ message: 'Cập nhật dang ky thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDangKyTham(id);
    res.json({ message: 'Xóa dang ky  thành công' });
  } catch (err) {
    next(err);
  }
};
