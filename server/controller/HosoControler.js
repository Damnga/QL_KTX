
import {getAllHoSo, getHoSoById, createHoSo, updateHoSo, deleteHoSo} from "../model/HosoModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaHD }= req.body;
    const files = req.files;
    const DonXin = files?.DonXin?.[0]?.filename;
    const GiayXacNhanSinhVien = files?.GiayXacNhanSinhVien?.[0]?.filename;
    const CCCDPhoTo = files?.CCCDPhoTo?.[0]?.filename;
    await createHoSo({DonXin, GiayXacNhanSinhVien, CCCDPhoTo, MaHD});
    res.status(201).json({ message: 'Tạo HO SO thành công' });
  } catch (err) {
    next(err);
  }
};

export const getHoSo = async (req, res, next) => {
  try {
    const rows = await getAllHoSo();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getHoSoId = async (req, res, next) => {
  try {
    const id = req.params.MaHD;
    const phong = await getHoSoById(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy ho so' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const {MaHD }= req.body;
      const files = req.files;
      const DonXin = files?.DonXin?.[0]?.filename ;
      const GiayXacNhanSinhVien = files?.GiayXacNhanSinhVien?.[0]?.filename ;
      const CCCDPhoTo = files?.CCCDPhoTo?.[0]?.filename ;
      const HopDong = files?.HopDong?.[0]?.filename ;
      await updateHoSo(MaHD, {DonXin, GiayXacNhanSinhVien, CCCDPhoTo, HopDong});
      res.json({ message: 'Cập nhật ho so thành công' });
    } catch (err) {
      next(err);
    }
  };
export const remove = async (req, res, next) => {
  try {
    const id = req.params.MaHD;
    await deleteHoSo(id);
    res.json({ message: 'Xóa ho so thành công' });
  } catch (err) {
    next(err);
  }
};
