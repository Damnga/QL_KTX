import {getAllTinNhan, getTinNhanById, createTinNhan, updateTinNhan, deleteTinNhan} from "../model/TinnhanModel.js"

export const create = async (req, res, next) => {
  try {
    const {NoiDung, Tgian, NguoiNhan, NguoiGui} = req.body;
    await createTinNhan({NoiDung, Tgian, NguoiNhan, NguoiGui});
    res.status(201).json({ message: 'Tạo tin nhan thành công' });
  } catch (err) {
    next(err);
  }
};
export const getTinNhan = async (req, res, next) => {
  try {
    const rows = await getAllTinNhan();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getTinNhanId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getTinNhanById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy tin nhan' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {NoiDung, Tgian, NguoiNhan, NguoiGui} = req.body;
      await updateTinNhan(id, {NoiDung, Tgian, NguoiNhan, NguoiGui});
      res.json({ message: 'Cập nhật tin nhan thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteTinNhan(id);
    res.json({ message: 'Xóa tin nhan thành công' });
  } catch (err) {
    next(err);
  }
};
