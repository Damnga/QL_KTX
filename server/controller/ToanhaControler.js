import {getAllToaNha, getToaNhaById, createToaNha, updateToaNha, deleteToaNha } from "../model/ToanhaModel.js";

export const create = async (req, res, next) => {
  try {
    const {TenTN} = req.body;
    await createToaNha({TenTN});
    res.status(201).json({ message: 'Tạo toa nha thành công' });
  } catch (err) {
    next(err);
  }
};

export const getToaNha = async (req, res, next) => {
  try {
    const rows = await getAllToaNha();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getToaNhaId = async (req, res, next) => {
  try {
    const id = req.params.MaTN;
    const toanha = await getToaNhaById(id);
    if (!toanha) return res.status(404).json({ message: 'Không tìm thấy toa nha' });
    res.json(toanha);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.MaTN;
      const {TenTN} = req.body;
      await updateToaNha(id, { TenTN });
      res.json({ message: 'Cập nhật toa nha thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.MaTN;
    await deleteToaNha(id);
    res.json({ message: 'Xóa toa nha thành công' });
  } catch (err) {
    next(err);
  }
};
