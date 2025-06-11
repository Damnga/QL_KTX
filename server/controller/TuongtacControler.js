import {getAllTuongTac, getTuongTacById, createTuongTac, updateTuongTac, deleteTuongTac} from "../model/TuongtacModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaTK, MaBV, Tgian} = req.body;
    await createTuongTac({MaTK, MaBV, Tgian});
    res.status(201).json({ message: 'Tạo tuong tac thành công' });
  } catch (err) {
    next(err);
  }
};
export const getTuongTac = async (req, res, next) => {
  try {
    const rows = await getAllTuongTac();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getTuongTacId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getuongTacById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy tuongtac' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaTK, MaBV, Tgian} = req.body;
      await updateTuongTac(id, {MaTK, MaBV, Tgian});
      res.json({ message: 'Cập nhật tuong tac thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteTuongTac(id);
    res.json({ message: 'Xóa tuong tac thành công' });
  } catch (err) {
    next(err);
  }
};
