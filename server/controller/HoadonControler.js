
import {getAllHoaDon, getHoaDonById, createHoaDon, updateHoaDon, deleteHoaDon} from "../model/HoadonModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc} = req.body;
    await createHoaDon({MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc});
    res.status(201).json({ message: 'Tạo hoa don thành công' });
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
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc } = req.body;
      await updateHoaDon(id, { MaPhong, NgayLap, MaNguoiLap, TrangThai, NgayThanhToan, GhiChu, TgianBatDau, TgianKetThuc });
      res.json({ message: 'Cập nhật hoadon thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteHoaDon(id);
    res.json({ message: 'Xóa hoadon thành công' });
  } catch (err) {
    next(err);
  }
};
