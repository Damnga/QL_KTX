
import {getAllBaoTri, getAllBaoTriData,getAllBaoTriPhong, getBaoTriById, createBaoTri, updateBaoTri, deleteBaoTri} from "../model/BaotriModel.js"

export const create = async (req, res, next) => {
  try {
    const {NoiDung, MaPhong, ThoiGian, TgianBaoTri, TrangThai, GhiChu} = req.body;
    await createBaoTri({NoiDung, MaPhong, ThoiGian, TgianBaoTri, TrangThai, GhiChu});
    res.status(201).json({ message: 'Tạo BAO TRI thành công' });
  } catch (err) {
    next(err);
  }
};

export const getBaoTri = async (req, res, next) => {
  try {
    const rows = await getAllBaoTri();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getBaoTriData = async (req, res, next) => {
  try {
    const rows = await getAllBaoTriData();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getBaoTriPhong = async (req, res, next) => {
  try {
    const rows = await getAllBaoTriPhong(req.params.TenPhong,req.params.TenTN);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getBaoTriId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getBaoTriById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy Bao tri' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {NoiDung, MaPhong, ThoiGian, TgianBaoTri, TrangThai, GhiChu} = req.body;
      await updateBaoTri(id, {NoiDung, MaPhong, ThoiGian, TgianBaoTri, TrangThai, GhiChu});
      res.json({ message: 'Cập nhật bao tri thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteBaoTri(id);
    res.json({ message: 'Xóa bao tri thành công' });
  } catch (err) {
    next(err);
  }
};
