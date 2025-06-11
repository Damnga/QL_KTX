import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {  getAllTaiKhoan, getTaiKhoanByEmail,updatePasswordByEmail, createTaiKhoan, updateTaiKhoan, deleteTaiKhoan, getTaiKhoanById} from '../model/taikhoan.js';
import nodemailer from "nodemailer";
export const register = async (req, res, next) => {
  try {
    const {
      Username,
      Email,
      Password,
      MaPQ = 4,  
      MaSV,
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
      MaSV,
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

    const token = jwt.sign({
       id: user.id, 
       Username: user.Username,
       anh: user.anh,
       MaSV :user.MaSV,
   },"secret", { expiresIn: '1h' });
    res.json({ token, user,MaPQ: user.MaPQ, Username: user.Username, anh: user.anh,MaSV :user.MaSV });
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
export const getTaiKhoanEmail = async (req, res, next) => {
  try {
    const rows = await getTaiKhoanByEmail();
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
export const updateMaPQ = async (req, res, next) => {
  try {
        const id = req.params.IDTaiKhoan;
        const {MaPQ} = req.body;
        await updateTaiKhoan(id, {MaPQ});
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

const generateRandomPassword = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "damthinga1953@gmail.com",        
    pass: "kpkd dlqa ficc avqa",    
  },
});
export const resetPassword = async (req, res) => {
  const { Email } = req.body;

  try {
    const user = await getTaiKhoanByEmail(Email);
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại!" });
    }

    const newPassword = generateRandomPassword();
    const hashPassword = await bcrypt.hash(newPassword, 10);

    await updatePasswordByEmail(Email, hashPassword);

    await transporter.sendMail({
      from: "damthinga1953@gmail.com",
      to: Email,
      subject: "Mật khẩu mới của bạn",
      html: `<p>Mật khẩu mới của bạn là: <strong>${newPassword}</strong></p>`,
    });
    return res.json({ message: "Đã gửi mật khẩu mới vào email!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};
