
import {getAllChiTietHoaDon, getChiTietHoaDonById, createChiTietHoaDon, updateChiTietHoaDon, deleteChiTietHoaDon} from "../model/ChitiethoadonModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaHD, TenKhoanThu, SoDau, SoSau, DonGia, GhiChu} = req.body;
    await createChiTietHoaDon({MaHD, TenKhoanThu, SoDau, SoSau, DonGia, GhiChu});
    res.status(201).json({ message: 'Tạo chi tiet hoa don thành công' });
  } catch (err) {
    next(err);
  }
};

export const getChiTietHoaDon = async (req, res, next) => {
  try {
    const rows = await getAllChiTietHoaDon();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getChiTietHoaDonId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getChiTietHoaDonById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy chi tiet hoa don' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaHD, TenKhoanThu, SoDau, SoSau, DonGia, GhiChu} = req.body;
      await updateChiTietHoaDon(id, {MaHD, TenKhoanThu, SoDau, SoSau, DonGia, GhiChu});
      res.json({ message: 'Cập nhật chi tiet hoa don thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteChiTietHoaDon(id);
    res.json({ message: 'Xóa chi tiet hoa don thành công' });
  } catch (err) {
    next(err);
  }
};
