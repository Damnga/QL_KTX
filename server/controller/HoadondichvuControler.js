import {getAllHoaDonDichVu, getHoaDonDichVuById, createHoaDonDichVu, updateHoaDonDichVu, deleteHoaDonDichVu} from "../model/HoadondichvuModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaHD, TgianBatDau, TgianKetThuc, TrangThai, GhiChu, NgayLap, NguoiLap, NgayThanhToan} = req.body;
    await createHoaDonDichVu({MaHD, TgianBatDau, TgianKetThuc, TrangThai, GhiChu, NgayLap, NguoiLap, NgayThanhToan});
    res.status(201).json({ message: 'Tạo hoa don dich vu thành công' });
  } catch (err) {
    next(err);
  }
};
export const getHoaDonDichVu = async (req, res, next) => {
  try {
    const rows = await getAllHoaDonDichVu();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getHoaDonDichVuId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getHoaDonDichVuById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy hoa don dich vu' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaHD, TgianBatDau, TgianKetThuc, TrangThai, GhiChu, NgayLap, NguoiLap, NgayThanhToan} = req.body;
      await updateHoaDonDichVu(id, {MaHD, TgianBatDau, TgianKetThuc, TrangThai, GhiChu, NgayLap, NguoiLap, NgayThanhToan});
      res.json({ message: 'Cập nhật hoa don dich vu thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteHoaDonDichVu(id);
    res.json({ message: 'Xóa hoa don dich vu thành công' });
  } catch (err) {
    next(err);
  }
};
