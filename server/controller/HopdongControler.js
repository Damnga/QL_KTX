
import {getAllHopDong, getHopDongById, createHopDong, updateHopDong, deleteHopDong} from "../model/HopdongModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaHD, MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu} = req.body;
    await createHopDong({MaHD, MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu});
    res.status(201).json({ message: 'Tạo hop dong thành công' });
  } catch (err) {
    next(err);
  }
};

export const getHopDong = async (req, res, next) => {
  try {
    const rows = await getAllHopDong();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getHopDongId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getHopDongById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy Hop Dong' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaHD, MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu} = req.body;
      await updateHopDong(id, {MaHD, MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu});
      res.json({ message: 'Cập nhật hop dong thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteHopDong(id);
    res.json({ message: 'Xóa hop dong thành công' });
  } catch (err) {
    next(err);
  }
};
