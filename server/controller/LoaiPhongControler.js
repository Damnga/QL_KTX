
import {getAllLoaiPhong, getLoaiPhongById, createLoaiPhong, updateLoaiPhong, deleteLoaiPhong } from "../model/LoaiphongModel.js"

export const create = async (req, res, next) => {
  try {
    const {LoaiPhong, SoNguoi, BanGhe, Giuong, Tu, GiaThue, GhiChu} = req.body;
    await createLoaiPhong({LoaiPhong, SoNguoi, BanGhe, Giuong, Tu, GiaThue, GhiChu});
    res.status(201).json({ message: 'Tạo loai phòng thành công' });
  } catch (err) {
    next(err);
  }
};

export const getLoaiPhong = async (req, res, next) => {
  try {
    const rows = await getAllLoaiPhong();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getLoaiPhongId = async (req, res, next) => {
  try {
    const id = req.params.MaLoai;
    const phong = await getLoaiPhongById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy loai phòng' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.MaLoai;
      const { LoaiPhong, SoNguoi, BanGhe, Giuong, Tu, GiaThue, GhiChu } = req.body;
      await updateLoaiPhong(id, {  LoaiPhong, SoNguoi, BanGhe, Giuong, Tu, GiaThue, GhiChu  });
      res.json({ message: 'Cập nhật loai phòng thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.MaLoai;
    await deleteLoaiPhong(id);
    res.json({ message: 'Xóa loai phòng thành công' });
  } catch (err) {
    next(err);
  }
};
