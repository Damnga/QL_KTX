import {getAllLichSuRaVao, getLichSuRaVaoById,getLichSuRaVaoByIdSinhVien, createLichSuRaVao} from "../model/LichsuravaoModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaSV, LoaiHoatDong, TrangThai} = req.body;
    await createLichSuRaVao({MaSV, LoaiHoatDong, TrangThai});
    res.status(201).json({ message: 'Tạo lich su thành công' });
  } catch (err) {
    next(err);
  }
};

export const getLichSuRaVao = async (req, res, next) => {
  try {
    const rows = await getAllLichSuRaVao();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getLichSuRaVaoId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getLichSuRaVaoById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy lich su' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getLichSuRaVaoIdSinhVien = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getLichSuRaVaoByIdSinhVien(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy lich su' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};