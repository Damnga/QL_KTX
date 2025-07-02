
import {getAllHopDong,getHopDongByMaSV,getAllTongDang, getHopDongById,getHopDongByIdTaiKhoan,createHopDong, updateHopDong, deleteHopDong} from "../model/HopdongModel.js"

export const create = async (req, res, next) => {
  try {
    const {MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu} = req.body;
    const newHopDong = await createHopDong({MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu});
    res.status(201).json({...newHopDong, message: 'Tạo hop dong thành công' });
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
export const getHopDongDang = async (req, res, next) => {
  try {
    const rows = await getAllTongDang();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getHopDongId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getHopDongById(id);
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const getHopDongMaSV = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getHopDongByMaSV(id);
    res.json(phong);
  } catch (err) {
    next(err);
  }
};

export const getHopDongIdTaiKhoan = async (req, res, next) => {
  try {
    const id = req.params.id;
    const phong = await getHopDongByIdTaiKhoan(id);
    if (!phong) return res.status(404).json({ message: 'Không tìm thấy Hop Dong' });
    res.json(phong);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu} = req.body;
      await updateHopDong(id, {MaSV, MaPhong, NgayBatDau, NgayKetThuc, ThoiHan, TrangThai, GhiChu});
      res.json({ message: 'Cập nhật hop dong thành công' });
    } catch (err) {
      next(err);
    }
  };
  export const updateData = async (req, res, next) => {
    try {
      const id = req.params.IDHopDong;
      const {TrangThai} = req.body;
      await updateHopDong(id, {TrangThai});
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
