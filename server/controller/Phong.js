
import {getAllPhong, getAllPhongData,getTenPhongByIdTK,getTenPhongByTenPhongToaNha, getPhongById, createPhong, updatePhong, deletePhong } from "../model/PhongModel.js"

export const create = async (req, res, next) => {
  try {
    const {TenPhong, MaLoai, MaTN, TrangThai, GhiChu} = req.body;
    await createPhong({TenPhong, MaLoai, MaTN,TrangThai, GhiChu});
    res.status(201).json({ message: 'Tạo phòng thành công' });
  } catch (err) {
    next(err);
  }
};

export const getPhong = async (req, res, next) => {
  try {
    const rows = await getAllPhong();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getPhongData = async (req, res, next) => {
  try {
    const rows = await getAllPhongData();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getPhongId = async (req, res, next) => {
  try {
    const phong = await getPhongById(req.params.MaPhong);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy phòng' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getTenPhongId = async (req, res, next) => {
  try {
    const phong = await getTenPhongByIdTK(req.params.id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy phòng' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getPhongIdTenPhongToaNha = async (req, res, next) => {
  try {
    
    const phong = await getTenPhongByTenPhongToaNha(req.params.TenPhong,req.params.TenTN);
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.MaPhong;
      const { TenPhong, MaLoai, MaTN, TrangThai, GhiChu } = req.body;
      await updatePhong(id, {TenPhong, MaLoai, MaTN,TrangThai, GhiChu });
      res.json({ message: 'Cập nhật phòng thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    await deletePhong(req.params.MaPhong);
    res.json({ message: 'Xóa phòng thành công' });
  } catch (err) {
    next(err);
  }
};
