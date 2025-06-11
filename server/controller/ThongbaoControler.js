
import {getAllThongBao,getAllThongBaoData, getThongBaoById, createThongBao, updateThongBao, deleteThongBao } from "../model/ThongbaoModel.js"

export const create = async (req, res, next) => {
  try {
    const {NoiDung,Tgian,MaTK,MaPhong} = req.body;
    await createThongBao({NoiDung,Tgian,MaTK,MaPhong});
    res.status(201).json({ message: 'Tạo thành công' });
  } catch (err) {
    next(err);
  }
};

export const getThongBao = async (req, res, next) => {
  try {
    const rows = await getAllThongBao();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getThongBaoData = async (req, res, next) => {
  try {
    const rows = await getAllThongBaoData();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getThongBaoId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getThongBaoById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy thong bao' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { NoiDung, Tgian, MaTK, MaPhong } = req.body;
      await updateThongBao(id, { NoiDung, Tgian, MaTK, MaPhong});
      res.json({ message: 'Cập nhật thong bao thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteThongBao(id);
    res.json({ message: 'Xóa thong bao thành công' });
  } catch (err) {
    next(err);
  }
};
