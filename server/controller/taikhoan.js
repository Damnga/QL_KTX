import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {  getAllTaiKhoan, getTaiKhoanByEmail, createTaiKhoan, updateTaiKhoan, deleteTaiKhoan, getTaiKhoanById} from '../model/taikhoan.js';

export const register = async (req, res, next) => {
  try {
    const {
      Username,
      Email,
      Password,
      MaPQ =4,     
      TrangThai = 1, 
      MaND = 1,
    } = req.body;
    const anh = req.file?.filename || null;
    const existing = await getTaiKhoanByEmail(Email);
    if (existing) return res.status(400).json({ message: 'Email đã tồn tại' });
    const hashedPassword = await bcrypt.hash(Password, 10);
    await createTaiKhoan({
      Username,
      Email,
      Password: hashedPassword,
      MaPQ,
      TrangThai,
      MaND,
      anh
    });
    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try{
    const { Email, Password } = req.body;
    const user = await getTaiKhoanByEmail(Email);
    if (!user) return res.status(404).json({ message: 'Sai email hoặc mật khẩu' });
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) return res.status(401).json({ message: 'Sai mật khẩu' });
    const token = jwt.sign({ id: user.id },"secret", { expiresIn: '1h' });
    req.session.user = user; 
    res.json({ token, user,MaPQ: user.MaPQ, Username: user.Username });
  }catch(err){
    next(err);
  }
};
export const logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
};
export const getTaiKhoan = async (req, res, next) => {
  try {
    const rows = await getAllTaiKhoan();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
export const getTaiKhoanId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getTaiKhoanById(id);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { Password, ...rest } = req.body;
    const anh = req.file?.filename;
    let hashedPassword = Password;
    if (Password) {
      hashedPassword = await bcrypt.hash(Password, 10);
    }
    await updateTaiKhoan(id, {
      ...rest,
      Password: hashedPassword,
      anh
    });
    res.json({ message: 'Cập nhật tài khoản thành công' });
  } catch (err) {
    next(err);
  }
};
export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteTaiKhoan(id);
    res.json({ message: 'Xóa tài khoản thành công' });
  } catch (err) {
    next(err);
  }
};
