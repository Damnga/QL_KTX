
import {getAllHoaDon,getHoaDonByIdMaSV, getHoaDonById, createHoaDon, updateHoaDon, deleteHoaDon} from "../model/HoadonModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc} = req.body;
    const result = await createHoaDon({MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc});
    res.status(201).json({ message: 'Tạo hoa don thành công',id: result.id });
  } catch (err) {
    next(err);
  }
};

export const getHoaDon = async (req, res, next) => {
  try {
    const rows = await getAllHoaDon();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getHoaDonId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getHoaDonById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy hoadon' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getHoaDonIdSinhVien = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getHoaDonByIdMaSV(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy hoadon' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc } = req.body;
      await updateHoaDon(id, { MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc });
      res.json({ message: 'Cập nhật hoa don thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteHoaDon(id);
    res.json({ message: 'Xóa hoa don thành công' });
  } catch (err) {
    next(err);
  }
};
