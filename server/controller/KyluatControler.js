import {getAllKyLuat, getKyLuatById, createKyLuat,getKyLuatByIdSinhVien, updateKyLuat, deleteKyLuat} from "../model/KyluatModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaSV, NgayViPham, NoiDungViPham, HinhThucXuLy, GhiChu} = req.body;
    await createKyLuat({MaSV, NgayViPham, NoiDungViPham, HinhThucXuLy, GhiChu});
    res.status(201).json({ message: 'Tạo ky layt thành công' });
  } catch (err) {
    next(err);
  }
};

export const getKyLuat = async (req, res, next) => {
  try {
    const rows = await getAllKyLuat();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getKyLuatId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getKyLuatById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy ky luat' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getKyLuatIdSinhVien = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getKyLuatByIdSinhVien(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy ky luat' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaSV, NgayViPham, NoiDungViPham, HinhThucXuLy, GhiChu} = req.body;
      await updateKyLuat(id, {MaSV, NgayViPham, NoiDungViPham, HinhThucXuLy, GhiChu});
      res.json({ message: 'Cập nhật ky luat thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteKyLuat(id);
    res.json({ message: 'Xóa ky luat thành công' });
  } catch (err) {
    next(err);
  }
};
